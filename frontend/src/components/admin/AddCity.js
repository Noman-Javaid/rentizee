import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert'; 
import { useHistory } from 'react-router-dom';

export default function AddCity() {
    const history = useHistory();
    const [province, setprovince] = useState([]);
    const [provincename, setprovincename] = useState('');
    const [city, setcity] = useState({
        name:'',
        province:'',
        error_list:[]
    }); 
    useEffect(() => {
        axios.get(`api/province`).then(res=>{
            if(res.data.status===200){
                setprovince(res.data.province);
            }
        })
    }, [])
    useEffect(() => {
        document.title= "Portfolio | rentizee | Add City";
    }, [])
    const handleInput = (e)=>{
        e.persist();
        setcity({...city, [e.target.name]:e.target.value});
    }
    const addcity = (e)=>{   
        e.preventDefault();
        const data={
            name:city.name,
            province:provincename
          }
          axios.post(`/api/addcity`, data).then(res=>{
            if(res.data.status ===200){
                setcity({ 
                    name:'',
                    provincename:''
                });
                swal("Success", res.data.message, "success");
                history.push('/admin/locations');
            }else if(res.data.status ===400){ 
                setcity({...city, error_list: res.data.error});
            }
        });
    }

    return (
        <div className="container-fluid p-4">
        <h1 className="text-success text-uppercase">Add City</h1>
        <form onSubmit={addcity} className="card-body">
        <div className="form-group mt-3 ">
            <label><span className="text-danger">* </span>Enter City Name</label>
            <input type="text" name="name" onChange={handleInput} value={city.name} className="form-control" placeholder="Enter Name" />
            <small className="text-danger text-lowercase">{city.error_list ? city.error_list.name: null}</small>
        </div>
        <div className="form-group mt-3">
                <label><span className="text-danger">* </span>Select Province</label>
                {/* <input type="text" name="name" onChange={handleInput} value={categoryInput.name} className="form-control" /> */}
                <select className="form-control form-select custom-select" onChange={(e)=>setprovincename(e.target.value)} >
                    <option value='' hidden >Select Province</option>
                    {
                        province.map((item, key)=>{
                        return (<option className="text-uppercase" key={item.id} value={item.id} >{item.name}</option>);
                        })
                    }
                </select>
                <small className="text-danger text-lowercase">{city.error_list? city.error_list.province: null}</small>
            </div>
        <button className="btn btn-info text-light mt-3 mb-4 float-end" type="submit">Submit</button>
        </form>
    </div>
    )
}
