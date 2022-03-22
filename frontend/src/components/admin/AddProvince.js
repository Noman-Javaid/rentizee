import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import { useEffect } from 'react';


export default function AddProvince() {
    const [province, setProvince] = useState({
        name:'',
        error_list:[]
    });
    const history= useHistory();

    useEffect(() => {
        document.title= "Portfolio | rentizee | Add Provice";
    }, [])

    const handleInput = (e)=>{
        e.persist();
        setProvince({...province, [e.target.name]:e.target.value});
    }
    const addProvince = (e)=>{
        e.preventDefault();
        const data={
            name:province.name      
          }
          axios.post(`/api/addprvince`, data).then(res=>{
            if(res.data.status ===200){
                setProvince({ 
                    name:'' 
                });
                swal("Success", res.data.message, "success");
                history.push('/admin/locations');
            }else if(res.data.status ===400){ 
                setProvince({...province, error_list: res.data.error});
            }
        });
    }
       
    
    return (
        <div className="container-fluid p-4">
            <h1 className="text-success text-uppercase">Add Province</h1>
            <form onSubmit={addProvince} >
            <div className="form-group  card-body">
                <label><span className="text-danger">* </span>Enter Province Name</label>
                <input type="text" name="name" onChange={handleInput} value={province.name} className="form-control" placeholder="Enter Name" />
                <small className="text-danger text-lowercase">{province.error_list ? province.error_list.name: null}</small>
            </div>
            <button className="btn btn-info text-light mt-3 mb-4 float-end" type="submit">Submit</button>
            </form>
        </div>
    )
}
