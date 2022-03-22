<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\subscriber;
use App\Models\Rental;



class subscriberController extends Controller
{
    //
    public function subscribe($uid, $sid, $sname){
        $subscriber = subscriber::where(['user'=>$uid, 'subscriber'=>$sid])->first();
        if($subscriber){
            return response()->json([
                'status'=>404,
                'message'=>"Already Subscribed"
            ]);
        }else{
            $subscriber = new subscriber;
            $rental = Rental::where( 'auth_id', $uid )->get();
            $subscriber->user = $uid;
            $subscriber->subscriber = $sid;
            $subscriber->u_name = $rental[0]->auth_name;
            $subscriber->u_role = $rental[0]->auth_role;
            $subscriber->s_name = $sname;
            $subscriber->save();
            return response()->json([
                'status'=>200,
                'message'=>"Subscribed Successfully"
            ]);
        }
    }
    public function checksub($uid, $sid){
        $subscriber = subscriber::where(['user'=>$uid, 'subscriber'=>$sid])->first();
        if($subscriber){
            return response()->json([
                'status'=>200,
            ]);  
        }
        else{
            return response()->json([
                'status'=>404,
            ]); 
        }
    }
    public function unsub($uid, $sid){
        $subscriber = subscriber::where(['user'=>$uid, 'subscriber'=>$sid])->first();
        if($subscriber){
            $subscriber->delete();
            return response()->json([
                'status'=>200,
                'message'=>"Unsubscribed Successfully",
            ]);  
        }else{
            return response()->json([
                'status'=>404,
                'message'=>"Already Unsubscribed",
            ]);  
        }
    }
    public function subscriptions($sid){
        $agencies = subscriber::where(['subscriber'=>$sid])->get();
        $count = subscriber::where(['subscriber'=>$sid])->count();
        if($count>0){
            return response()->json([
                'status'=>200,
                'agencies'=>$agencies
            ]);
            
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No Agencies Subscribed'
            ]);
        }
    }
    public function subscribers($uid){
        $subscribers = subscriber::where(['user'=>$uid])->get();
        $count = subscriber::where(['user'=>$uid])->count();
        if($count>0){
            return response()->json([
                'status'=>200,
                'subscribers'=>$subscribers
            ]);
            
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No Subscribers Yet'
            ]);
        }
    }

}
