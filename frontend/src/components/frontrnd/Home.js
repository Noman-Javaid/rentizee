import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Search from './Search';
import { Carousel } from 'react-bootstrap';
import { Redirect, Switch, Route, Link, useHistory } from 'react-router-dom';
import FooterComponent from './FooterComponent';

export default function Home() {
    const [loading, setloading] = useState(true);
    const [cityname, setcityname] = useState('$');
    const [subname, setsubname] = useState('$');
    const [keywords, setkeywords] = useState('$');
    const [subcat, setsubcat] = useState([]);
    const [city, setcity] = useState([]);
    const history = useHistory()
    useEffect(() => {
        document.title = "rentizee";
    }, [])
    useEffect(() => {
        // All Categories UseEffect
        axios.get(`/api/allsubcat`).then(res => {
            if (res.data.status === 200) {
                setsubcat(res.data.subcategory);
            }
        })
        axios.get(`/api/cities`).then(res => {
            if (res.data.status === 200) {
                setcity(res.data.cities);
            }
        })
        setloading(false)
    }, [])
    if (loading) {
        return <div className="d-flex text-info justify-content-center mt-5">
        <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
    </div>
    }

    return (
        <div id="container" >
            <img src="banner/banner1.jpg" className="w-100" height="" />
            <div id="centered" className="" >
                <h1 className="text-light" style={{ 'text-shadow': '2px 2px blue' }}>Search Rentals</h1>
                {
                    loading ?
                        <>
                            Loading....
                        </>
                        :
                        <>
                            <div style={{ 'opacity': '0.9' }}>
                                <select name="" onChange={(e) => setcityname(e.target.value)} className="form-control m-1">
                                    <option value=""  >Select City</option>
                                    {
                                        city.map((item, key) => {
                                            return (
                                                <>
                                                    <option value={item.name}  >{item.name}</option>
                                                </>
                                            )
                                        })
                                    }

                                </select>
                                <select name="" onChange={(e) => setsubname(e.target.value)} className="form-control m-1">
                                    <option value=""  >Select Rental Type</option>
                                    {
                                        subcat.map((item, key) => {
                                            return (
                                                <>
                                                    <option value={item.slug}  >{item.name}</option>
                                                </>
                                            )
                                        })
                                    }
                                </select>
                                <input name="keywords" type="text" id="search" onChange={(e) => setkeywords(e.target.value)} className="form-control m-1" placeholder="Enter Keywords" />
                                <Link to={`/search/${cityname}/${subname}/${keywords}`} className="btn btn-info text-light float-end" >Search&nbsp;<i className="fa-solid fa-magnifying-glass"></i></Link>
                            </div>
                        </>
                }
            </div>
            <FooterComponent />           
        </div>
    )
}
