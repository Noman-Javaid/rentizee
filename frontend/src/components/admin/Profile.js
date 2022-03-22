import { React, useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
export default function Profile() {
    const [loading, setloading] = useState(true);
    const [users, setusers] = useState([]);
    const id = localStorage.getItem('auth_id');
    useEffect(() => {
        axios.get(`/api/singleuser/${id}`).then(res => {
            if (res.data.status === 200) {
                setusers(res.data.user);
            }
            setloading(false);
        })
    }, [])
    useEffect(() => {
        document.title= "Portfolio | rentizee | My Profile";
    }, [])
    
    if (loading) {
        return <div className="d-flex text-info justify-content-center mt-5">
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
    </div>
    }
    return (
        <div className="container px-4">
            <h1 className="m-4 text-success text-uppercase" >My Profile Information
            <Link className="btn btn-info text-light btn-sm float-end text-light mt-2" to={`/admin/editprofile`}>Edit Profile</Link>
            </h1>
            <Link className="" title="Change Profile Picture" to={`/admin/editprofile`}>
            {users.dp?
            <img src={`http://localhost:8000/${users.dp}`} style={{'border':'5px solid lightblue','border-radius':'50%','width':'150px', 'height':'150px', 'object-fit':'contain', 'background-color':'black'}} className="  col-sm-2 offset-5 " alt='profile' />
            :
            <img src={`http://localhost:8000/uploads/dp/defaultdp.jpg`} style={{'border':'5px solid lightblue','border-radius':'50%','width':'150px', 'height':'150px', 'object-fit':'contain', 'background-color':'black'}} className="  col-sm-2 offset-5 " alt='profile' />
             }
             </Link>

            <div className="row my-4"></div>
            <h4 className="text-success">Basic Details</h4>
            <div className="row my-4">
                <div className="col-sm-4 text-center text-info"><i className="fa-solid fa-user-check" style={{ 'font-size': '30px' }}></i><h4>{users.name}</h4></div>
                <div className="col-sm-4 text-center text-lowercase text-info">{users.role === "admin" ? <i style={{ 'font-size': '30px' }} className="fa-solid fa-lock text-danger"></i> : ''}{users.role === "end" ? <i style={{ 'font-size': '30px' }} className="fa-solid fa-user-check text-success" style={{ 'font-size': '30px' }}></i> : ''}{users.role === "agency" ? <i style={{ 'font-size': '30px' }} className="fa-solid fa-star text-success"></i> : ""}<h4>{users.role === "end" ? "Normal User" : users.role}</h4></div>
                <div className="col-sm-4 text-center text-info"><i className="fa-solid fa-id-card" style={{ 'font-size': '30px' }}></i><h4>{users.id}</h4></div>
            </div>
            <h4 className="text-success">Contact Details</h4>
            <div className="row my-4">
                <div className="col-sm-6 text-center text-info"><i style={{ 'font-size': '30px' }} className="fa-solid fa-phone text-success"></i><h4>{users.phone}</h4></div>
                <div className="col-sm-6 text-center text-lowercase text-info"><i className="fa-solid fa-envelope text-danger" style={{ 'font-size': '30px' }}></i><h4>{users.email}</h4></div>
            </div>
            <h4 className="text-success">Your Posts Details</h4>
            <div className="row my-4">
                <div className="col-sm-4 text-center text-info"><i className="fa-solid fa-battery-full" style={{ 'font-size': '30px' }}></i><h4>{users.quota}</h4>Quota</div>
                <div className="col-sm-4 text-center text-info"><i style={{ 'font-size': '30px' }} className="fa-solid fa-square-pen"></i><h4>{users.posts}</h4>Posts Yet</div>
                <div className="col-sm-4 text-center text-info"><i style={{ 'font-size': '30px' }} className="fa-solid fa-battery-quarter"></i><h4>{users.posts}</h4>Remaining Quota</div>
            </div>
            <h4 className="text-success">Account Info</h4>

            <div className="row my-4">
                <div className="col-sm-6 text-center text-info"><i style={{ 'font-size': '30px' }} className="fa-solid fa-plus"></i><h4>{users.created_at.substring(0, 10)}</h4>Registered at</div>
                <div className="col-sm-6 text-center text-info"><i style={{ 'font-size': '30px' }} className="fa-solid fa-user-pen"></i><h4>{users.updated_at.substring(0, 10)}</h4>Updated at</div>
            </div>

        </div>
    )
}
