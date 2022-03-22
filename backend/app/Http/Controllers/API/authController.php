<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Rental;
use Illuminate\Support\Facades\Hash; 
use Illuminate\Support\Facades\Validator;
use File;


class authController extends Controller
{
    //Registeration of User
    public function register(Request $req){
        $validator= Validator::make($req->all(),[
            'name'=>'required|max:191',
            'email'=>'required|max:191|unique:users,email',
            'password' => 'required', 
            'confirm_password' => 'required|same:password',
            'phone'=>'required',
            'dob'=>'required',
            'role'=>'required',
        ]);
        //regex:^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$'
        if($validator->fails()){
            return response()->json([
            'error'=>$validator->messages(),
            ]);
        }else{
            $user = User::create([
                'name'=>$req->name,
                'email'=>$req->email,
                'phone'=>$req->phone,
                'dob'=>$req->dob,
                'role'=>$req->role,
                'password'=>Hash::make($req->password),
            ]);
            $token = $user->createToken($user->email.'_Token')->plainTextToken;
            return response()->json([
                'status'=>200,
                'username'=>$user->name,
                'id'=>$user->id,
                'role'=>$user->role,
                'token'=>$token,
                'message'=>'Registered Successfully',
            ]);

        }
    }
    //All Users 
    public function allusers(){
        $users = User::latest()->get();
        return response()->json([
            'status'=>200,
            'users'=>$users
        ]);
    }
    //Fetch Single User
    public function singleuser($uid){
        $user = User::find($uid);
        if($user){
            return response()->json([
                'status'=>200,
                'user'=>$user
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No Such user Found'
            ]); 
        }
    }
    //Update User
    public function upduser(Request $req, $uid){
        $user = User::find($uid);

        if($req->input('email')==$user->email){
            $validator = Validator::make($req->all(),[
                'name'=>'required|max:191',
                'email'=>'required|max:191',
                'phone'=>'required',
                'quota'=>'required',
                'dob'=>'required',
                'role'=>'required',
            ]);
            if($req->password || $req->confirm_password){
                $validator = Validator::make($req->all(),[
                    'name'=>'required|max:191',
                    'email'=>'required|max:191',
                    'phone'=>'required',
                    'quota'=>'required',
                    'dob'=>'required',
                    'role'=>'required',
                    'password' => 'required', 
                    'confirm_password' => 'required|same:password',
                ]);
            }
        }else{
            $validator = Validator::make($req->all(),[
                'name'=>'required|max:191',
                'email'=>'required|max:191|unique:users,email',
                'phone'=>'required',
                'quota'=>'required',
                'dob'=>'required',
                'role'=>'required',
            ]); 
            if($req->password || $req->confirm_password){
                $validator = Validator::make($req->all(),[
                    'name'=>'required|max:191',
                    'email'=>'required|max:191|unique:users,email',
                    'phone'=>'required',
                    'quota'=>'required',
                    'dob'=>'required',
                    'role'=>'required',
                    'password' => 'required', 
                    'confirm_password' => 'required|same:password',
                ]);
            }
        }
        
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'error'=>$validator->messages(),
            ]);
        }
        if($user){
            $user->name = $req->input('name');
            $user->email = $req->input('email');
            $user->quota = $req->input('quota');
            $user->role = $req->input('role');
            $user->phone = $req->input('phone');
            $user->dob = $req->input('dob');
            if($req->password){
                $user->password = Hash::make($req->password);
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
                    $file->move('uploads/dp/', $filename);
                    $user->dp = 'uploads/dp/'.$filename;
            }
            $user->update();
            return response()->json([
                'status'=>200,
                'message'=>'User Updated Successfully',
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'User Not Found',
            ]);    
        }
    } 
    public function updprofile(Request $req, $uid){
        $user = User::find($uid);

        if($req->input('email')==$user->email){
            $validator = Validator::make($req->all(),[
                'name'=>'required|max:191',
                'email'=>'required|max:191',
                'phone'=>'required',
                'dob'=>'required',
            ]);
            if($req->password || $req->confirm_password){
                $validator = Validator::make($req->all(),[
                    'name'=>'required|max:191',
                    'email'=>'required|max:191',
                    'phone'=>'required',
                    'dob'=>'required',
                    'password' => 'required', 
                    'confirm_password' => 'required|same:password',
                ]);
            }
        }else{
            $validator = Validator::make($req->all(),[
                'name'=>'required|max:191',
                'email'=>'required|max:191|unique:users,email',
                'phone'=>'required',
                'dob'=>'required',
            ]); 
            if($req->password || $req->confirm_password){
                $validator = Validator::make($req->all(),[
                    'name'=>'required|max:191',
                    'email'=>'required|max:191|unique:users,email',
                    'phone'=>'required',
                    'dob'=>'required',
                    'password' => 'required', 
                    'confirm_password' => 'required|same:password',
                ]);
            }
        }
        
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'error'=>$validator->messages(),
            ]);
        }
        if($user){
            $user->name = $req->input('name');
            $user->email = $req->input('email');
            $user->phone = $req->input('phone');
            $user->dob = $req->input('dob');
            if($req->password){
                $user->password = Hash::make($req->password);
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
                    $file->move('uploads/dp/', $filename);
                    $user->dp = 'uploads/dp/'.$filename;
            }
            $user->update();
            return response()->json([
                'status'=>200,
                'message'=>'Profile Updated Successfully',
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'User Not Found',
            ]);    
        }
    } 
    //DELETE USER 
    public function deleteuser($uid){
        $user = User::find($uid);
        if($user){
            $rental= Rental::where('auth_id',$uid)->count();
            if($rental>0){
            $rental= Rental::where('auth_id',$uid)->delete();
            }
            $user->delete();
            return response()->json([
                'status'=>200,
                'message'=>'User Deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Access Denied/ User does not Exist',
            ]);    
        }
    }
    //ADD USER BY ADMIN
    public function adduser(Request $req){
        $validator= Validator::make($req->all(),[
            'name'=>'required|max:191',
            'email'=>'required|max:191|unique:users,email',
            'password' => 'required', 
            'confirm_password' => 'required|same:password',
            'phone'=>'required',
            'quota'=>'required|numeric',
            'dob'=>'required',
            'role'=>'required',
        ]);
        if($validator->fails()){
            return response()->json([
            'status'=>422,
            'error'=>$validator->messages(),
            ]);
        }else{
            $user = new User;
            $user->name = $req->input('name');
            $user->email = $req->input('email');
            $user->phone = $req->input('phone');
            $user->dob = $req->input('dob');
            $user->role = $req->input('role');
            $user->quota = $req->input('quota');
            $user->password = Hash::make($req->input('password'));

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
                $file = $req->file('image');
                $ext = $file->getClientOriginalExtension();
                $filename = time().'.'.$ext;
                $file->move('uploads/dp/', $filename);
                $user->dp = 'uploads/dp/'.$filename;
            }
            $user->save();
                return response()->json([
                    'status'=>200,
                    'message'=>'User Added Successfully'
            ]);
        }
    }

    //Login Functionality
    public function login(Request $req){
        $validator =Validator::make($req->all(),[
            'email'=>'required|max:191',
            'password'=>'required',
        ]);
        if($validator->fails()){
            return response()->json([
                'error'=>$validator->messages(),
            ]);
        }else{
            $user =User::where('email', $req->email)->first();
            if(! $user || !Hash::check($req->password, $user->password)){
                return response()->json([
                    'status'=>401,
                    'message'=>'Invalid Email or Password'
                ]);
            }else{
                $token = $user->createToken($user->email.'_Token')->plainTextToken;
                return response()->json([
                    'status'=>200,
                    'username'=>$user->name,
                    'id'=>$user->id,
                    'role'=>$user->role,
                    'token'=>$token,
                    'message'=>'Logged In to Rentizee',
                ]);
            }
        }
    }
    //Logout Function
    public function logout(){
        auth()->user()->tokens()->delete();
        return response()->json([
            'status'=>200,
            'message'=>'You are Logged Out',
        ]);
    }
    public function rolecheck($id){
        $user = User::find($id);
        if($user){
            return response()->json([
                'role'=>$user->role,
            ]);
        }
    }
}
