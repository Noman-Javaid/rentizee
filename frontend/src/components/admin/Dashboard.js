import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

export default function Dashboard() {

    const [loading, setloading] = useState(true);
    const [rentals, setrentals] = useState([]);
    const [agencies, setagencies] = useState([]);
    const [subscribers, setsubscribers] = useState([]);
    const [message, setmessage] = useState('');
    const [agancymessage, setagancymessage] = useState('');
    const [subscribermessage, setsubscribermessage] = useState('');
    const [views, setviews] = useState(0);
    const [visits, setvisits] = useState(0);
    const [quota, setquota] = useState(0);
    const [posts, setposts] = useState(0);
    useEffect(() => {
        var aid = localStorage.getItem('auth_id');
        axios.get(`/api/myrentals/${aid}`).then(res => {
            if (res.data.status === 200) {
                setrentals(res.data.rentals);

            }else if(res.data.status === 404){
                setmessage(res.data.message);
            }
                setvisits(res.data.visits)
                setviews(res.data.views)
                setquota(res.data.quota)
                setposts(res.data.posts)
                setloading(false);
        })

        axios.get(`/api/subscriptions/${aid}`).then(res=>{
            if(res.data.status===200){
                setagencies(res.data.agencies);
            }else if(res.data.status===404){
                setagancymessage(res.data.message);
            }
        })
        axios.get(`/api/subscribers/${aid}`).then(res=>{
            if(res.data.status===200){
                setsubscribers(res.data.subscribers);
            }else if(res.data.status===404){
                setsubscribermessage(res.data.message);
            }
        })
    }, [])
    const unsub = (e, id)=>{
        e.preventDefault();
        var button = e.currentTarget;
        const sid = localStorage.getItem('auth_id')
        axios.delete(`/api/unsub/${id}/${sid}`).then(res=>{
      if(res.data.status===200){
          button.innerHTML=  'Unsubscribed';
          swal('Success', res.data.message,'success')
      }else if(res.data.status===404){
        swal('Error', res.data.message,'error')
    }
    })
  }
    const delrental = (e, id) => {
        e.preventDefault();
        const delrental = e.currentTarget;
        delrental.innerHTML = 'deleting...';
        var aid = localStorage.getItem('auth_id');
        axios.delete(`/api/delmyrental/${id}/${aid}`).then(res => {
            if (res.data.status === 200) {
                swal('Success', res.data.message, "success");
                delrental.closest("tr").remove();
            } else if (res.data.status = 404) {
                swal('Error', res.data.message, "error");
                delrental.innerHTML = 'Not Deleted';
            }
        });
    }
    if (loading) {
        return <div className="d-flex text-info justify-content-center mt-5">
        <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
    </div>
    }
    return (
        <div className="container">
            <h1 className="text-uppercase m-4 text-success" >Rental Information</h1>
            <div className="row my-4">
                <div className="col-sm-6 text-center text-info"><h2 style={{'font-size':'100px'}}><i className="fa-solid fa-eye "></i>&nbsp;{visits}</h2>Total Rental Views</div>
                <div className="col-sm-6 text-center text-info"><h2 style={{'font-size':'100px'}}><i className="fa fa-hand-pointer text-info"></i>&nbsp;{views}</h2>Total Contact Visits</div>
            </div>
            <div className="row my-4">
                <div className="col-sm-4 text-info text-center"><h2 style={{'font-size':'50px'}}><i className="fa-solid fa-battery-full"></i>&nbsp;{quota}</h2>Total QUOTA</div>
                <div className="col-sm-4 text-info text-center"><h2 style={{'font-size':'50px'}}><i className="fa-solid fa-camera"></i>&nbsp;{posts}</h2>POSTS Added</div>
                <div className="col-sm-4 text-info text-center mb-4"><h2 style={{'font-size':'50px'}}><i className="fa-solid fa-battery-quarter"></i>&nbsp;{quota-posts}</h2>REMAINING QUOTA</div>
            </div>

            <h1 className="text-uppercase m-4 text-success" >My Rental Posts
                <Link to={`/admin/addrentals`} className="btn btn-sm btn-info text-light m-2 float-end">Add Rental</Link>
            </h1>
            <ul className="nav nav-tabs mt-2" id="myTab" role="tablist">

            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active text-success" id="Admin" role="tabpanel" aria-labelledby="Admin-tab">
                    <table className="table text-success text-center">
                        <thead>
                            <tr>
                                <th scope="col">Post ID</th>
                                <th scope="col">Type</th>
                                <th scope="col">Location</th>
                                <th scope="col">Price</th>
                                <th scope="col">Visits</th>
                                <th scope="col">Phone Views</th>
                                <th scope="col">Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                rentals ?
                                rentals.map((item, key) => {
                                    return (
                                        <tr key={item.id}>
                                            <td scope="col" className="text-success">{item.id}</td>
                                            <td scope="col" className="text-lowercase text-success">{item.category},&nbsp;{item.subcat}</td>
                                            <td scope="col" className="text-success">{item.province},&nbsp;{item.city}</td>
                                            <td scope="col" className="text-success">{item.price}</td>
                                            <td scope="col" className="text-success"><i className="fa-solid fa-eye text-info"></i>&nbsp;{item.visits}</td>
                                            <td scope="col" className="text-success"><i className="fa fa-hand-pointer text-info"></i>&nbsp;{item.phone_views}</td>
                                            <td>
                                                <Link to={`/admin/editmyrental/${item.id}`} className="btn text-success" ><i className="far fa-edit"></i></Link>
                                                <button className="btn text-danger" onClick={(e) => delrental(e, item.id)} ><i className="fas fa-trash"></i></button>
                                                <Link to={`/rentaldetail/${item.id}`} className="btn text-success" ><i className="fa-solid fa-camera text-info"></i></Link>
                                            </td>
                                        </tr>
                                    )
                                })
                                : ''
                            }
                            
                        </tbody>
                    </table>
                            {
                            message ? <h3 className="text-danger m-4">{message}</h3>  : ''
                            }
                </div>
            </div>
            <h1 className="text-uppercase m-4 text-success" >My Subscriptions ({agencies.length})</h1>
            <ul className="nav nav-tabs mt-2" id="myTab" role="tablist">

            </ul>
            <table className="table text-success text-center">
            <thead>
                            <tr>
                                <th scope="col">Agency Name</th>
                                <th scope="col">Agency Type</th>
                                <th scope="col">Posts</th>
                                <th scope="col">Unsubscribe</th>
                            </tr>
                        </thead>
                  <tbody>
                  {   
                                agencies ?
                                agencies.map((item, key) => {
                                    return (
                                        <tr key={item.id}>
                                            <td scope="col" className="text-success">{item.u_name}</td>
                                            <td scope="col" className="text-lowercase text-success">{item.u_role==="end"?"Normal User": item.u_role}</td>
                                            <td scope="col" className="text-success">
                                            <Link to={`/author/${item.user}`} className="btn text-success" ><i className="fa-solid fa-camera text-info"></i></Link>
                                            </td>
                                            <td scope="col"><button onClick={(e) => unsub(e,item.user)} className="btn btn-danger btn-sm text-light" >Unsubscribe</button></td>
                                        </tr>
                                    )
                                })
                                : ''
                            }
                  </tbody>
            </table>
                            {
                            agancymessage ? <h3 className="text-danger m-4">{agancymessage}</h3>  : ''
                            }

             <h1 className="text-uppercase m-4 text-success" >My Subscribers ({subscribers.length}) </h1>
            <ul className="nav nav-tabs mt-2" id="myTab" role="tablist">

            </ul> 
            <table className="table text-success text-center">
            <thead>
                            <tr>
                                <th scope="col">Subscriber Name</th>
                                <th scope="col">Posts</th>
                                <th scope="col">Subscribed at</th>
                            </tr>
                        </thead>
                  <tbody>
                  {   
                                subscribers ?
                                subscribers.map((item, key) => {
                                    return (
                                        <tr key={item.id}>
                                            <td scope="col" className="text-success">{item.s_name}</td>
                                            <td scope="col" className="text-success">
                                            <Link to={`/author/${item.subscriber}`} className="btn text-success" ><i className="fa-solid fa-camera text-info"></i></Link>
                                            </td>
                                            <td scope="col">{item.created_at.substring(0,10)}</td>
                                        </tr>
                                    )
                                })
                                : ''
                            }
                  </tbody>
            </table>
                            {
                            subscribermessage ? <h3 className="text-danger m-4">{subscribermessage}</h3>  : ''
                            }
  
        </div>
    )
}
