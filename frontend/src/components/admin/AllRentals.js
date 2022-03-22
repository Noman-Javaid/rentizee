import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

export default function AllRentals() {

    const [loading, setloading] = useState(true);
    const [rentals, setrentals] = useState([]);
    useEffect(() => {
        document.title= "Portfolio | All Rentals";
        axios.get(`/api/allrentals`).then(res=>{
            if(res.data.status===200){
                setrentals(res.data.rentals);
                setloading(false);
            }
        }) 
    }, [])
    useEffect(() => {
        document.title= "Portfolio | rentizee | All Rentals ";
    }, [])
    const delrental = (e,id)=>{
        e.preventDefault();
        const delrental = e.currentTarget;
        delrental.innerHTML=  'deleting...';
        axios.delete(`/api/delrental/${id}`).then(res=>{
            if(res.data.status===200){
                swal('Success',res.data.message,"success");
                delrental.closest("tr").remove();
              }else if(res.data.status=404){
                swal('Error',res.data.message,"error");
                delrental.innerHTML = 'Not Deleted';
              }      
        });
    }
    if(loading){
        return  <div className="d-flex text-info justify-content-center mt-5">
        <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
    </div>
    }
    return (
        <div className="container-fluid mt-3 px-3">
               <h1 className=" text-uppercase" >All Rentals  ({rentals.length})
        <Link to={`/admin/addrentals`} className="btn btn-info text-light m-2 float-end">Add Rental</Link>
               </h1>
               <ul className="nav nav-tabs mt-2" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active text-success" id="Admin-tab" data-bs-toggle="tab" data-bs-target="#Admin" type="button" role="tab" aria-controls="Admin" aria-selected="true">Admin</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link text-success" id="Agency-tab" data-bs-toggle="tab" data-bs-target="#Agency" type="button" role="tab" aria-controls="Agency" aria-selected="false">Agency</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link text-success" id="End-tab" data-bs-toggle="tab" data-bs-target="#End" type="button" role="tab" aria-controls="End" aria-selected="false">End User</button>
                </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active text-success" id="Admin" role="tabpanel" aria-labelledby="Admin-tab">
                    <table className="table text-success text-center">
                        <thead>
                        <tr>
                        <th scope="col">Post ID</th>
                        <th scope="col">Auth Id</th>
                        <th scope="col">Category</th>
                        <th scope="col">Location</th>
                        <th scope="col">Price</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            rentals.map((item, key)=>{
                                return( 
                                item.auth_role == "admin"?
                                <tr key={item.id}>                                <td scope="col" className="text-success">{item.id}</td>
                                <td scope="col" className="text-success">{item.auth_id}</td>
                                <td scope="col" className="text-lowercase text-success">{item.category},&nbsp;{item.subcat}</td>
                                <td scope="col" className="text-success">{item.province},&nbsp;{item.city}</td>
                                <td scope="col" className="text-success">{item.price}</td>
                                <td scope="col" className="text-success">{item.phone2}</td>
                                <td> 
                                <Link to={`/admin/editrental/${item.id}`} className="btn text-success" ><i className="far fa-edit"></i></Link>
                                <button className="btn text-danger" onClick={(e)=>delrental(e, item.id)} ><i className="fas fa-trash"></i></button>
                                <Link to={`/rentaldetail/${item.id}`} className="btn text-success" ><i className="fa-solid fa-camera text-info"></i></Link>
                                </td>
                                </tr>
                                :''        
                            )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                <div className="tab-pane fade text-success" id="Agency" role="tabpanel" aria-labelledby="Agency-tab">
                <table className="table text-success text-center">
                        <thead>
                        <tr>
                        <th scope="col">Post ID</th>
                        <th scope="col">Author ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Location</th>
                        <th scope="col">Category</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            rentals.map((item, key)=>{
                                return( 
                                item.auth_role == "agency"?
                                <tr key={item.id}> <td scope="col" className="text-success">{item.id}</td>
                                <td scope="col" className="text-success">{item.auth_id}</td>
                                <td scope="col" className="text-lowercase text-success">{item.category},&nbsp;{item.subcat}</td>
                                <td scope="col" className="text-success">{item.province},&nbsp;{item.city}</td>
                                <td scope="col" className="text-success">{item.price}</td>
                                <td scope="col" className="text-success">{item.phone2}</td>
                                <td> 
                                <Link to={`/admin/editrental/${item.id}`} className="btn text-success" ><i className="far fa-edit"></i></Link>
                                <button className="btn text-danger" onClick={(e)=>delrental(e, item.id)} ><i className="fas fa-trash"></i></button>
                                <Link to={`/rentaldetail/${item.id}`} className="btn text-success" ><i className="fa-solid fa-camera text-info"></i></Link>

                                </td>
                                </tr>
                                :''        
                            )
                            })
                        }
                        </tbody>
                    </table>
                
                </div>
                <div className="tab-pane fade text-success" id="End" role="tabpanel" aria-labelledby="End-tab">
                <table className="table text-success text-center">
                        <thead>
                        <tr>
                        <th scope="col">Post ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Location</th>
                        <th scope="col">Category</th>
                        <th scope="col">Title</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Operations</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            rentals.map((item, key)=>{
                                return( 
                                item.auth_role == "end"?
                                <tr key={item.id}>                                <td scope="col" className="text-success">{item.id}</td>
                                <td scope="col" className="text-success">{item.auth_id}</td>
                                <td scope="col" className="text-lowercase text-success">{item.category},&nbsp;{item.subcat}</td>
                                <td scope="col" className="text-success">{item.province},&nbsp;{item.city}</td>
                                <td scope="col" className="text-success">{item.price}</td>
                                <td scope="col" className="text-success">{item.phone2}</td>
                                <td> 
                                <Link to={`/admin/editrental/${item.id}`} className="btn text-success" ><i className="far fa-edit"></i></Link>
                                <button className="btn text-danger" onClick={(e)=>delrental(e, item.id)} ><i className="fas fa-trash"></i></button>
                                <Link to={`/rentaldetail/${item.id}`} className="btn text-success" ><i className="fa-solid fa-camera text-info"></i></Link>
                                
                                </td>
                                </tr>
                               :''        
                            )
                            })
                        }
                        </tbody>
                    </table>
                </div>
                </div>
        </div>
    )
}
