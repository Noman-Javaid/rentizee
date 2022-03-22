<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Rental;
use App\Models\Category;
use App\Models\Subcategory;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use File;

class rentalController extends Controller
{
    public function addrental(Request $req){
 
        $user = User::find($req->input("auth_id"));

        $validator = Validator::make($req->all(), [
            'province'=>'required|max:191',
            'city'=>'required|max:191',
            'category'=>'required|max:191',
            'subcat'=>'required|max:191',
            'phone2'=>'required|max:191',
            'title'=>'required|max:191',
            'description'=>'required|max:191',
            'image'=>'required|image|mimes:jpeg,png,jpg|max:5120',
            'address'=>'required|max:191',
            'price'=>'required|max:191'
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'error'=>$validator->messages(),
               ]);
        }else{
            if($user->quota===$user->posts){
                return response()->json([
                    'status'=>401,
                    'message'=>"You have Zero Quota Remaining to Post Listing",
                ]);
            }else{
            $rental = new Rental;
            $rental->auth_id = $req->input('auth_id');
            $rental->auth_name = $req->input('auth_name');
            $rental->auth_role = $req->input('auth_role');
            $rental->auth_email = $req->input('auth_email');

            $rental->province = $req->input('province');
            $rental->city = $req->input('city');
            $rental->category = $req->input('category');
            $rental->subcat = $req->input('subcat');

            $rental->phone1 = $req->input('phone1');
            $rental->phone2 = $req->input('phone2');
            $rental->keywords = $req->input('keywords');
            $rental->title = $req->input('title');
            $rental->description = $req->input('description');
            $rental->address = $req->input('address');
            $rental->price = $req->input('price');

            $rental->duration = $req->input('duration');
            $rental->condition = $req->input('condition');

            if($rental->category==="property"){
            $rental->elevator = $req->input('elevator') == "true" ? '1': '0';
            $rental->lawn = $req->input('lawn') == "true" ? '1': '0';
            $rental->roof = $req->input('roof') == "true" ? '1': '0';
            $rental->parking = $req->input('parking') == "true" ? '1': '0';
            //$category->status = $req->input('status') == "true" ? '1': '0';
            $rental->area = $req->input('area');
            $rental->floors = $req->input('floors');
            $rental->bedrooms = $req->input('bedrooms');
            $rental->bathrooms = $req->input('bathrooms');
            $rental->kitchens = $req->input('kitchens');
            }
            else if($rental->category ==="vehicles"){
            $rental->car_model = $req->input('car_model');
            $rental->milage = $req->input('milage');
            $rental->fuel_average = $req->input('fuel_average');
            $rental->fuel_type = $req->input('fuel_type');
            }
            else if($rental->category === "electronics"){
            $rental->elec_model = $req->input('elec_model');
            $rental->company = $req->input('company');
            $rental->operator = $req->input('operator') == "true" ? '1': '0';
            }
            
            if($req->hasFile('image')){
                $file = $req->file('image');
                $ext = $file->getClientOriginalExtension();
                $filename = time().'.'.$ext;
                $file->move('uploads/rentals/', $filename);
                $rental->image = 'uploads/rentals/'.$filename;
            }
            //increment user posts
            $user->posts = $user->posts + 1;
            //increment category 
            $catdata = Category::where('slug', $req->input('category'))->get();
            $catdata[0]->posts = $catdata[0]->posts + 1;
           
            //increment Subcategory 
            $subcatdata = Subcategory::where('slug', $req->input('subcat'))->get();
            $subcatdata[0]->posts = $subcatdata[0]->posts + 1;

            $rental->save();
            $user->save();
            $catdata[0]->save();
            $subcatdata[0]->save();

            return response()->json([
                'status'=>200,
                'message'=>'Rental Listing Added Successfully'
            ]);
        }
    } }

    public function allrentals(){
        $rentals = Rental::latest()->get();
        return response()->json([
            'status'=>200,
            'rentals'=>$rentals
        ]);
    }
    public function myrentals($aid){
        $rentals = Rental::where('auth_id',$aid)->get();
        $count = Rental::where('auth_id',$aid)->count();
        $user = User::find($aid);
            $views = 0;
            $visits = 0;
            foreach($rentals as $rental){
                $views = $rental->phone_views + $views;
                $visits = $rental->visits + $visits;
            }
           if($count>0){
            return response()->json([
                'status'=>200,
                'rentals'=>$rentals,
                'views'=>$views,
                'visits'=>$visits,
                'posts'=>$user->posts,
                'quota'=>$user->quota,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'views'=>$views,
                'visits'=>$visits,
                'posts'=>$user->posts,
                'quota'=>$user->quota,
                'message'=>'No Rentals Available Yet'
            ]);
        }
        
    }
    public function fetchpost($pid){
        $rental= Rental::find($pid);
        if($rental){
            return response()->json([
                'status'=>200,
                'rental'=>$rental
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>"Not Found Such Rental"
            ]);
        }
        
    }
    public function fetchmypost($pid, $aid){
        $rental = Rental::where(['id'=>$pid, 'auth_id'=>$aid])->first();
        if($rental){
            return response()->json([
                'status'=>200,
                'rental'=>$rental,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>"Not Found Such Rental",
            ]);
        }
        
    }


    //Update Data 
    public function updaterental(Request $req, $pid){
        $validator = Validator::make($req->all(), [
            'phone2'=>'required|max:191',
            'title'=>'required|max:191',
            'description'=>'required|max:191',
            'address'=>'required|max:191',
            'price'=>'required|max:191'
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'error'=>$validator->messages(),
            ]);
        }else{
            $rental = Rental::find($pid);
            if($rental){
            // $rental = new Rental;
            $rental->phone2 = $req->input('phone2');
            $rental->keywords = $req->input('keywords');
            $rental->title = $req->input('title');
            $rental->description = $req->input('description');
            $rental->address = $req->input('address');
            $rental->price = $req->input('price');

            $rental->duration = $req->input('duration');
            $rental->condition = $req->input('condition');

            if($rental->category==="property"){
            $rental->elevator = $req->input('elevator') == "true" ? '1': '0';
            $rental->lawn = $req->input('lawn') == "true" ? '1': '0';
            $rental->roof = $req->input('roof') == "true" ? '1': '0';
            $rental->parking = $req->input('parking') == "true" ? '1': '0';
            $rental->area = $req->input('area');
            $rental->floors = $req->input('floors');
            $rental->bedrooms = $req->input('bedrooms');
            $rental->bathrooms = $req->input('bathrooms');
            $rental->kitchens = $req->input('kitchens');
            }
            else if($rental->category ==="vehicles"){
            $rental->car_model = $req->input('car_model');
            $rental->milage = $req->input('milage');
            $rental->fuel_average = $req->input('fuel_average');
            $rental->fuel_type = $req->input('fuel_type');
            }
            else if($rental->category === "electronics"){
            $rental->elec_model = $req->input('elec_model');
            $rental->company = $req->input('company');
            $rental->operator = $req->input('operator') == "true" ? '1': '0';
            }
            
            if($req->hasFile('image')){
                $validator = Validator::make($req->all(), [
                    'image'=>'image|mimes:jpeg,png,jpg|max:5120',
                ]);
                if($validator->fails()){
                    return response()->json([
                        'status'=>423,
                        'error'=>$validator->messages(),
                    ]);
                }
                $path='uploads/rentals/';
                if(File::exists($path)){
                    File::delete($path);
                }
                    $file = $req->file('image');
                    $ext = $file->getClientOriginalExtension();
                    $filename = time().'.'.$ext;
                    $file->move('uploads/rentals/', $filename);
                    $rental->image = 'uploads/rentals/'.$filename;
            }
            $rental->update();
            return response()->json([
                'status'=>200,
                'message'=>'Rental Listing Updated Successfully'
            ]);
        }else{
            return response()->json([
                'status'=>401,
                'message'=>"No Such Rental Listing Found",
            ]);
        }
    }

    }
    public function delrental($id){
        $rental = Rental::find($id);
        if($rental){
            $user = User::find($rental->auth_id);
            $user->posts = $user->posts - 1;
            //decrement category 
            $catdata = Category::where('slug', $rental->category)->get();
            $catdata[0]->posts = $catdata[0]->posts - 1;
            //decrement Subcategory 
            $subcatdata = Subcategory::where('slug', $rental->subcat)->get();
            $subcatdata[0]->posts = $subcatdata[0]->posts - 1;

            $rental->delete();
            $user->update();
            $catdata[0]->update();
            $subcatdata[0]->update();

            return response()->json([
                'status'=>200,
                'message'=>'Rental Listing Deleted Successfully',
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'Access Denied/ Post does not Exist',
            ]);    
        }   
    }
    public function delmyrental($id, $aid){
        $rental = Rental::where(['id'=>$id, 'auth_id'=>$aid])->get();
        $count = Rental::where(['id'=>$id, 'auth_id'=>$aid])->count();
        if($count>0){
            $user = User::find($rental[0]->auth_id);
            $user->posts = $user->posts - 1;
            //decrement category 
            $catdata = Category::where('slug', $rental[0]->category)->get();
            $catdata[0]->posts = $catdata[0]->posts - 1;
            //decrement Subcategory 
            $subcatdata = Subcategory::where('slug', $rental[0]->subcat)->get();
            $subcatdata[0]->posts = $subcatdata[0]->posts - 1;
            $rental[0]->delete();
            $user->update();
            $catdata[0]->update();
            $subcatdata[0]->update();

            return response()->json([
                'status'=>200,
                'message'=>'Rental Listing Deleted Successfully',
            ]);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'Access Denied/ Post does not Exist',
            ]);    
        }   
    }
    public function plusvisite($pid){
        $rental = Rental::find($pid);
        $rental->visits = $rental->visits + 1;
        $rental->update();
        return response()->json([
            'message'=>'Added 1 visit',
        ]);
    }
    public function plusphoneview($pid){
        $rental = Rental::find($pid);
        $rental->phone_views = $rental->phone_views + 1;
        $rental->update();
        return response()->json([
            'message'=>'Added 1 Phone View',
        ]);
    }
    public function catrental($cat){
        $rental = Rental::where('category', $cat)->get();
        $rentalcount = Rental::where('category', $cat)->count();
        if($rentalcount>0){
            return response()->json([
                'status'=>200,
                'rental'=>$rental,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No Post with such category',
            ]);
        }
    }
    public function subcatrental($cat, $sub){
        $rental = Rental::where(['category'=>$cat, 'subcat'=>$sub])->get();
        $rentalcount = Rental::where(['category'=>$cat, 'subcat'=>$sub])->count();
        if($rentalcount>0){
            return response()->json([
                'status'=>200,
                'rental'=>$rental,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No Post with such category',
            ]);
        }
    }
    public function city($city, $pro){
        $rental = Rental::where(['city'=>$city, 'province'=>$pro])->get();
        $rentalcount = Rental::where(['city'=>$city, 'province'=>$pro])->count();
        if($rentalcount>0){
            return response()->json([
                'status'=>200,
                'rental'=>$rental,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No Post in Such City',
            ]);
        }
    }
    public function userrental($aid){
        $rental = Rental::where('auth_id', $aid)->get();
        $rentalcount = Rental::where('auth_id', $aid)->count();
        if($rentalcount>0){
            return response()->json([
                'status'=>200,
                'rental'=>$rental,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No Post of Such User',
            ]);
        }
    } 
    public function search($city, $sub, $key){
        if($city!='$' && $sub==='$' && $key==='$'){
            $rental = Rental::where(['city'=>$city])->get();
            $count = Rental::where(['city'=>$city])->count();
            
        }else if($city==='$' && $sub!='$' && $key==='$'){
            $rental = Rental::where(['subcat'=>$sub])->get();
            $count = Rental::where(['subcat'=>$sub])->count();

        }else if($city==='$' && $sub==='$' && $key!='$'){
            $rental = Rental::where('keywords','like',"%$key%")->get();
            $count = Rental::where('keywords','like',"%$key%")->count();

        }else if($city!='$' && $sub!='$' && $key!='$'){
            $rental = Rental::where('keywords', 'like', "%$key%")->where(['subcat'=>$sub,'city'=>$city])->get();
            $count = Rental::where('keywords', 'like', "%$key%")->where(['subcat'=>$sub,'city'=>$city])->count();

        }else if($city!='$' && $sub==='$' && $key!='$'){
            $rental = Rental::where('keywords', 'like', "%$key%")->where(['city'=>$city])->get();
            $count = Rental::where('keywords', 'like', "%$key%")->where(['city'=>$city])->count();

        }else if($city==='$' && $sub!='$' && $key!='$'){
            $rental = Rental::where('keywords', 'like', "%$key%")->where(['subcat'=>$sub])->get();
            $count = Rental::where('keywords', 'like', "%$key%")->where(['subcat'=>$sub])->count();

        }else if($city!='$' && $sub!='$' && $key==='$'){
            $rental = Rental::where(['city'=>$city, 'subcat'=>$sub])->get();
            $count = Rental::where(['city'=>$city, 'subcat'=>$sub])->count();
        }else{
            $rental = [];
            $count = 0;

        }
        if($count>0){
            return response()->json([
                'status'=>200,
                'rental'=>$rental,
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No Such Search Results Found',
            ]);
        }
        
    }
}
 