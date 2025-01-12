<?php

namespace App\Services;


use App\Enum\TranslationsItemsEnum;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Redis;

class UltraImportProcessingService
{

    protected $nomenclature;
    protected $nomenclatureTypeList;
    protected $parentList;
    protected $priceList;
    protected $brand;

    protected $translations;


    public function __construct()
    {
        $this->nomenclature = json_decode(Redis::get('NOMENCLATURE'));
        $this->nomenclatureTypeList = json_decode(Redis::get('NOMENCLATURETYPELIST'));
        $this->parentList = json_decode(Redis::get('PARENTLIST'));
        $this->priceList = json_decode(Redis::get('PRICELIST'));
        $this->brand = json_decode(Redis::get('BRAND'));
        $this->translations = json_decode(Redis::get('TRANSLATIONS'));
    }

    public function __invoke()
    {
        return $this->processAllNomenclature();
    }


    public function processAllNomenclature()
    {
        $totalBatches = 4; // Numărul de batch-uri în care vrei să împarți
        $batchSize = 10000; // Mărimea unui batch

        for ($batch = 1; $batch <= $totalBatches; $batch++) {
            try {
                $this->getNomenclature($batch, $batchSize);
                Log::info("Processed batch {$batch} of {$totalBatches}");
            } catch (\Throwable $th) {
                Log::error("Error processing batch {$batch}", [
                    'error' => $th->getMessage(),
                    'trace' => $th->getTraceAsString()
                ]);
            }
        }
    }

    public function getNomenclature($batch = 1, $batchSize = 5000)
    {
        // $allowedSubSubcategories = config('products_structure');

        // Calculate offset based on batch number
        $offset = ($batch - 1) * $batchSize;

        // Get only the specific chunk of products
        $nomenclature = collect($this->nomenclature)
            ->skip($offset)
            ->take($batchSize);

        $products = $nomenclature->map(function ($item) {
            $item->name = $this->getNomenclatureTranslation($item->UUID);
            $item->brand = $this->getBrand($item->brand)->first();
            $item->sub_subcategory = $this->getNomenclatureType($item->nomenclatureType) ?? null;
            $item->subcategory = $this->getCategory($item->sub_subcategory['nomenclatureType']->parent ?? '');
            $item->category = $this->getSubcategory($item->sub_subcategory['nomenclatureType']->parent ?? '');
            $item->price = $this->getPrice($item->UUID)->Price ?? 'No price';
            $item->description = $this->parseDescription($item->UUID);
            $item->images = $this->getFirstFourImages($item->imageList);
            return $item;
        })->filter(function ($item) {
            return $item->price !== 'No price' &&
                isset($item->sub_subcategory['translations']['ro']) &&
                // in_array($item->sub_subcategory['translations']['ro'], $allowedSubSubcategories) &&
                // $item->sub_subcategory['nomenclatureType']->quantity > 0 &&
                $item->name !== null;
        });

        $products->map(function ($item) {
            try {
                return (new ProductService())->saveUltraImportedProductInDB($item);
            } catch (\Throwable $th) {
                Log::error('Error when trying to save product in DB', [
                    'error' => $th->getMessage(),
                    'product' => $item,
                    'trace' => $th->getTraceAsString()
                ]);
            }
        });
    }

    public function getNomenclatureTranslation($uuid, $column = 'name')
    {
        $type = TranslationsItemsEnum::NOMENCLATURE->value;

        $translation = collect($this->translations->$type)->filter(function ($item) use ($uuid, $column) {
            return $item->nomenclature === $uuid && $item->requisite === $column;
        })->first();


        try {
            $valueArray = json_decode($translation->valueJSON, true);
            if (isset($valueArray['md'])) {
                $valueArray['ro'] = $valueArray['md'];
                unset($valueArray['md']);
            }
            return $valueArray;
        } catch (\Throwable $th) {
            return null;
        }
    }

    public function getBrand(string $brandUuid)
    {
        $brand = collect($this->brand)->filter(function ($item) use ($brandUuid) {
            return $item->UUID === $brandUuid;
        });
        return $brand;
    }

    public function getNomenclatureType(string $nomenclatureTypeUuid)
    {
        $nomenclatureType = collect($this->nomenclatureTypeList)->filter(function ($item) use ($nomenclatureTypeUuid) {
            return $item->UUID === $nomenclatureTypeUuid;
        });
        return [
            'nomenclatureType' => $nomenclatureType->first(),
            'translations' => $this->getNomenclatureTypeTranslation($nomenclatureTypeUuid)
        ];
    }

    public function getNomenclatureTypeTranslation($nomenclatureTypeUuid)
    {
        $type = TranslationsItemsEnum::NOMENCLATURETYPE->value;

        $translation = collect($this->translations->$type)->filter(function ($item) use ($nomenclatureTypeUuid) {
            return $item->object === $nomenclatureTypeUuid;
        })->first();
        try {
            $translation = json_decode($translation->valueJSON, true);
            if (isset($translation['md'])) {
                $translation['ro'] = $translation['md'];
                unset($translation['md']);
            }
        } catch (\Throwable $th) {
            return null;
        }
        if ($translation) {
            return $translation;
        }
        return null;
    }

    public function getCategory(string $parentUuid)
    {
        foreach ($this->parentList as $parent) {
            if (isset($parent->parent)) {
                foreach ($parent->parent as $item) {
                    if (isset($item->UUID)) {
                        if ($item->UUID === $parentUuid) {
                            return $this->getNomenclatureTypeTranslation($parentUuid);
                        }
                    }
                }
            } else {
                return null;
            }
        }
    }

    public function getSubcategory(string $parentUuid)
    {
        foreach ($this->parentList as $firstParent) {
            if (isset($firstParent->parent)) {
                foreach ($firstParent->parent as $item) {
                    if (isset($item->UUID)) {
                        if ($item->UUID === $parentUuid) {
                            return $this->getNomenclatureTypeTranslation($firstParent->UUID);
                        }
                    }
                }
            } else {
                return null;
            }
        }
    }

    public function getPrice($uuid)
    {
        $price = collect($this->priceList)->filter(function ($item) use ($uuid) {
            return $item->UUID === $uuid;
        });
        return $price->firstWhere('priceType.name', 'Online');
    }

    function parseDescription($itemUUID)
    {
        return $this->getNomenclatureTranslation($itemUUID, 'description');
    }

    public function getFirstFourImages($imageList)
    {
        $result = [];
        for ($i = 0; $i < 4; $i++) {
            try {
                if (isset($imageList->image[$i])) {
                    $result["image" . ($i + 1)] = $imageList->image[$i]->pathGlobal;
                }
            } catch (\Throwable $th) {
                return null;
            }
        }
        return $result;
    }
}
