<?php

namespace App\Console\Commands;

use App\Models\KpiCampaigns;
use Illuminate\Console\Command;

class SendDataToDataStudio extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send-data-to-data-studio';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     */
    public function handle():void
    {
        dd(KpiCampaigns::all());
        dd('handle starting');

    }
}
