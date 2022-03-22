<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Models\Subcategory;
use Illuminate\Support\Facades\Validator;

//FUNCTIONS FOR CATEGORIES
class categoryController extends Controller
{
    public function submitcat(Request $req){
        $validator = Validator::make($req->all(),[
            'meta_title'=>'required|max:191',
            'slug'=>'required|max:191|unique:categories,slug',
            'name'=>'required|max:191',
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>400,
                'error'=>$validator->messages(),
            ]);
        }
        $category = new Category;
        $category->meta_title = $req->input('meta_title');
        $category->meta_keyword = $req->input('meta_keyword');
        $category->meta_desc = $req->input('meta_desc');
        $category->slug = $req->input('slug');
        $category->name = $req->input('name');
        $category->catdesc = $req->input('catdesc');
        $category->status = $req->input('status') == true ? '1': '0';
        $category->save();
        return response()->json([
            'status'=>200,
            'message'=>'Category Added Successfully',
        ]);
    }


    public function allcat(){
        $category = Category::where('status',0)->get();
        return response()->json([
            'status'=>200,
            'category'=>$category
        ]);
    }

    public function allcatadmin(){
        $category = Category::get(); 
        return response()->json([
            'status'=>200,
            'category'=>$category
        ]);
    }
    public function singlecat($cid){
        $category = Category::find($cid);
        if($category){
            return response()->json([
                'status'=>200,
                'category'=>$category
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'No Such Category Found'
            ]); 
        }
    }

    public function updcat(Request $req, $cid){
        $validator = Validator::make($req->all(),[
            'meta_title'=>'required|max:191',
            'slug'=>'required|max:191',
            'name'=>'required|max:191',
        ]);
        if($validator->fails()){
            return response()->json([
                'status'=>422,
                'error'=>$validator->messages(),
            ]);
        }

        $category = Category::find($cid);
        if($category){
            $category->meta_title = $req->input('meta_title');
            $category->meta_keyword = $req->input('meta_keyword');
            $category->meta_desc = $req->input('meta_desc');
            $category->slug = $req->input('slug');
            $category->name = $req->input('name');
            $category->catdesc = $req->input('catdesc');
            $category->status = $req->input('status') == true ? '1': '0';
            $category->save();
            return response()->json([
                'status'=>200,
                'message'=>'Category Updated Successfully',
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Category Not Found',
            ]);    
        }

    }
    public function deletecat($cid){
        $category = Category::find($cid);
        if($category){
            $category->delete();
            return response()->json([
                'status'=>200,
                'message'=>'Category Deleted Successfully',
            ]);
        }else{
            return response()->json([
                'status'=>404,
                'message'=>'Access Denied/ Category does not Exist',
            ]);    
        } 
    }
//FUNCTIONS FOR SUB CATEGORIES 
    
    public function subcatslug($slug){
        $subcat = Subcategory::where(['parentcat'=>$slug, 'status'=>0])->get();
        return response()->json([
            'subcat'=>$subcat,
            'slug'=>$slug
        ]);
    }

    public function submitsubcat(Request $req){
    $validator = Validator::make($req->all(),[
        'meta_title'=>'required|max:191',
        'slug'=>'required|max:191|unique:subcategories,slug',
        'name'=>'required|max:191',
        'parentcat'=>'required|max:191',
    ]);
    if($validator->fails()){
        return response()->json([
            'status'=>400,
            'error'=>$validator->messages(),
        ]);
    }
    $subcategory = new Subcategory;
    $subcategory->meta_title = $req->input('meta_title');
    $subcategory->meta_keyword = $req->input('meta_keyword');
    $subcategory->meta_desc = $req->input('meta_desc');
    $subcategory->slug = $req->input('slug');
    $subcategory->name = $req->input('name');
    $subcategory->parentcat = $req->input('parentcat');
    $subcategory->catdesc = $req->input('catdesc');
    $subcategory->status = $req->input('status') == true ? '1': '0';
    $subcategory->save();
    return response()->json([
        'status'=>200,
        'message'=>'Sub Category Added Successfully',
    ]);
}

public function allsubcat(){
    $subcategory = Subcategory::latest()->get();
    return response()->json([
        'status'=>200,
        'subcategory'=>$subcategory
    ]);
}
public function deletesubcat($cid){
    $subcategory = Subcategory::find($cid);
    if($subcategory){
        $subcategory->delete();
        return response()->json([
            'status'=>200,
            'message'=>'Sub Category Deleted Successfully',
        ]);
    }else{
        return response()->json([
            'status'=>404,
            'message'=>'Access Denied/ Sub Category does not Exist',
        ]);    
    } 
}
public function singlesubcat($cid){
    $subcategory = Subcategory::find($cid);
    if($subcategory){
        return response()->json([
            'status'=>200,
            'subcategory'=>$subcategory
        ]);
    }else{
        return response()->json([
            'status'=>404,
            'message'=>'No Such Sub Category Found'
        ]); 
    }
}

public function updsubcat(Request $req, $cid){
    $validator = Validator::make($req->all(),[
        'meta_title'=>'required|max:191',
        'slug'=>'required|max:191',
        'name'=>'required|max:191',
        'parentcat'=>'required|max:191',
    ]);
    if($validator->fails()){
        return response()->json([
            'status'=>422,
            'error'=>$validator->messages(), 
        ]);
    }

    $subcategory = Subcategory::find($cid);
    if($subcategory){
        $subcategory->meta_title = $req->input('meta_title');
        $subcategory->meta_keyword = $req->input('meta_keyword');
        $subcategory->meta_desc = $req->input('meta_desc');
        $subcategory->slug = $req->input('slug');
        $subcategory->name = $req->input('name');
        $subcategory->parentcat = $req->input('parentcat');
        $subcategory->catdesc = $req->input('catdesc');
        $subcategory->status = $req->input('status') == true ? '1': '0';
        $subcategory->save();
        return response()->json([
            'status'=>200,
            'message'=>'subCategory Updated Successfully',
        ]);
    }else{
        return response()->json([
            'status'=>404,
            'message'=>'subCategory Not Found',
        ]);    
    }
}
// public function selectsubcat($slug){
//     $subcat = Subcategory::where('parentcat', $slug)->get();
//     return response()->json([
//         'subcats'=>$subcat
//     ]);
// }
}
 