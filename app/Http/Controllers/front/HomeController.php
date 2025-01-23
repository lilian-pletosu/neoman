<?php

namespace App\Http\Controllers\front;

use Inertia\Inertia;
use App\Models\Brand;
use App\Models\Category;
use App\Mail\CallWaitForm;
use Illuminate\Http\Request;
use App\Services\BannerService;
use App\Services\ProductService;
use App\Http\Controllers\Controller;
use App\Services\UltraImportService;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;


class HomeController extends Controller
{

    protected $ultraImportService;

    public function __construct(UltraImportService $ultraImportService)
    {
        $this->ultraImportService = $ultraImportService;
    }

    public function index()
    {


        // $params = [
        //     "service" => "NOMENCLATURE",
        //     "all" => true,
        //     "additionalParams" => ""
        // ];

        // $request = new Request();
        // $request->merge($params);



        // // dd($this->requestData($request));
        // dd($this->checkStatus('2c92c2ff-0fbb-4d33-97c7-204d2f6d5301')->getData()->status);
        // // dd($this->getData('1c505081-1197-4d7b-87ca-3761d4179db8'));












        $categories = Cache::remember('categories', 262656, function () {
            return Category::where('level', 1)->orderBy('name')->active()->get();
        });

        $brands = Cache::remember('brands', 10000, function () {
            return Brand::whereNotNull('image')
                ->active()
                ->orderBy('name')
                ->limit(15)
                ->get();
        });

        $homeBanners = Cache::remember('home_banners', 10000, function () {
            return (new BannerService())->getHomeBanners();
        });

        $salesProducts = Cache::remember('sales_products', 262656, function () {
            return (new ProductService())->loadSalesProducts();
        });


        Inertia::share([
            'home_banners' => $homeBanners,
            'brands' => $brands,
            'call_action' => (new BannerService())->getCallActionBanner(),
            'season_products' => (new ProductService())->loadAllProducts(15),
            'last_products' => (new ProductService())->loadLastProducts(15)
        ]);

        return inertia('User/HomePage', [
            'categories' => $categories,
            'sales_products' => $salesProducts
        ]);
    }


    public function callWait(Request  $request)
    {
        $data = $request->validate([
            'name' => 'required',
            'phone' => 'required',
        ]);

        Mail::to('office.neoman@gmail.com')->send(new CallWaitForm($data));
    }




    public function requestData(Request $request)
    {

        $guid = $this->ultraImportService->requestData(
            $request->input('service'),
            $request->input('all'),
            $request->input('additionalParams')
        );


        return $guid;
    }

    public function checkStatus($guid)
    {
        $status = $this->ultraImportService->isReady($guid);
        return response()->json(['status' => $status]);
    }


    public function getData($guid)
    {
        $data = $this->ultraImportService->getDataByID($guid);
        return response()->json($data);
    }

    public function commitReceivingData(string $service): void
    {
        $this->ultraImportService->commitReceivingData($service);
    }
}
