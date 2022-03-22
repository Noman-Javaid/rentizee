import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory, withRouter, useParams, Link} from 'react-router-dom';

function EditCat(props)  
{
    const history = useHistory();
    const [loading, setloading] = useState(true);
    const [status, setStatus] = useState(false);
    const [categoryInput, setCategory]=useState([]);
    const [inperror, setinperror] = useState([]);
    const {cid} = useParams();

    useEffect(() => {
        axios.get(`/api/singlecat/${cid}`).then(res=>{
            if(res.data.status===200){
                setCategory(res.data.category);
            }else if(res.data.status===404){
                swal("Error",res.data.message,'error');
                history.push(`/admin/categories`);
            }
            setloading(false);
        });
    }, [history])
    useEffect(() => {
        document.title= "Portfolio | rentizee | Edit Category";
    }, [])
    if(loading){
        return <div className="d-flex text-info justify-content-center mt-5">
        <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
    </div>
    }
    const handleInput = (e)=>{
        e.persist();
        setCategory({...categoryInput, [e.target.name]:e.target.value});

    }
    const updateCat = (e)=>{
        e.preventDefault();
        const data={
            slug:categoryInput.slug,
            name:categoryInput.name, 
            catdesc:categoryInput.catdesc,
            status:status,
            meta_title:categoryInput.meta_title,
            meta_keyword:categoryInput.meta_keyword,
            meta_desc:categoryInput.meta_desc,
        }
        axios.post(`/api/updcat/${cid}`, data).then(res=>{
            if(res.data.status===200){
                swal("Success", res.data.message, "success");
                history.push('/admin/categories');
            }else if(res.data.status === 422){
                setCategory({...categoryInput, error_list:res.data.error}); 
                setinperror(res.data.error);
            }else if(res.data.status===404){
                swal("Error", res.data.message, "error");
            }
        });
    }
    var validation_errors = [];
    if(categoryInput.error_list){
        validation_errors=[
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
            categoryInput.error_list.meta_title,
        ]
    }
    return (
 <div className="container-fluid px-4">
        <h1 className="mt-4 text-success text-uppercase " >Edit Category
        <Link to={`/admin/categories`} className="btn btn-info text-light btn-sm float-end m-2"><i className="fas fa-arrow-circle-left"></i> Back</Link>
        </h1>
        <ul className="nav nav-tabs mt-2" id="myTab" role="tablist">
        <li className="nav-item " role="presentation">
            <button className="nav-link active text-success " id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Mandatory</button>
        </li>
        <li className="nav-item" role="presentation mb-2">
            <button className="nav-link text-success " id="seo-tab" data-bs-toggle="tab" data-bs-target="#seo" type="button" role="tab" aria-controls="seo" aria-selected="false">SEO Tags</button>
        </li>
        </ul>
        {
            validation_errors.map((item)=>{
                return(
                <p key={item} style={{backgroundColor:''}} className="text-danger m-0 col-sm-3 text-center text-lowercase">{item}</p>
                )
                
            })
        }
        <form id="catsubmit" onSubmit={updateCat} >
        

    <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active card-body border" id="home" role="tabpanel" aria-labelledby="home-tab">

            <div className="form-group mb-3">
                <label><span className="text-danger">* </span>Slug</label>
                <input disabled readonly type="text" name="slug" value={categoryInput.slug} className="form-control" />
                <small className="text-danger text-lowercase">{inperror.slug}</small>
            </div>
            <div className="form-group mb-3">
                <label><span className="text-danger">* </span>Name</label>
                <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                <small className="text-danger text-lowercase">{inperror.name}</small>
            </div>
            <div className="form-group mb-3">
                <label>Description</label>
                <textarea style={{'overflow-y':'scroll;', 'resize':'none'}} name="catdesc" onChange={handleInput} value={categoryInput.catdesc} className="form-control" >
                </textarea>
            </div>
            <div className="form-check  mb-3">
                <input type="checkbox" onChange={(e)=>setStatus(e.target.checked)} defaultChecked={categoryInput.status}  className="form-check-input text-success bg-success" />
                <small><b>Make Hidden</b></small>
                <small className="text-danger" > { categoryInput.status==1 ? 'This Category is Hidden' :null }</small>  
                {/* 0=shown / 1=hidden */}
            </div>

        </div>
        <div className="tab-pane fade card-body border" id="seo" role="tabpanel" aria-labelledby="seo-tab">
        <div className="form-group mb-3">
                <label><span className="text-danger">* </span>Meta Title</label>
                <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control" />
                <small className="text-danger text-lowercase">{inperror.meta_title}</small>
            </div>
            <div className="form-group mb-3">
                <label>Meta Keyword</label>
                <input type="text" name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control" />
            </div>
            <div className="form-group mb-3">
                <label>Meta Description</label>
                <textarea style={{'overflow-y':'scroll;', 'resize':'none'}} name="meta_desc" onChange={handleInput} value={categoryInput.meta_desc} className="form-control" >
                </textarea>
            </div>
        </div>
        <button className="btn btn-info text-light mt-3 mb-4 float-end" type="submit">Update</button>
        </div>
        </form>

 </div>
    )
} 
export default withRouter(EditCat);
