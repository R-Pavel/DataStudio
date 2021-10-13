<?php

namespace Database\Factories;

use App\Models\KpiCampaigns;
use Illuminate\Database\Eloquent\Factories\Factory;

class KpiCampaignsFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = KpiCampaigns::class;

    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        $title = [
            'Total',
            'DU-VS4O-68IK Evalight top',
            'Evalight top',
            '2W-QV33-1GPI Weedout New Auto',
            '2W-QV33-1GPI Weedout Auto2',
            '2W-QV33-1GPI Weedout New Manual',
            '2W-QV33-1GPI Weedout start'
        ];
        $sku = ['Total', 'DU-VS4O-68IK','E','DU-VS4O-68IK','2W-QV33-1GPI', 'DU-VS41-68IK','U','DW-VS5O-68IK','2QW-QV33-1GPI'];

        return [
            'created' => $this->faker->dateTimeBetween('-1 months', 'now'),
            'changed' => $this->faker->dateTimeBetween('-1 months', 'now'),
            'account-id' => rand(0,300),
            'date' => $this->faker->dateTimeBetween('-1 months', 'now'),
            'title' => $this->faker->randomElement($title),
            'sku' => $this->faker->randomElement($sku),
            'spend' => $this->faker->randomFloat(1,0,200),
            'orders' => rand(0,20),
            'sales' => $this->faker->randomFloat(1,0,400),
            'impressions' => rand(0,10),
            'clicks' => rand(0,1000),

        ];
    }
}
