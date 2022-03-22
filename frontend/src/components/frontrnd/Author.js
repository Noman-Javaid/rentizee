import React from 'react'
import { useParams, withRouter, useHistory, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import RentalComponent from './RentalComponent';

function Author(props) {
  const { aid } = useParams();
  const [loading, setloading] = useState(true);
  const [rental, setrental] = useState([]);
  const [uimage, setuimage] = useState('');
  const history = useHistory();
  const [subscribed, setsubscribed] = useState(false);


  useEffect(() => {
    axios.get(`/api/userrental/${aid}`).then(res => {
      if (res.data.status === 200) {
        setrental(res.data.rental);
        const sid = localStorage.getItem('auth_id')
        axios.get(`/api/checksub/${aid}/${sid}`).then(res => {
          if (res.data.status === 200) {
            setsubscribed(true);
          }
        })
        axios.get(`/api/singleuser/${aid}`).then(res => {
          if (res.data.status === 200) {
            setuimage(res.data.user.dp);
          }
        })
        setloading(false);
      }else if (res.data.status === 404) {
        swal('Error', res.data.message, 'error');
        history.push('/');
      }
    })
  }, [])
  useEffect(() => {
    document.title= "rentizee | Author " + aid;
}, [])
  const subscribe = (e, id) => {
    e.preventDefault();
    var button = e.currentTarget;
    var sid = localStorage.getItem('auth_id')
    var sname = localStorage.getItem('auth_name')
    axios.post(`/api/subscribe/${id}/${sid}/${sname}`).then(res => {
      if (res.data.status === 200) {
        button.innerHTML = 'Subscribed';
        swal('Success', res.data.message,'success')
      }else if(res.data.status===404){
          swal('Error', res.data.message,'error')
      }
    })
  }
  const unsub = (e, id) => {
    e.preventDefault();
    var button = e.currentTarget;
    const sid = localStorage.getItem('auth_id')
    axios.delete(`/api/unsub/${id}/${sid}`).then(res => {
      if (res.data.status === 200) {
        button.innerHTML = 'Unsubscribed';
        swal('Success', res.data.message,'success')
      }else if(res.data.status===404){
        swal('Error', res.data.message,'error')
    }
    })
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
      <h1 className='m-4'>
      <button type="button" className="btn p-0" data-bs-toggle="modal" data-bs-target={`#image`}>{uimage?
            <img src={`http://localhost:8000/${uimage}`} style={{'border-radius':'50%','width':'50px', 'height':'50px', 'object-fit':'contain', 'background-color':'black'}} className=" border mx-3 " alt='profile' />
            :
            <img src={`http://localhost:8000/uploads/dp/defaultdp.jpg`} style={{'border-radius':'50%','width':'50px', 'height':'50px', 'object-fit':'contain', 'background-color':'black'}} className=" border mx-3 " alt='profile' />
             }</button>
        {rental[0].auth_name}'s Rental  ({rental.length}) 
      
      {
        localStorage.getItem('auth_id') ?
       subscribed ? <button onClick={(e) => unsub(e, aid)} className="btn btn-danger float-end btn-sm text-light mt-2" >Unsubscribe</button> : <button onClick={(e) => subscribe(e, aid)} className="btn btn-info float-end btn-sm text-light mt-2" >Subscribe</button>
        : <Link to='/login' className="btn btn-info float-end btn-sm text-light mt-2" >Subscribe</Link>
      }
      </h1>
      <RentalComponent rental={rental} />
      {/* DP Modal */}
      <div className="modal fade" id={`image`} tabindex="-1" aria-labelledby={`#imageLabel`} aria-hidden="true">
              <div className="modal-dialog">
                <div className="modal-content bg-dark">
                  <div className="modal-header">
                    <h5 className="modal-title col-sm-4 offset-5 text-light text-uppercase" id={`imageLabel`}><b>Full Image</b></h5>
                    <button type="button" className="btn-close bg-light"  data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div className="modal-body">
                    {
                      uimage?
                  <img src={`http://localhost:8000/${uimage}`} alt="Full Image Here" className="card-img-top"/>
                      :
                  <img src={`http://localhost:8000/uploads/dp/defaultdp.jpg`} alt="Full Image Here" className="card-img-top" />

                    }
                  
                  </div>
                  <div className="modal-footer">
                  <button type="button" className="btn mb-2 btn-light" data-bs-dismiss="modal">Close</button>
                  </div>
                </div>
              </div>
            </div>
    </div>
  )
}
export default withRouter(Author);