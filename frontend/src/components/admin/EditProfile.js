import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory, withRouter, useParams, Link} from 'react-router-dom';


export default function EditProfile() {
    const [role, setrole] = useState('');
    const [loading, setloading] = useState(true);
    const [registerInput, setregisterInput] = useState([]);
    const [picture, setpicture] = useState([]);
    const [error, setError] = useState([]);
    const history = useHistory();
    const uid = localStorage.getItem('auth_id');

    useEffect(() => {
        axios.get(`/api/singleuser/${uid}`).then(res=>{
            if(res.data.status===200){
                setregisterInput(res.data.user);
            }else if(res.data.status===404){
                swal("Error",res.data.message,'error');
                history.push(`/admin/allusers`);
            }
            setloading(false);
        });
    }, [history])
    
    useEffect(() => {
        document.title= "Portfolio | rentizee | Edit Profile";
    }, [])
    if(loading){
        return <div className="d-flex text-info justify-content-center mt-5">
        <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
    </div>
    }

    const handleInput = (e) =>{
        e.persist();
        setregisterInput({...registerInput, [e.target.name]: e.target.value});
    }
    const handleImage = (e) => {
        setpicture({ image: e.target.files[0] });
    }

    const registerSubmit = (e) =>{ 
        e.preventDefault();  
        const formdata = new FormData();
        formdata.append('image', picture.image);
        formdata.append('name', registerInput.name);
        formdata.append('email', registerInput.email);
        formdata.append('phone', registerInput.phone);
        formdata.append('dob', registerInput.dob);
        formdata.append('password', registerInput.password);
        formdata.append('confirm_password', registerInput.confirm_password);

        axios.post(`/api/updprofile/${uid}`, formdata).then(res =>{
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                history.push('/admin/profile');
                setError([]);
            }else if (res.data.status === 422) {
                setError(res.data.error);
                swal("Error", "Please Fill All Mandatory Fields", "error");
            }else if (res.data.status === 423) {
                swal("Error", "Choose Correct Format of Image", "error");
            }else if (res.data.status === 404) {
                swal("Error", res.data.message, "error");
            }
        });
    }
    return (
        <div>

        <div className='container-fluid px-4'>
        <h1 className="mt-4 text-success text-uppercase " >Update Profile</h1>
        <nav>
            <div className="nav nav-tabs mt-3" id="nav-tab" role="tablist">
                <button className="nav-link active text-success" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#personal" type="button" role="tab" aria-controls="personal" aria-selected="false">Personal</button>
                <button className="nav-link text-success" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#secure" type="button" role="tab" aria-controls="secure" aria-selected="false">Secure</button>
            </div>
            </nav>
            <form onSubmit={registerSubmit}>
            <div className="tab-content" id="nav-tabContent"> 
            <div className="tab-pane active show fade border card-body" id="personal" role="tabpanel" aria-labelledby="personal-tab">
            <div className="form-group mb-3">
            <label><span className="text-danger">* </span>Name</label>
            <input  type="text" name="name" className="form-control" onChange={handleInput} value={registerInput.name} placeholder="Enter Name" />
            <small className="text-danger">{error.name ? error.name : ''}</small>
            </div>
            <div className="form-group mb-3">
            <label ><span className="text-danger">* </span>Email</label>
            <input  type="email" name="email" className="form-control"  onChange={handleInput} value={registerInput.email}  placeholder="Enter Email" />
            <small className="text-danger">{error.email ? error.email : ''}</small>
            </div>
            <div className="form-group mb-3">
            <label ><span className="text-danger">* </span>Phone</label>
            <input  type="tel" name="phone" pattern="[+][9][2][3][0-9]{9}" className=" form-control"  onChange={handleInput} value={registerInput.phone}  placeholder="+923[9]" />
            <small className="text-danger">{error.phone ? error.phone : ''}</small>
            </div>
            <div className="form-group mb-3">
            <label ><span className="text-danger">* </span>DOB</label>
            <input  type="date" name="dob"  className="form-control"  onChange={handleInput} value={registerInput.dob}  placeholder="Enter DOB" />
            <small className="text-danger">{error.dob ? error.dob : ''}</small>
            </div>
            <div className="row">
            <div className='form-group mb-3'>
                <label className='mt-3'>Add Profile Image</label>
                <input type="file" name="image" onChange={handleImage} className=" btn btn-info text-light form-control" />
                <small className='text-warning text-lowercase'>jpg, png, jpeg (5 MB max)</small><br />
                <img src={`http://localhost:8000/${registerInput.dp}`}  alt={registerInput.dp} defaultValue={registerInput.dp} width='200px' />
                <small className="text-danger">{registerInput.dp ? '': "No Profile Image Yet"}</small>
                </div>
            </div>


            </div>
            <div className="tab-pane fade border card-body" id="secure" role="tabpanel" aria-labelledby="secure-tab"><div className="form-group mb-3">
            <div className="form-group mb-3">
            <label ><span className="text-danger">(Optional) </span>Change Password</label><small className="text-success"> (atleast 8 characters)</small>
            <input  type="password"  name="password" minLength="8" className="form-control"  onChange={handleInput} value={registerInput.password}  placeholder="Enter password" />     
            <small className="text-danger">{error.password ? error.password : ''}</small>
            </div>
            <div className="form-group mb-3">
            <label >Confirm Password</label><small className="text-success"> (same as above)</small>
            <input  type="password"  name="confirm_password" minLength="8" className="form-control"  onChange={handleInput} value={registerInput.confirm_password}  placeholder="Enter confirm password" />     
            <small className="text-danger">{error.confirm_password ? error.confirm_password : ''}</small>
            </div>
            </div>
            </div>
            </div>
            <button type="submit" className="btn btn-info text-light float-end mt-4">Update Profile</button>
                </form>

        </div>
        </div>
    )
}
