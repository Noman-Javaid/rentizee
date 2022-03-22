import React from 'react'
import { useParams, withRouter, useHistory, Link } from 'react-router-dom'
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import RentalComponent from './RentalComponent';

function Subcat(props) {
    const {cat} = useParams();
    const {sub} = useParams();
    const [loading, setloading] = useState(true);
    const [rental, setrental] = useState([]);
    const history = useHistory();
    
    useEffect(() => {
      axios.get(`/api/subcatrental/${cat}/${sub}`).then(res=>{
        if(res.data.status===200){
          setrental(res.data.rental);
          setloading(false);  
        }else if(res.data.status===404){
          swal('Error', res.data.message,'error');
          history.push('/');
        }
          })
    }, [])
    useEffect(() => {
      document.title= "rentizee | "+ cat +" "+ sub;
  }, [])
    if(loading){
      return <div className="d-flex text-info justify-content-center mt-5">
      <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
  </div>
  }
    
  return (
    <div className="container">
        <h1 className="m-4">{cat}/ {sub} ({rental.length}) </h1>
        <RentalComponent rental={rental} />
    </div>
  )
}
export default withRouter(Subcat);
