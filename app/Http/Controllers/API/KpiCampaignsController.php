<?php

namespace App\Http\Controllers\API;

use Illuminate\Http\Request;
use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\KpiCampaigns;
use Illuminate\Support\Facades\DB;

class KpiCampaignsController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $selects = [
            DB::raw('SUM(spend) as spend'),
            DB::raw('SUM(sales) as sales'),
            DB::raw('sku as sku'),
        ];

        $res = KpiCampaigns::select($selects)
            //->where('date', $request->data)
            ->where('date', '2019-10-13 00:00:00')
            ->where('sku', '!=', 'Total')
            ->groupBy('sku')
            ->get();

        return $this->sendResponse($res,'Success');
    }
}
