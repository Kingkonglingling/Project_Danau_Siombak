<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class ClearALL extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'sikatlek';

    /**
     * The console command description.
     *php
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->call('cache:clear');
        $this->call('config:clear');
        $this->call('route:clear');
        $this->call('view:clear');
        $this->info('semua cache telah dibersihkan!');
    }
}
