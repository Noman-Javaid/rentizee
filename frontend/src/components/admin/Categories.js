import {React, useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
 
//FOR CATEGORIES_____________________________________________
export default function Categories() {
    const [loading, setloading] = useState(true);
    const [cat, setCat] = useState([]);
    const [subcat, setSubcat] = useState([]);
    useEffect(() => {
        axios.get(`/api/allcatadmin`).then(res=>{
            if(res.data.status===200){
                setCat(res.data.category);
            }
            setloading(false);
        }) 
    }, [])
//FOR SUB CATEGORIES_____________________________________________
    useEffect(() => {
      axios.get(`/api/allsubcat`).then(res=>{
          if(res.data.status===200){
              setSubcat(res.data.subcategory);
          }
          setloading(false);
      }) 
  }, [])
  useEffect(() => {
    document.title= "Portfolio | rentizee | Categories";
}, [])
//FOR CATEGORIES_____________________________________________
    const delCat = (e,id)=>{
      e.preventDefault();
      const delCat = e.currentTarget;
      delCat.innerHTML=  'deleting...';
      axios.delete(`/api/deletecat/${id}`).then(res=>{
        if(res.data.status===200){
          swal('Success',res.data.message,"success");
          delCat.closest("tr").remove();
        }else if(res.data.status=404){
          swal('Error',res.data.message,"error");
          delCat.innerHTML = 'Not Deleted';
        }
      });
    }
//FOR SUB CATEGORIES_____________________________________
const delSubcat = (e,id)=>{
  e.preventDefault();
  const delCat = e.currentTarget;
  delCat.innerHTML=  'deleting...';
  axios.delete(`/api/deletesubcat/${id}`).then(res=>{
    if(res.data.status===200){
      swal('Success',res.data.message,"success");
      delCat.closest("tr").remove();
    }else if(res.data.status=404){
      swal('Error',res.data.message,"error");
      delCat.innerHTML = 'Not Deleted';
    }
  });
}
//FOR CATEGORIES_____________________________________________
    if(loading){
        return <div className="d-flex text-info justify-content-center mt-5">
        <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
    </div>
    }else{
      var  category_content = cat.map((item, key)=>{
            return   (<tbody >
            <tr key={item.id}>
              <th className="text-success" scope="row">{item.id}</th>
              <td className="text-success">{item.name}</td>
              <td className="text-success">{item.slug}</td>
              <td className="text-success">{item.status==0? <small>Shown</small> :<small>Hidden</small>}</td>
              <td className="text-success">{item.posts}</td>
              <td>
                <Link to={`/admin/editcat/${item.id}`} className="btn text-success" ><i className="far fa-edit"></i></Link>
                <button type="button" onClick={(e)=>delCat(e, item.id)} className="btn text-danger" ><i className="fas fa-trash"></i></button>
                <Link to={`/category/${item.slug}`} className="btn text-success" ><i className="fa-solid fa-camera text-info"></i></Link>
                </td>

            </tr>
          </tbody>) 
        });
        
//FOR SUB CATEGORIES_____________________________________________
        var  subcategory_content = subcat.map((item, key)=>{
          return   (<tbody >
          <tr key={item.id}>
            <th className="text-success" scope="row">{item.id}</th>
            <td className="text-success">{item.name}</td>
            <td className="text-success">{item.slug}</td>
            <td className="text-success">{item.status==0? <small>Shown</small> :<small>Hidden</small>}</td>
            <td className="text-success">{item.posts}</td>
            <td className="text-success">{item.parentcat}</td>
            <td><Link to={`/admin/editsubcat/${item.id}`} className="btn text-success" ><i className="far fa-edit"></i></Link>
            <button type="button" onClick={(e)=>delSubcat(e, item.id)} className="btn text-danger" ><i className="fas fa-trash"></i></button>
            <Link to={`/subcat/${item.parentcat}/${item.slug}`} className="btn text-success" ><i className="fa-solid fa-camera text-info"></i></Link>
            </td>
          </tr>
        </tbody>) 
      });
    }

   //FOR CATEGORIES __________________________________

    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4 text-success text-uppercase" >Categories
            </h1>
            <ul className="nav nav-tabs mt-2" id="myTab" role="tablist">
            <li className="nav-item " role="presentation">
                <button className="nav-link active text-success " id="categories-tab" data-bs-toggle="tab" data-bs-target="#categories" type="button" role="tab" aria-controls="categories" aria-selected="true">Categories ({cat.length})</button>
            </li>
            <li className="nav-item" role="presentation">
                <button className="nav-link text-success" id="subcat-tab" data-bs-toggle="tab" data-bs-target="#subcat" type="button" role="tab" aria-controls="subcat" aria-selected="false">Sub Categories ({subcat.length})</button>
            </li>
            </ul>
            <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active card-body" id="categories" role="tabpanel" aria-labelledby="categories-tab">
            <Link to={`/admin/addcategory`} className="btn btn-info text-light btn-sm float-end">Add Category</Link>

            <table className="table text-success text-center">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Slug</th>
      <th scope="col">Status</th>
      <th scope="col">Posts</th>
      <th scope="col">Operations</th>
    </tr>
  </thead>
  {category_content}

</table>    
                
            </div>
            <div className="tab-pane fade card-body" id="subcat" role="tabpanel" aria-labelledby="subcat-tab">
      
            <Link to={`/admin/addsubcat`} className="btn btn-info text-light btn-sm float-end">Add Sub Category</Link>
            <table className="table text-success text-center">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Slug</th>
      <th scope="col">Status</th>
      <th scope="col">Posts</th>
      <th scope="col">Parent category</th>
      <th scope="col">Operations</th>
    </tr>
  </thead>
{subcategory_content}
</table>    

            </div>
            </div>
        </div>
    )
}
 