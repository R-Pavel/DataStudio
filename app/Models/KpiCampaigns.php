<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class KpiCampaigns extends Model
{
    use HasFactory;
    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'kpi_campaigns';
    protected $primaryKey = 'id';

    protected $guarded = [];
    public $timestamps = false;

}
