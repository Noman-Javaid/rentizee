import React from 'react'
import Topnav from '../../layouts/frontend/Topnav';


export default function Main(props) {
    let Cmp = props.cmp; 
    return (
        <div className="text-uppercase text-success"> 
            <Topnav />
            <Cmp />
        </div>
    )
} 
