<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\contracts;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    //

    public function getContracts()
{
    try {
        $contracts = contracts::with('apartment', 'user')
            ->select('contract_id','user_id','apartment_id', 'start_date', 'end_date')
            ->get();
        return response()->json($contracts);
    } catch (\Exception $e) {
        return response()->json($e, 500);
    }
}

}
