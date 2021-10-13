<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\API\BaseController as BaseController;
use App\Models\KpiCampaigns;

class KpiCampaignsController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {

        $res = KpiCampaigns::select('spend','sales','sku','date')
            ->where('sku', '!=', 'Total')
            ->get();

        return $this->sendResponse($res,'Success');
    }
}
