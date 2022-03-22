import React from 'react'
import { withRouter, useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import RentalComponent from './RentalComponent';

function Search(props) {
  const [loading, setloading] = useState(true);
  const [rentals, setrentals] = useState([]);
   const {city} = useParams();
   const {sub} = useParams();
   const {key} = useParams();
   const history = useHistory();
   useEffect(() => {
    axios.get(`/api/search/${city}/${sub}/${key}`).then(res =>{
          if(res.data.status===200){
            setrentals(res.data.rental);
          setloading(false);       
          }else if(res.data.status===404){
            swal('No Rentals Found', res.data.message,'error');
            history.push('/');
          }
          })
   }, [])
   useEffect(() => {
    document.title= `rentizee | Search ${city} ${sub} ${key} `;
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
      <h1 className="m-4">Search Results ({rentals.length})</h1>
     <RentalComponent  rental={rentals}/>
     </div>
  )
}
export default withRouter(Search);
