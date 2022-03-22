import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import RentalComponent from './RentalComponent';

export default function Rentals() {
    const [loading, setloading] = useState(true);
    const [rentals, setrentals] = useState([]);
    useEffect(() => {
        axios.get(`/api/allrentals`).then(res=>{
            if(res.data.status===200){
                setrentals(res.data.rentals);
                setloading(false);
            }
        }) 
    }, [])
    useEffect(() => {
        document.title= "rentizee | Rentals";
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
        <h1 className="m-4">All Rentals ({rentals.length}) </h1>
        <RentalComponent rental={rentals} /> 
    </div>
  )
}
