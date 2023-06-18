<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Images;
class ImagesController extends Controller
{
    public function upload(Request $request){
        if($request->has('images')){
        $image= $request->file('image');
        $name=time().'.'.$image->getClientOriginalExtension();
        $image->move('image',$name);
        Images::create(['name'=>$name]);
        return response()->json(['success'=>'Upload successfully']);
        }
        return response()->json('plz try again');
    }
}
