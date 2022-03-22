import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert'; 
import { useHistory } from 'react-router-dom';

export default function AddCategory() {
    const history = useHistory();
    const [status, setStatus] = useState(false);
    const [parentcat, setParentcat] = useState('');
    const [cat, setCat] = useState([]);

    useEffect(() => {
        document.title= "Portfolio | rentizee | Add Subcat";
    }, [])
    useEffect(() => {
        axios.get(`/api/allcat`).then(res=>{
            if(res.data.status===200){
                setCat(res.data.category);
            }
        })  
    }, [])
 
    const [categoryInput, setCategory]=useState({
        slug:'',
        name:'',
        catdesc:'',
        meta_title:'',
        meta_keyword:'',
        meta_desc:'',
        error_list:[],
    });
    const handleInput = (e)=>{
        e.persist();
        setCategory({...categoryInput, [e.target.name]:e.target.value});
    }
    const submitCategory = (e)=>{
        e.preventDefault();
        const data={
            slug:categoryInput.slug,
            name:categoryInput.name, 
            catdesc:categoryInput.catdesc,
            parentcat:parentcat,
            status:status,
            meta_title:categoryInput.meta_title,
            meta_keyword:categoryInput.meta_keyword,
            meta_desc:categoryInput.meta_desc,
        }
        axios.post(`/api/submitsubcat`, data).then(res=>{
            if(res.data.status ===200){
                setCategory({ //Reseting The Form Fields 
                    slug:'',
                    name:'',
                    catdesc:'',
                    meta_title:'',
                    meta_keyword:'',
                    meta_desc:'',
                    error_list:[], 
                });
                document.getElementById("catsubmit").reset();
                swal("Success", res.data.message, "success");
                history.push('/admin/categories');
            }else if(res.data.status ===400){ 
                setCategory({...categoryInput, error_list:res.data.error}); 
            }
        });
    }
    var validation_errors = [];
    if(categoryInput.error_list){
        validation_errors=[
            categoryInput.error_list.slug,
            categoryInput.error_list.name,
            categoryInput.error_list.parentcat, 
            categoryInput.error_list.meta_title,
        ]
    }
    return (
 <div className="container-fluid px-4">
        <h1 className="mt-4 text-success text-uppercase " >Add Sub Category</h1>
        <ul className="nav nav-tabs mt-2 " id="myTab" role="tablist">
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
                <p key={item} className="text-danger m-0 col-sm-3 text-center text-lowercase">{item}</p>
                )
                
            })
        }
        <form onSubmit={submitCategory} id="catsubmit" >
        

    <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active card-body border" id="home" role="tabpanel" aria-labelledby="home-tab">

            <div className="form-group mb-3">
                <label><span className="text-danger">* </span>Slug</label>
                <input onKeyUp={(e)=>{e.target.value = e.target.value.toLowerCase()}} type="text" name="slug" onChange={handleInput} value={categoryInput.slug} className="form-control" />
                <small className="text-danger text-lowercase">{categoryInput.error_list.slug}</small>
            </div>
            <div className="form-group mb-3">
                <label><span className="text-danger">* </span>Name</label>
                <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" />
                <small className="text-danger text-lowercase">{categoryInput.error_list.name}</small>
            </div>
            <div className="form-group mb-3">
                <label><span className="text-danger">* </span>Select Parent Category</label>
                {/* <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" /> */}
                <select className="form-control form-select custom-select" onChange={(e)=>setParentcat(e.target.value)} >
                    <option value='' hidden >Select Parent Category</option>
                    {
                        cat.map((item, key)=>{
                        return (<option className="text-uppercase" key={item.id} value={item.slug} >{item.name}</option>);
                        })
                    }
                </select>
                <small className="text-danger text-lowercase">{categoryInput.error_list.parentcat}</small>
            </div>
            <div className="form-group mb-3">
                <label>Description</label>
                <textarea style={{'overflow-y':'scroll;', 'resize':'none'}} name="catdesc" onChange={handleInput} value={categoryInput.catdesc} className="form-control" >
                </textarea>
            </div>
            <div className="form-check  mb-3">
                {/* <label>Status</label> */} 
                <input type="checkbox" onChange={(e)=>setStatus(e.target.checked)}  className="form-check-input text-success bg-success" />
                <small><b>Make Hidden</b> </small> 
                {/* 0=shown / 1=hidden */}
            </div>

        </div>
        <div className="tab-pane fade card-body border" id="seo" role="tabpanel" aria-labelledby="seo-tab">
        <div className="form-group mb-3">
                <label><span className="text-danger">* </span>Meta Title</label>
                <input type="text" name="meta_title" onChange={handleInput} value={categoryInput.meta_title} className="form-control" />
                <small className="text-danger text-lowercase">{categoryInput.error_list.meta_title}</small>
            </div>
            <div className="form-group mb-3">
                <label>Meta Keyword</label>
                <input onKeyUp={(e)=>{e.target.value = e.target.value.toLowerCase()}} type="text" name="meta_keyword" onChange={handleInput} value={categoryInput.meta_keyword} className="form-control" />
            </div>
            <div className="form-group mb-3">
                <label>Meta Description</label>
                <textarea style={{'overflow-y':'scroll;', 'resize':'none'}} name="meta_desc" onChange={handleInput} value={categoryInput.meta_desc} className="form-control" >
                </textarea>
            </div>
        </div>
        <button className="btn btn-info text-light mt-3 mb-4 float-end" type="submit">Submit</button>
        </div>
        </form>

 </div>
    )
}

