import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function RentalComponent(props) {
    const copied = (e, text)=>{
        e.preventDefault();
        var button = e.currentTarget;
          button.innerHTML=  'copied';
          navigator.clipboard.writeText(text);
      }
      const addvisit = (id)=>{
        axios.post(`/api/plusvisite/${id}`).then(res=>{
  
        })
      }
      const addphoneview = (id)=>{
        axios.post(`/api/plusphoneview/${id}`).then(res=>{
          
        })
      }
  return (
    <div> 
      {/* Admin */}
        {
        props.rental.map((item, key)=>{ 
        return (
            item.auth_role==='agency'?
          <div key={item.id} className="mt-3 p-3 w-25" style={{'float':'left'}}>
          <Link className="text-success" style={{'text-decoration':'none', 'font-size':'90%'}} to={`/subcat/${item.category}/${item.subcat}`}><small><b><i className="fa fa-tags text-warning" aria-hidden="true"></i>&nbsp;{item.category}/{item.subcat}</b></small></Link> 
          <small><i className="float-end">{item.auth_role === "admin" ? <i className="fa-solid fa-lock text-danger"></i> : ''}{item.auth_role === "end" ? <i className="fa-solid fa-user-check text-success"></i> : ''}{item.auth_role === "agency" ? <i className="fa-solid fa-star text-warning"></i> : ""}&nbsp;<Link className="text-success" style={{'text-decoration':'none', 'font-size':'70%', 'font-weight':'bold'}} to={`/author/${item.auth_id}`}>{item.auth_name.substring(0, 7)}..</Link></i></small>
        <div className="card">
        <button type="button" className="btn p-0 text-uppercase" data-bs-toggle="modal" data-bs-target={`#image${item.id}`}><img src={`http://localhost:8000/${item.image}`} height="170px" className="card-img-top"/></button>
        <div className="card-body">
          <small className="card-title"><b>{item.title.length > 23? item.title.substring(0, 30)+ '..' : item.title}{ item.title.length <= 23 ? <br /> :'' }</b></small><br />
          <small><Link className="text-success" style={{'text-decoration':'none'}} to={`/location/${item.city}/${item.province}`}><i className="fa fa-map-marker text-danger" aria-hidden="true"></i>&nbsp;{item.city}..</Link></small><br />
          <b>PKR: {item.price}<span className="float-end text-info" title="Views" data-bs-dismiss="modal"><i className="fa-solid fa-eye"></i>&nbsp;{item.visits}</span></b>
          <p className="card-text"></p>
          <Link onClick={(e)=>addvisit(item.id)} className="btn btn-secondary btn-sm w-100 mb-1" to={`/rentaldetail/${item.id}`}><i className="fa fa-book" aria-hidden="true"></i>&nbsp;Read More</Link>
          <button onClick={(e)=>addphoneview(item.id)} type="button" className="btn btn-info btn-sm w-100 text-light text-uppercase" data-bs-toggle="modal" data-bs-target={`#modal${item.id}`}><i className="text-light fa fa-phone"></i>&nbsp;{item.auth_role ==="agency"? "Agency Contact" : "Contact Details" }</button>
           
 {/* <!-- Modal --> */}
            <div className="modal fade" id={`modal${item.id}`} tabindex="-1" aria-labelledby={`#modal${item.id}Label`} aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title offset-3 text-uppercase" id={`modal${item.id}Label`}><b><i className="fa fa-phone"></i>&nbsp;{item.auth_role ==="end"? "End User" : item.auth_role }&nbsp;Contact</b></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                  <h6 className="text-success">  <i className="text-info fa fa-phone"></i>&nbsp;{item.phone1}<button className="btn btn-secondary btn-sm mx-3 " onClick={(e)=>copied(e, item.phone1)} >copy</button><span className="float-end mx-3 text-info" title="Contact Views" data-bs-dismiss="modal"><i class="fa fa-hand-pointer"></i>&nbsp;{item.phone_views}</span></h6>
                  <h6 className="text-success"><i className="text-info fa fa-phone"></i>&nbsp;{item.phone2}<button className="btn btn-secondary btn-sm mx-3 " onClick={(e)=>copied(e, item.phone2)}   >copy</button></h6>
                  <h6 className="text-lowercase text-success"><i className="text-info fa-solid fa-envelope"></i>&nbsp;{item.auth_email}<button className="btn btn-secondary btn-sm mx-3 " onClick={(e)=>copied(e, item.auth_email)} >copy</button></h6>
                  </div>
                  <div className="modal-footer">
                  <button type="button" className="btn mb-2 btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Image Modal */}
            <div className="modal fade" id={`image${item.id}`} tabindex="-1" aria-labelledby={`#image${item.id}Label`} aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content bg-dark">
                  <div className="modal-header">
                    <h5 className="modal-title col-sm-4 offset-5 text-light text-uppercase" id={`image${item.id}Label`}><b>Full Image</b></h5>
                    <button type="button" className="btn-close bg-light"  data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                  <img src={`http://localhost:8000/${item.image}`} alt="Full Image Here" className="card-img-top"/>
                  
                  </div>
                  <div className="modal-footer">
                  <button type="button" className="btn mb-2 btn-light" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
        </div>
        : '' 
          )
        })
        }
        {/* Admin */}
        {
        props.rental.map((item, key)=>{ 
        return (
            item.auth_role==='admin'?
          <div key={item.id} className="mt-3 p-3 w-25" style={{'float':'left'}}>
          <Link className="text-success" style={{'text-decoration':'none', 'font-size':'90%'}} to={`/subcat/${item.category}/${item.subcat}`}><small><b><i className="fa fa-tags text-warning" aria-hidden="true"></i>&nbsp;{item.category}/{item.subcat}</b></small></Link> 
          <small><i className="float-end">{item.auth_role === "admin" ? <i className="fa-solid fa-lock text-danger"></i> : ''}{item.auth_role === "end" ? <i className="fa-solid fa-user-check text-success"></i> : ''}{item.auth_role === "agency" ? <i className="fa-solid fa-star text-warning"></i> : ""}&nbsp;<Link className="text-success" style={{'text-decoration':'none', 'font-size':'70%', 'font-weight':'bold'}} to={`/author/${item.auth_id}`}>{item.auth_name.substring(0, 7)}..</Link></i></small>
        <div className="card">
        <button type="button" className="btn p-0 text-uppercase" data-bs-toggle="modal" data-bs-target={`#image${item.id}`}><img src={`http://localhost:8000/${item.image}`} height="170px" className="card-img-top"/></button>
        <div className="card-body">
          <small className="card-title"><b>{item.title.length > 23? item.title.substring(0, 30)+ '..' : item.title}{ item.title.length <= 23 ? <br /> :'' }</b></small><br />
          <small><Link className="text-success" style={{'text-decoration':'none'}} to={`/location/${item.city}/${item.province}`}><i className="fa fa-map-marker text-danger" aria-hidden="true"></i>&nbsp;{item.city}..</Link></small><br />
          <b>PKR: {item.price}<span className="float-end text-info" title="Views" data-bs-dismiss="modal"><i className="fa-solid fa-eye"></i>&nbsp;{item.visits}</span></b>
          <p className="card-text"></p>
          <Link onClick={(e)=>addvisit(item.id)} className="btn btn-secondary btn-sm w-100 mb-1" to={`/rentaldetail/${item.id}`}><i className="fa fa-book" aria-hidden="true"></i>&nbsp;Read More</Link>
          <button onClick={(e)=>addphoneview(item.id)} type="button" className="btn btn-info btn-sm w-100 text-light text-uppercase" data-bs-toggle="modal" data-bs-target={`#modal${item.id}`}><i className="text-light fa fa-phone"></i>&nbsp;{item.auth_role ==="agency"? "Agency Contact" : "Contact Details" }</button>
           
 {/* <!-- Modal --> */}
            <div className="modal fade" id={`modal${item.id}`} tabindex="-1" aria-labelledby={`#modal${item.id}Label`} aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title offset-3 text-uppercase" id={`modal${item.id}Label`}><b><i className="fa fa-phone"></i>&nbsp;{item.auth_role ==="end"? "End User" : item.auth_role }&nbsp;Contact</b></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                  <h6 className="text-success">  <i className="text-info fa fa-phone"></i>&nbsp;{item.phone1}<button className="btn btn-secondary btn-sm mx-3 " onClick={(e)=>copied(e, item.phone1)} >copy</button><span className="float-end mx-3 text-info" title="Contact Views" data-bs-dismiss="modal"><i class="fa fa-hand-pointer"></i>&nbsp;{item.phone_views}</span></h6>
                  <h6 className="text-success"><i className="text-info fa fa-phone"></i>&nbsp;{item.phone2}<button className="btn btn-secondary btn-sm mx-3 " onClick={(e)=>copied(e, item.phone2)}   >copy</button></h6>
                  <h6 className="text-lowercase text-success"><i className="text-info fa-solid fa-envelope"></i>&nbsp;{item.auth_email}<button className="btn btn-secondary btn-sm mx-3 " onClick={(e)=>copied(e, item.auth_email)} >copy</button></h6>
                  </div>
                  <div className="modal-footer">
                  <button type="button" className="btn mb-2 btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Image Modal */}
            <div className="modal fade" id={`image${item.id}`} tabindex="-1" aria-labelledby={`#image${item.id}Label`} aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content bg-dark">
                  <div className="modal-header">
                    <h5 className="modal-title col-sm-4 offset-5 text-light text-uppercase" id={`image${item.id}Label`}><b>Full Image</b></h5>
                    <button type="button" className="btn-close bg-light"  data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                  <img src={`http://localhost:8000/${item.image}`} alt="Full Image Here" className="card-img-top"/>
                  
                  </div>
                  <div className="modal-footer">
                  <button type="button" className="btn mb-2 btn-light" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
        </div>
        : '' 
          )
        })
        }
        {/* End User */}
        {
        props.rental.map((item, key)=>{ 
        return (
            item.auth_role==='end'?
          <div key={item.id} className="mt-3 p-3 w-25" style={{'float':'left'}}>
          <Link className="text-success" style={{'text-decoration':'none', 'font-size':'90%'}} to={`/subcat/${item.category}/${item.subcat}`}><small><b><i className="fa fa-tags text-warning" aria-hidden="true"></i>&nbsp;{item.category}/{item.subcat}</b></small></Link> 
          <small><i className="float-end">{item.auth_role === "admin" ? <i className="fa-solid fa-lock text-danger"></i> : ''}{item.auth_role === "end" ? <i className="fa-solid fa-user-check text-success"></i> : ''}{item.auth_role === "agency" ? <i className="fa-solid fa-star text-warning"></i> : ""}&nbsp;<Link className="text-success" style={{'text-decoration':'none', 'font-size':'70%', 'font-weight':'bold'}} to={`/author/${item.auth_id}`}>{item.auth_name.substring(0, 7)}..</Link></i></small>
        <div className="card">
        <button type="button" className="btn p-0 text-uppercase" data-bs-toggle="modal" data-bs-target={`#image${item.id}`}><img src={`http://localhost:8000/${item.image}`} height="170px" className="card-img-top"/></button>
        <div className="card-body">
          <small className="card-title"><b>{item.title.length > 23? item.title.substring(0, 30)+ '..' : item.title}{ item.title.length <= 23 ? <br /> :'' }</b></small><br />
          <small><Link className="text-success" style={{'text-decoration':'none'}} to={`/location/${item.city}/${item.province}`}><i className="fa fa-map-marker text-danger" aria-hidden="true"></i>&nbsp;{item.city}..</Link></small><br />
          <b>PKR: {item.price}<span className="float-end text-info" title="Views" data-bs-dismiss="modal"><i className="fa-solid fa-eye"></i>&nbsp;{item.visits}</span></b>
          <p className="card-text"></p>
          <Link onClick={(e)=>addvisit(item.id)} className="btn btn-secondary btn-sm w-100 mb-1" to={`/rentaldetail/${item.id}`}><i className="fa fa-book" aria-hidden="true"></i>&nbsp;Read More</Link>
          <button onClick={(e)=>addphoneview(item.id)} type="button" className="btn btn-info btn-sm w-100 text-light text-uppercase" data-bs-toggle="modal" data-bs-target={`#modal${item.id}`}><i className="text-light fa fa-phone"></i>&nbsp;{item.auth_role ==="agency"? "Agency Contact" : "Contact Details" }</button>
           
 {/* <!-- Modal --> */}
            <div className="modal fade" id={`modal${item.id}`} tabindex="-1" aria-labelledby={`#modal${item.id}Label`} aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title offset-3 text-uppercase" id={`modal${item.id}Label`}><b><i className="fa fa-phone"></i>&nbsp;{item.auth_role ==="end"? "End User" : item.auth_role }&nbsp;Contact</b></h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                  <h6 className="text-success">  <i className="text-info fa fa-phone"></i>&nbsp;{item.phone1}<button className="btn btn-secondary btn-sm mx-3 " onClick={(e)=>copied(e, item.phone1)} >copy</button><span className="float-end mx-3 text-info" title="Contact Views" data-bs-dismiss="modal"><i class="fa fa-hand-pointer"></i>&nbsp;{item.phone_views}</span></h6>
                  <h6 className="text-success"><i className="text-info fa fa-phone"></i>&nbsp;{item.phone2}<button className="btn btn-secondary btn-sm mx-3 " onClick={(e)=>copied(e, item.phone2)}   >copy</button></h6>
                  <h6 className="text-lowercase text-success"><i className="text-info fa-solid fa-envelope"></i>&nbsp;{item.auth_email}<button className="btn btn-secondary btn-sm mx-3 " onClick={(e)=>copied(e, item.auth_email)} >copy</button></h6>
                  </div>
                  <div className="modal-footer">
                  <button type="button" className="btn mb-2 btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
            {/* Image Modal */}
            <div className="modal fade" id={`image${item.id}`} tabindex="-1" aria-labelledby={`#image${item.id}Label`} aria-hidden="true">
              <div className="modal-dialog modal-lg">
                <div className="modal-content bg-dark">
                  <div className="modal-header">
                    <h5 className="modal-title col-sm-4 offset-5 text-light text-uppercase" id={`image${item.id}Label`}><b>Full Image</b></h5>
                    <button type="button" className="btn-close bg-light"  data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                  <img src={`http://localhost:8000/${item.image}`} alt="Full Image Here" className="card-img-top"/>
                  
                  </div>
                  <div className="modal-footer">
                  <button type="button" className="btn mb-2 btn-light" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
        </div>
        : '' 
          )
        })
        }
    </div>
  )
}
