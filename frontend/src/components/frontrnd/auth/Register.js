import React, {useState} from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom';

export default function Register() {

    const history = useHistory();
    const [registerInput, setRegister] = useState({
            name:'',
            email:'',
            phone:'',
            dob:'',
            password:'',
            confirm_password:'',
            role:'end',
            error_list:[]
    });
    const handleInput = (e) =>{
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value});
    }

    const registerSubmit = (e) =>{ 
        e.preventDefault();  
        const data ={
            name:registerInput.name,
            email:registerInput.email,
            phone:registerInput.phone,
            dob:registerInput.dob,
            role:registerInput.role,
            password:registerInput.password,
            confirm_password:registerInput.confirm_password,
        }
        axios.get('/sanctum/csrf-cookie').then(response => {
        axios.post(`/api/register`, data).then(res =>{
            if(res.data.status===200){
                localStorage.setItem('auth_token', res.data.token);
                localStorage.setItem('auth_name', res.data.username);
                localStorage.setItem('auth_role', res.data.role);
                localStorage.setItem('auth_id', res.data.id);
                swal("Success",res.data.message);
                history.push('admin/dashboard');
            }else{
                setRegister({...registerInput, error_list: res.data.error});
            }
        });
        });
    }

    return (
        <div>
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">
                            <h4>Register Yourself</h4>
    </div>
    <div className="card-body">
        <form onSubmit={registerSubmit}>
            <div className="form-group mb-3">
            <label><span className="text-danger">* </span>Name</label>
            <input  type="text" name="name" className="form-control" onChange={handleInput} value={registerInput.name} placeholder="Enter Name" />
            <input  type="text" name="role" value={registerInput.role} hidden readonly />
            <small className="text-danger">{registerInput.error_list.name}</small>
            </div>
            <div className="form-group mb-3">
            <label ><span className="text-danger">* </span>Email</label>
            <input  type="email" name="email" className="form-control"  onChange={handleInput} value={registerInput.email}  placeholder="Enter Email" />
            <small className="text-danger">{registerInput.error_list.email}</small>
            </div>
            <div className="form-group mb-3">
            <label ><span className="text-danger">* </span>Phone</label>
            <input  type="tel" name="phone" pattern="[+][9][2][3][0-9]{9}" className=" form-control"  onChange={handleInput} value={registerInput.phone}  placeholder="+923[9]" />
            <small className="text-danger">{registerInput.error_list.phone}</small>
            </div>
            <div className="form-group mb-3">
            <label ><span className="text-danger">* </span>DOB</label>
            <input  type="date" name="dob"  className="form-control"  onChange={handleInput} value={registerInput.dob}  placeholder="Enter DOB" />
            <small className="text-danger">{registerInput.error_list.dob}</small>
            </div>
            <div className="form-group mb-3">
            <label ><span className="text-danger">* </span>Password</label><small className="text-success"> (atleast 8 characters)</small>
            <input  type="password"  name="password" minLength="8" className="form-control"  onChange={handleInput} value={registerInput.password}  placeholder="Enter password" />     
            <small className="text-danger">{registerInput.error_list.password}</small>
            </div>
            <div className="form-group mb-3">
            <label ><span className="text-danger">* </span>Confirm Password</label><small className="text-success"> (same as above)</small>
            <input  type="password"  name="confirm_password" minLength="8" className="form-control"  onChange={handleInput} value={registerInput.confirm_password}  placeholder="Enter confirm password" />     
            <small className="text-danger">{registerInput.error_list.confirm_password}</small>
            </div>
            <div>
                                     <button type="submit" className="btn btn-info text-light float-end mt-4">Register</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
