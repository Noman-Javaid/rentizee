import {React, useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
export default function AllUsers() {
    const [loading, setloading] = useState(true);
    const [users, setusers] = useState([]);
    useEffect(() => {
        axios.get(`/api/allusers`).then(res=>{
            if(res.data.status===200){
                setusers(res.data.users);
            }
            setloading(false);
        }) 
    }, [])
    useEffect(() => {
      document.title= "Portfolio | rentizee | All Users";
  }, [])
    const deluser = (e,id)=>{
        e.preventDefault();
        const deluser = e.currentTarget;
        deluser.innerHTML=  'deleting...';
        axios.delete(`/api/deleteuser/${id}`).then(res=>{
            if(res.data.status===200){
                swal('Success',res.data.message,"success");
                deluser.closest("tr").remove();
              }else if(res.data.status=404){
                swal('Error',res.data.message,"error");
                deluser.innerHTML = 'Not Deleted';
              }       
        });
    }
    if(loading){
        return <div className="d-flex text-info justify-content-center mt-5">
        <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
    </div>
    }
    return (
        <div className="container-fluid px-4">
        <h1 className="mt-4 text-success text-uppercase" >USERS  ({users.length})
        <Link to={`/admin/adduser`} className="btn btn-info text-light m-2 float-end">Add User</Link>
        </h1>
        <nav>
  <div className="nav nav-tabs mt-3" id="nav-tab" role="tablist">
    <button className="nav-link active text-success" id="nav-users-tab" data-bs-toggle="tab" data-bs-target="#nav-users" type="button" role="tab" aria-controls="nav-users" aria-selected="true">USERS</button>
    <button className="nav-link text-success" id="nav-admins-tab" data-bs-toggle="tab" data-bs-target="#nav-admins" type="button" role="tab" aria-controls="nav-admins" aria-selected="false">ADMINS</button>
    <button className="nav-link text-success" id="nav-agency-tab" data-bs-toggle="tab" data-bs-target="#nav-agency" type="button" role="tab" aria-controls="nav-agency" aria-selected="false">AGENCIES</button>
  </div>
</nav>
<div className="tab-content" id="nav-tabContent">
  <div className="tab-pane fade show active" id="nav-users" role="tabpanel" aria-labelledby="nav-users-tab"><table className="table text-success text-center">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Posts</th>
      <th scope="col">Quota</th>
      <th scope="col">Role</th>
      <th scope="col">Operations</th>
    </tr>
  </thead>
  <tbody>
      {
          users.map((item, key)=>{
                return (
                    item.role=="end"?
                <tr key={item.id}>
                <td scope="col" className="text-success">{item.id}</td>
                <td scope="col" className="text-success">{item.name}</td>
                <td scope="col" className="text-success text-lowercase">{item.email}</td>
                <td scope="col" className="text-success">{item.phone}</td>
                <td scope="col" className="text-success">{item.posts}</td>
                <td scope="col" className="text-success">{item.quota}</td>
                <td scope="col" className="text-success">{item.role}</td>
                <td scope="col" className="text-success">
                  <Link to={`/admin/edituser/${item.id}`} className="btn text-success" ><i className="far fa-edit"></i></Link>
                <button className="btn text-danger" onClick={(e)=>deluser(e, item.id)} ><i className="fas fa-trash"></i></button>
                <Link to={`/author/${item.id}`} className="btn text-success" ><i className="fa-solid fa-camera text-info"></i></Link>
                </td>
                </tr>: null
                )
          })
      }
     </tbody>

 </table></div>
  <div className="tab-pane fade" id="nav-admins" role="tabpanel" aria-labelledby="nav-admins-tab">
    <table className="table text-success text-center">
  <thead>
    <tr>
    <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Posts</th>
      <th scope="col">Quota</th>
      <th scope="col">Role</th>
      <th scope="col">Operations</th>
        </tr>
  </thead>
  <tbody>
      {
          users.map((item, key)=>{
                return (
                    item.role=="admin"?
                <tr key={item.id}>
                <td scope="col" className="text-success">{item.id}</td>
                <td scope="col" className="text-success">{item.name}</td>
                <td scope="col" className="text-success text-lowercase">{item.email}</td>
                <td scope="col" className="text-success">{item.phone}</td>
                <td scope="col" className="text-success">{item.posts}</td>
                <td scope="col" className="text-success">{item.quota}</td>
                <td scope="col" className="text-success">{item.role}</td>
                {
                item.id==localStorage.getItem('auth_id')? <td className='text-danger'><b>Your Account</b></td>:
                <td scope="col" className="text-success">            
                <Link to={`/admin/edituser/${item.id}`} className="btn text-success" ><i className="far fa-edit"></i></Link>
                <button className="btn text-danger" onClick={(e)=>deluser(e, item.id)} ><i className="fas fa-trash"></i></button>
                <Link to={`/author/${item.id}`} className="btn text-success" ><i className="fa-solid fa-camera text-info"></i></Link>
                
                </td>
                }
                </tr>: null
                )
          })
      }
     </tbody>

  </table></div>
  <div className="tab-pane fade" id="nav-agency" role="tabpanel" aria-labelledby="nav-agency-tab"><table className="table text-success text-center">
  <thead>
    <tr>
    <th scope="col">ID</th>
      <th scope="col">Name</th>
      <th scope="col">Email</th>
      <th scope="col">Phone</th>
      <th scope="col">Posts</th>
      <th scope="col">Quota</th>
      <th scope="col">Role</th>
      <th scope="col">Operations</th>
    </tr>
  </thead>
  <tbody>
      {
          users.map((item, key)=>{
                return (
                    item.role=="agency"?
                <tr key={item.id}>
                <td scope="col" className="text-success">{item.id}</td>
                <td scope="col" className="text-success">{item.name}</td>
                <td scope="col" className="text-success text-lowercase">{item.email}</td>
                <td scope="col" className="text-success">{item.phone}</td>
                <td scope="col" className="text-success">{item.posts}</td>
                <td scope="col" className="text-success">{item.quota}</td>
                <td scope="col" className="text-success">{item.role}</td>
                <td scope="col" className="text-success">
                <Link to={`/admin/edituser/${item.id}`} className="btn text-success" ><i className="far fa-edit"></i></Link>
                <button className="btn text-danger" onClick={(e)=>deluser(e, item.id)} ><i className="fas fa-trash"></i></button>
                <Link to={`/author/${item.id}`} className="btn text-success" ><i className="fa-solid fa-camera text-info"></i></Link>

                </td>
                </tr>: null
                )
          })
      }
     </tbody>
</table></div>
</div></div>
    )
}
 