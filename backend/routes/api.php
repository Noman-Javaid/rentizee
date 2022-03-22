<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\maincontroller;
use App\Http\Controllers\Api\authController;
use App\Http\Controllers\Api\categoryController;
use App\Http\Controllers\Api\locationController;
use App\Http\Controllers\Api\rentalController;
use App\Http\Controllers\Api\subscriberController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware(['auth:sanctum'])->group(function (){ 
    Route::post("logout",[authController::class,'logout']);
    Route::get('/authChecking', function (){
        return response()->json([ 'message'=>'You are in', 'status'=>200], 200);
    });
    Route::get("rolecheck/{id}",[authController::class,'rolecheck']);

    //Category CRUD
    Route::post("submitcat",[categoryController::class,"submitcat"]);
    Route::get("singlecat/{cid}",[categoryController::class,"singlecat"]);
    Route::post("updcat/{cid}",[categoryController::class,"updcat"]);
    Route::delete("deletecat/{cid}",[categoryController::class,'deletecat']); 
    Route::get("allcatadmin",[categoryController::class,"allcatadmin"]);


    //Sub Category CRUD
    Route::post("submitsubcat",[categoryController::class,'submitsubcat']);
    Route::delete("deletesubcat/{cid}",[categoryController::class,'deletesubcat']);
    Route::get("singlesubcat/{cid}",[categoryController::class,'singlesubcat']);
    Route::post("updsubcat/{cid}",[categoryController::class,"updsubcat"]);

    //Users CRUD
    Route::post("adduser",[authController::class,'adduser']);
    Route::delete("deleteuser/{uid}",[authController::class,'deleteuser']);
    Route::get("singleuser/{uid}",[authController::class,'singleuser']);
    Route::post("upduser/{uid}",[authController::class,'upduser']);
    Route::post("updprofile/{uid}",[authController::class,'updprofile']);

    //Locations CRUD  
    Route::delete("delprovince/{pid}",[locationController::class,"delprovince"]);
    Route::delete("delcity/{cid}",[locationController::class,"delcity"]);
    Route::post("addprvince",[locationController::class,"addprvince"]);
    Route::post("addcity",[locationController::class,"addcity"]);

    //Rentals CRUD
    Route::post("addrental",[rentalController::class,"addrental"]); 
    Route::post("updaterental/{pid}",[rentalController::class,"updaterental"]);
    Route::delete("delrental/{pid}",[rentalController::class,"delrental"]);
    Route::delete("delmyrental/{pid}/{aid}",[rentalController::class,"delmyrental"]);
    Route::get("myrentals/{aid}",[rentalController::class,"myrentals"]);
    Route::get("fetchmypost/{pid}/{aid}",[rentalController::class,"fetchmypost"]);
});
    //Rentals Frontend 
    Route::get("allrentals",[rentalController::class,"allrentals"]);
    Route::get("fetchpost/{pid}",[rentalController::class,"fetchpost"]);
    Route::post("plusvisite/{pid}",[rentalController::class,"plusvisite"]);
    Route::post("plusphoneview/{pid}",[rentalController::class,"plusphoneview"]);
    Route::get("catrental/{cat}",[rentalController::class,"catrental"]);
    Route::get("subcatrental/{cat}/{sub}",[rentalController::class,"subcatrental"]);
    Route::get("userrental/{aid}",[rentalController::class,"userrental"]);
    Route::get("city/{city}/{pro}",[rentalController::class,"city"]);
    Route::get("search/{city}/{sub}/{key}",[rentalController::class,"search"]);

    //Users to Show
    Route::get("allusers",[authController::class,'allusers']);

    //Locations to Show
    Route::get("province",[locationController::class,"province"]);
    Route::get("cities",[locationController::class,"cities"]);
    Route::get("selectcity/{pname}",[locationController::class,"selectcity"]);
    
    //Auth Pages
    Route::post("register",[authController::class,'register']); 
    Route::post("login",[authController::class,'login']);
    //Categories to show
    Route::get("subcatslug/{slug}",[categoryController::class,"subcatslug"]);
    Route::get("allcat",[categoryController::class,"allcat"]);
    Route::get("allsubcat",[categoryController::class,"allsubcat"]);
    Route::get("selectsubcat/{slug}",[categoryController::class,'selectsubcat']);
    //Subscribers CRUD
    Route::post("subscribe/{uid}/{sid}/{sname}",[subscriberController::class,'subscribe']);
    Route::get("checksub/{uid}/{sid}",[subscriberController::class,'checksub']);
    Route::delete("unsub/{uid}/{sid}",[subscriberController::class,'unsub']);
    Route::get("subscriptions/{sid}",[subscriberController::class,'subscriptions']);
    Route::get("subscribers/{uid}",[subscriberController::class,'subscribers']);
    
    
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});  