import React from 'react';
import { useParams, withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import swal from 'sweetalert';
import { Carousel } from 'react-bootstrap';

function RentalDetail(props) {
    const {pid}= useParams();
    const [loading, setloading] = useState(true);
    const [subscribed, setsubscribed] = useState(false);
    const [single, setsingle] = useState([]);
    const history = useHistory();

    useEffect(() => {
        axios.get(`/api/fetchpost/${pid}`).then(res=>{
            if(res.data.status===200){
                setsingle(res.data.rental);
                const sid = localStorage.getItem('auth_id')
                axios.get(`/api/checksub/${res.data.rental.auth_id}/${sid}`).then(res=>{
                  if(res.data.status===200){
                    setsubscribed(true);
                  }
                });
            }else if(res.data.status===404){
                swal("Error",res.data.message,'error');
                history.push(`/rentals`);
            }
            setloading(false);
        });
      
    }, [history])
     useEffect(() => {
    document.title= "rentizee | Details " + pid;
}, [])

    const addphoneview = (id)=>{
      axios.post(`/api/plusphoneview/${id}`).then(res=>{
        
      })
    }
    const subscribe = (e, id)=>{
          e.preventDefault();
          var button = e.currentTarget;
          var sid = localStorage.getItem('auth_id')
          var sname = localStorage.getItem('auth_name')
      axios.post(`/api/subscribe/${id}/${sid}/${sname}`).then(res=>{
        if(res.data.status===200){
            button.innerHTML=  'Subscribed';
            swal('Success', res.data.message,'success')
        }else if(res.data.status===404){
            swal('Error', res.data.message,'error')
        }
      })
    }
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

    const copied = (e, text)=>{
      e.preventDefault();
      var button = e.currentTarget;
        button.innerHTML=  'copied';
        navigator.clipboard.writeText(text);
    }

    if(loading){
      return <div className="d-flex text-info justify-content-center mt-5">
      <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
  </div>
  }
  return (
    <div className="container">
        <h1 className="mt-5 border-bottom border-success">Complete Details
        {
        localStorage.getItem('auth_id') ?
        subscribed ? <button onClick={(e) => unsub(e, single.auth_id)} className="btn btn-danger float-end btn-sm text-light mt-2" >Unsubscribe</button> : <button onClick={(e) => subscribe(e, single.auth_id)} className="btn btn-info float-end btn-sm text-light mt-2" >Subscribe</button>
        : <Link to='/login' className="btn btn-info float-end btn-sm text-light mt-2" >Subscribe</Link>
        }
        </h1>
        <div className="mt-3 p-3 w-50" style={{'float':'left'}}>
        
          <Carousel>
          <Carousel.Item >
            <img 
              className="d-block w-100"
              src={`http://localhost:8000/${single.image}`}
              alt="First slide"
              height="300px"
              width="500px"
              style={{'filter': 'brightness(80%)'}}
            />
            <Carousel.Caption>
              <h4 className="text-light">{single.title}</h4>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item >
            <img
              className="d-block w-100"
              src={`http://localhost:8000/${single.image}`}
              alt="Second slide"
              height="300px"
              width="500px"
              style={{'filter': 'brightness(80%)'}}

            />
            <Carousel.Caption>
              <h4 className="text-light">Details</h4>
              <p className="text-light">{single.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={`http://localhost:8000/${single.image}`}
              alt="Third slide"
              height="300px"
              width="500px"
              style={{'filter': 'brightness(80%)'}}

            /> 
            <Carousel.Caption >
              <h3>Contacts</h3>
              <p>{single.phone1}</p>
              <p>{single.phone2}</p>
              <p className="text-lowercase" >{single.auth_email}</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        </div>
        <div className="mt-3 p-3 w-50" style={{'float':'left'}}>
            <Link to={`/author/${single.auth_id}`} className="btn btn-info text-light btn-sm my-2"><i className="fa fa-user text-warning"></i>&nbsp;{single.auth_name} ___{
            single.auth_role === "end"? "End User" : <><span>{single.auth_role}</span></>} <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> </Link>
            <Link to={`/subcat/${single.category}/${single.subcat}`} className="btn btn-info text-light btn-sm my-2 mx-2"><i className="fa fa-tags text-warning" aria-hidden="true"></i>&nbsp;{single.category}/{single.subcat} <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span></Link> <span className="float-end text-info m-3"><i className="fa-solid fa-eye"></i>&nbsp; {single.visits}</span><br />
            <Link to={`/location/${single.city}/${single.province}`} className="btn btn-info text-light btn-sm my-2 "><i className="fa fa-map-marker text-warning" aria-hidden="true"></i>&nbsp;{single.city}/{single.province} <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span></Link><br /> 
           
            <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
            <button className="nav-link text-success active" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" type="button" role="tab" aria-controls="details" aria-selected="true">DETAILS</button>
        </li>
        <li className="nav-item" role="presentation">
            <button className="nav-link text-success" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">CONTACT Info</button>
        </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active m-3" id="details" role="tabpanel" aria-labelledby="details-tab">
            <h5><i className="fa fa-bullhorn text-info " aria-hidden="true"></i>&nbsp;{single.title}</h5>
            <p><i className="fa fa-th-list text-info" aria-hidden="true"></i>&nbsp;{single.description}</p>
            <h5>PKR: <b className="text-info">{single.price}</b></h5>
            <span className="row">                
                <span className="col-sm-6"><h6><i className="text-info fa fa-hourglass-half" aria-hidden="true"></i>&nbsp;{single.duration}</h6></span>
                <span className="col-sm-6"><h6><i className="text-info fa fa-check-square" aria-hidden="true"></i>&nbsp;Condition: {single.condition}</h6></span>
                </span>
             {/* spinners */}
             <div className="spinner-grow text-secondary mx-1  " role="status">
          </div>
          <div className="spinner-grow text-secondary mx-1 " role="status">
          </div>
          <div className="spinner-grow text-secondary mx-1 " role="status">
          </div>
          <div className="spinner-grow text-secondary mx-1 " role="status">
          </div>
          <div className="spinner-grow text-secondary mx-1 " role="status">
          </div>
          <div className="spinner-grow text-secondary mx-1 " role="status">
          </div>

            <h6>Features</h6>
                <span className="row">                
                <span className="col-sm-3">{single.elevator ? <span title="Elevator"><i className="text-info fa-solid fa-elevator"></i>&nbsp;<i className=" fa fa-check" aria-hidden="true"></i></span> : ''}</span>
                <span className="col-sm-3">{single.lawn ? <span title="Lawn"><i className="text-info fa-solid fa-tree"></i>&nbsp;<i className="fa fa-check" aria-hidden="true"></i></span> : ''}</span>
                <span className="col-sm-3">{single.roof ? <span title="Roof"><i className="text-info fa-solid fa-chess-rook"></i>&nbsp;<i className="fa fa-check" aria-hidden="true"></i></span> : ''}</span>
                <span className="col-sm-3">{single.parking ? <span title="Parking"><i className="text-info fa-solid fa-parking"></i>&nbsp;<i className="fa fa-check" aria-hidden="true"></i></span> : ''}</span>
                </span>
                <span className="row">                
                <span className="col-sm-6">{single.area ? <span title="Area"><i className="text-info fa-solid fa-ruler-combined"></i>&nbsp;{single.area} Marla</span> : ''}</span>
                <span className="col-sm-6">{single.floors ? <span title="Floors"><i className="text-info fa-solid fa-building"></i>&nbsp;{single.floors} Storey</span> : ''}</span>
                </span>
                <span className="row">
                <span className="col-sm-6">{single.bedrooms ? <span title="Bedrooms"><i className="text-info fa-solid fa-bed"></i>&nbsp;{single.bedrooms}</span> : ''}</span>
                <span className="col-sm-6">{single.bathrooms ? <span title="Bathroom"><i className="text-info fa-solid fa-bath"></i>&nbsp;{single.bathrooms}</span> : ''}</span>
                </span>
                <span className="row">
                <span className="col-sm-6">{single.kitchens ? <span title="Kitchens"><i className="text-info fa-solid fa-utensils"></i>&nbsp;{single.kitchens}</span> : ''}</span>
                </span>
                <span className="row">
                <span className="col-sm-6">{single.car_model ? <span title="Car Model"><i className="text-info fa fa-car" ></i>&nbsp;{single.car_model}</span> : ''}</span>
                <span className="col-sm-6">{single.milage ? <span title="Milage"><i className="text-info fa fa-tachometer"  aria-hidden="true"></i>&nbsp;{single.milage} Km</span> : ''}</span>
                </span>
                <span className="row">
                <span className="col-sm-6">{single.fuel_type ? <span title="Fuel Type"><i className="text-info fa fa-gas-pump" ></i>&nbsp;{single.fuel_type}</span> : ''}</span>
                <span className="col-sm-6">{single.fuel_average ? <span title="Fuel Average"><i className="text-info fa fa-gas-pump" ></i>&nbsp;{single.fuel_average} km/ltr</span> : ''}</span>
                </span>
                <span className="row">
                <span className="col-sm-6">{single.elec_model ? <span title="Electronics Model"><i className="text-info fa fa-bolt"  aria-hidden="true"></i>&nbsp;{single.elec_model}</span> : ''}</span>
                <span className="col-sm-6">{single.company ? <span title="company"><i className="text-info fa fa-archway" ></i>&nbsp;{single.company}</span> : ''}</span>
                </span>
                <span className="row">
                <span className="col-sm-4">{single.operator ? <span title="operator"><i className="text-info fa fa-people-carry" ></i>&nbsp;<i className="fa fa-check" aria-hidden="true"></i></span> : ''}</span>
                </span>

            </div>
        <div className="tab-pane fade m-4" id="contact" role="tabpanel" aria-labelledby="contact-tab">
          <h6>Author Name:  <b><Link className="text-info" style={{'text-decoration':'none'}} to={`/author/${single.auth_id}`} >{single.auth_name}</Link></b></h6>
          <h6>Auther Type:  <b>{single.auth_role === "admin" ? <i className="fa-solid fa-lock text-danger"></i> : ''}{single.auth_role === "end" ? <i className="fa-solid fa-user-check text-success"></i> : ''}{single.auth_role === "agency" ? <i className="fa-solid fa-star text-warning"></i> : ""}&nbsp;{single.auth_role ==="end"? "END USER": single.auth_role}</b></h6>
          <h6>Address: {single.address}</h6>
{/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title offset-3" id="exampleModalLabel"><b>Contact Details</b></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div> 
                  <div className="modal-body">
                  <h6 className="text-success">  <i className="text-info fa fa-phone"></i>&nbsp;{single.phone1}<button className="btn btn-secondary btn-sm mx-3 " onClick={(e)=>copied(e, single.phone1)} >copy</button><span className="float-end mx-3 text-info" title="Contact Views" data-bs-dismiss="modal"><i class="fa fa-hand-pointer"></i>&nbsp;{single.phone_views}</span></h6>
                  <h6 className="text-success"><i className="text-info fa fa-phone"></i>&nbsp;{single.phone2}<button className="btn btn-secondary btn-sm mx-3 " onClick={(e)=>copied(e, single.phone2)}   >copy</button></h6>
                  <h6 className="text-lowercase text-success"><i className="text-info fa-solid fa-envelope"></i>&nbsp;{single.auth_email}<button className="btn btn-secondary btn-sm mx-3 " onClick={(e)=>copied(e, single.auth_email)} >copy</button></h6>
                  </div>
                  <div className="modal-footer">
                  <button type="button" className="btn mb-2 btn-secondary " data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={(e)=>addphoneview(single.id)} type="button" className="btn mb-2 btn-info text-light btn-sm mt-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
            <i className="text-light fa fa-phone"></i>&nbsp;Contact Details
            </button>

        </div>
        </div> 
        </div>
        </div>
  )
    }

export default withRouter(RentalDetail);
