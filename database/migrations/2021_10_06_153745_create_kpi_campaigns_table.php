<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateKpiCampaignsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kpi_campaigns', function (Blueprint $table) {
            $table->id();
            $table->dateTime('created');
            $table->dateTime('changed');
            $table->integer('account-id');
            $table->dateTime('date');
            $table->string('title');
            $table->string('sku');
            $table->float('spend');
            $table->integer('orders');
            $table->float('sales');
            $table->integer('impressions');
            $table->integer('clicks');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('kpi_campaigns');
    }
}
