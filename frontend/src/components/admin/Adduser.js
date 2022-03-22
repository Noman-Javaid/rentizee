import { React, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';

export default function Adduser() {
    const [role, setrole] = useState('');
    const history = useHistory();
    const [picture, setpicture] = useState([]);
    const [error, setError] = useState([]);
    useEffect(() => {
        document.title= "Portfolio | rentizee | Add User";
    }, [])

    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        phone: '',
        dob: '',
        password: '',
        confirm_password: '',
        quota: '',
    });
    const handleInput = (e) => {
        e.persist();
        setRegister({ ...registerInput, [e.target.name]: e.target.value });
    }
    const handleImage = (e) => {
        setpicture({ image: e.target.files[0] });
    }

    const registerSubmit = (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append('image', picture.image);
        formdata.append('name', registerInput.name);
        formdata.append('email', registerInput.email);
        formdata.append('phone', registerInput.phone);
        formdata.append('dob', registerInput.dob);
        formdata.append('role', role);
        formdata.append('quota', registerInput.quota);
        formdata.append('password', registerInput.password);
        formdata.append('confirm_password', registerInput.confirm_password);

        
        axios.post(`/api/adduser`, formdata).then(res => {
            if (res.data.status === 200) {
                swal("Success", res.data.message, "success");
                history.push('/admin/allusers');
                setError([]);
            }else if (res.data.status === 422) {
                setError(res.data.error);
                swal("Error", "Please Fill All Mandatory Fields", "error");
            }else if (res.data.status === 423) {
                swal("Error", "Choose Correct Format of Image", "error");
            }
        });
    }

    return (
        <div>

            <div className='container-fluid px-4'>
                <h1 className="mt-4 text-success text-uppercase" >Add User</h1>
                <nav>
                    <div className="nav nav-tabs mt-3" id="nav-tab" role="tablist">
                        <button className="nav-link active text-success" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#basic" type="button" role="tab" aria-controls="basic" aria-selected="true">Basic</button>
                        <button className="nav-link text-success" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#personal" type="button" role="tab" aria-controls="personal" aria-selected="false">Personal</button>
                        <button className="nav-link text-success" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#secure" type="button" role="tab" aria-controls="secure" aria-selected="false">Secure</button>
                    </div>
                </nav>
                <form onSubmit={registerSubmit}>
                    <div className="tab-content" id="nav-tabContent">
                        <div className="tab-pane fade show active border card-body" id="basic" role="tabpanel" aria-labelledby="basic-tab">
                            <div className="form-group mb-3">
                                <label><span className="text-danger">* </span>QUOTA</label>
                                <input type="number" name="quota" className="form-control" onChange={handleInput} value={registerInput.quota} placeholder="Enter User Quota" />
                                <small className="text-danger">{error.quota ? error.quota : ''}</small>
                            </div>
                            <div className='form-group mb-3'>
                                <label><span className="text-danger">* </span>User Role</label>
                                <select className="form-control form-select custom-select" onChange={(e) => setrole(e.target.value)} >
                                    <option hidden value='' >Select Role</option>
                                    <option className="text-uppercase" value='end'>Normal User</option>
                                    <option className="text-uppercase" value='admin'>Admin</option>
                                    <option className="text-uppercase" value='agency'>Agency</option>
                                </select>
                                <small className="text-danger">{error.role ? error.role : ''}</small>
                            </div>
                        </div>
                        <div className="tab-pane fade border card-body" id="personal" role="tabpanel" aria-labelledby="personal-tab">
                            <div className="form-group mb-3">
                                <label><span className="text-danger">* </span>Name</label>
                                <input type="text" name="name" className="form-control" onChange={handleInput} value={registerInput.name} placeholder="Enter Name" />
                                <small className="text-danger">{error.name ? error.name : ''}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label ><span className="text-danger">* </span>Email</label>
                                <input type="email" name="email" className="form-control" onChange={handleInput} value={registerInput.email} placeholder="Enter Email" />
                                <small className="text-danger">{error.email ? error.email : ''}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label ><span className="text-danger">* </span>Phone</label>
                                <input type="tel" name="phone" pattern="[+][9][2][3][0-9]{9}" className=" form-control" onChange={handleInput} value={registerInput.phone} placeholder="+923[9]" />
                                <small className="text-danger">{error.phone ? error.phone : ''}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label ><span className="text-danger">* </span>DOB</label>
                                <input type="date" name="dob" className="form-control" onChange={handleInput} value={registerInput.dob} placeholder="Enter DOB" />
                                <small className="text-danger">{error.dob ? error.dob : ''}</small>
                            </div>
                            <div className="row">
                                <div className='form-group mb-3'>
                                    <label className='mt-3'>Add Profile Image</label>
                                    <input type="file" name="image" onChange={handleImage} className=" btn btn-info text-light form-control" />
                                    <small className='text-warning text-lowercase'>jpg, png, jpeg (5 MB max)</small><br />
                                    </div>
                            </div>


                        </div>
                        <div className="tab-pane fade border card-body" id="secure" role="tabpanel" aria-labelledby="secure-tab"><div className="form-group mb-3">
                            <div className="form-group mb-3">
                                <label ><span className="text-danger">* </span>Password</label><small className="text-success"> (atleast 8 characters)</small>
                                <input type="password" name="password" minLength="8" className="form-control" onChange={handleInput} value={registerInput.password} placeholder="Enter password" />
                                <small className="text-danger">{error.password ? error.password : ''}</small>
                            </div>
                            <div className="form-group mb-3">
                                <label ><span className="text-danger">* </span>Confirm Password</label><small className="text-success"> (same as above)</small>
                                <input type="password" name="confirm_password" minLength="8" className="form-control" onChange={handleInput} value={registerInput.confirm_password} placeholder="Enter confirm password" />
                                <small className="text-danger">{error.confirm_password ? error.confirm_password : ''}</small>
                            </div>
                        </div>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-info text-light float-end mt-4">Add User</button>
                </form>

            </div>
        </div>
    )
}
