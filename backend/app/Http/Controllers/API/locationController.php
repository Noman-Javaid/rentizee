<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\province;
use App\Models\City;
use Illuminate\Support\Facades\Validator;


class locationController extends Controller
{
    // 
    public function province(){
        $province = Province::latest()->get();
        return response()->json([
            'status'=>200,
            'province'=>$province
        ]);
    }
    public function cities(){
        $cities = City::latest()->get();
        return response()->json([
            'status'=>200,
            'cities'=>$cities
        ]);
    }
    public function singleprovince($id){
    $singleprovince = Province::find($id);
    return response()->json([
        'status'=>200,
        'singleprovince'=>$singleprovince
    ]);
    }

     public function delprovince($pid){
        $province = Province::find($pid);
        if($province){
            $province->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Province Deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Access Denied/ Province does not Exist',
            ]);    
        } 
    }
    public function delcity($cid){
        $city = City::find($cid);
        if($city){
            $city->delete();
            return response()->json([
                'status'=>200,
                'message'=>'City Deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Access Denied/ City does not Exist',
            ]);    
        } 
    }

    public function addprvince(Request $req){
        $validator = Validator::make($req->all(),[
            'name'=>'required|unique:province,name'
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'error'=>$validator->messages()
            ]);
        }
        $province = new province;
        $province->name= $req->input('name');
        $province->save();
        return response()->json([
            'status'=>200,
            'message'=>'Province Added Successfully',
        ]);
    }

    public function addcity(Request $req){
        $validator = Validator::make($req->all(),[
            'name'=>'required|unique:cities,name',
            'province'=>'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'error'=>$validator->messages()
            ]);
        }
        $prid = $req->input('province');
        $prdata = Province::where('id',$prid)->get();
        $prname = $prdata[0]->name;
        $city = new City;
        $city->name = $req->input('name');
        $city->province = $req->input('province');
        $city->prname = $prname;
        $city->save();
        return response()->json([
            'status'=>200,
            'message'=>'City Added Successfully',
        ]);
    }
    public function selectcity($pname){
        $city = City::where('prname', $pname)->get();
        return response()->json([
            'cities'=>$city,
        ]);
    }
}
