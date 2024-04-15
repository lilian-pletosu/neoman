<?php

namespace App\Services;

use GuzzleHttp\Client;
use Illuminate\Support\Str;

class RemoveBGService
{
    public $apiKey = '6kBmovwf7Cg5mWfALihDkkYJ';

    public function __invoke($imagePath, $pathToSave)
    {
        $imagePathFromDb = $imagePath; // Acesta este un exemplu, înlocuiți cu calea reală din baza de date
        $fileName = Str::slug(basename($imagePathFromDb), '_') . '.png';
        $absoluteImagePath = str_replace('/storage', 'app/public', $imagePathFromDb);


        $client = new Client();
        $res = $client->post('https://api.remove.bg/v1.0/removebg', [
            'multipart' => [
                [
                    'name' => 'image_file',
                    'contents' => fopen(storage_path($absoluteImagePath), 'r')
                ],
                [
                    'name' => 'size',
                    'contents' => 'auto'
                ]
            ],
            'headers' => [
                'X-Api-Key' => config('removebg.api_key'),
            ]
        ]);

        $fp = fopen(storage_path("app/public/$pathToSave/$fileName"), 'wb');
        fwrite($fp, $res->getBody());
        fclose($fp);
        return $fileName;
    }
}
