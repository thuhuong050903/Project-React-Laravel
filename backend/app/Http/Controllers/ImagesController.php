<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Images;
class ImagesController extends Controller
{
    public function index()
    {
        return response()->json(Images::all());
    }
    public function upload(Request $request){
        if($request->hasFile('image')){
        $image= $request->file('image')[0];;
        $name=time().'.'.$image->getClientOriginalExtension();
        $image->move('image',$name);
        Images::create(['name' => 'images/' . $name]);;
        return response()->json(['success'=>'Upload successfully']);
        }
        return response()->json('plz try again');
    }
}
