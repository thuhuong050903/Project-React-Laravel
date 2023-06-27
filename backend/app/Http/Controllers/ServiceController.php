<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\services; // corrected the model name

class ServiceController extends Controller
{
    public function getServices()
    {
        $services = services::all();
        
        return response()->json($services); // corrected the variable name
    }
}
