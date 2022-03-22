import React from 'react'
import { Carousel } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function FooterComponent() {
    const [loading, setloading] = useState(true);
    const [subcat, setsubcat] = useState([]);
    const [city, setcity] = useState([]);
    const [province, setprovince] = useState([]);
    const [cats, setcats] = useState([]);
    const [users, setusers] = useState([]);

    useEffect(() => {
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
        axios.get(`/api/province`).then(res => {
            if (res.data.status === 200) {
                setprovince(res.data.province);
            }
        })
        axios.get(`/api/allcat`).then(res => {
            if (res.data.status === 200) {
                setcats(res.data.category);
            }
        })
        axios.get(`/api/allusers`).then(res => {
            if (res.data.status === 200) {
                setusers(res.data.users);
            }
        })
        setloading(false)
    }, [])
    if (loading) {
        return <div className="d-flex text-info justify-content-center mt-5">
            <img id="loading" src={`/fivicon.png`} style={{ 'object-fit': 'contain' }} className="mx-1" width='25' />
            <img id="loading" src={`/fivicon.png`} style={{ 'object-fit': 'contain' }} className="mx-1" width='25' />
            <img id="loading" src={`/fivicon.png`} style={{ 'object-fit': 'contain' }} className="mx-1" width='25' />
        </div>
    }
    return (
        <div className="container-fluid">    <div className="card-deck row justify-content-center mt-3">
            <div className="card col-sm-3 m-2 p-0 ">
                <Carousel>
                    <Carousel.Item >
                        <img
                            className="d-block w-100"
                            src="/banner/province1.jpg"
                            alt="First slide"
                            height='220'
                        />
                        <Carousel.Caption>
                            <h3>All Over Country</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="d-block w-100"
                            src="/banner/province2.jpg"
                            alt="Second slide"
                            height='220'
                        />
                        <Carousel.Caption>
                            <h3>All Provinces</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/banner/province3.jpg"
                            alt="Third slide"
                            height='220'

                        />
                        <Carousel.Caption>
                            <h3>Given Locations</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className="card-body text-center">
                    <h5 className="card-title">Provinces</h5>
                    {
                        province.map((item, key) => {
                            return (
                                <>
                                    <Link className="text-decoration-none text-success" style={{'font-size':'12px','line-height':'normal'}} >{item.name}</Link><br />
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className="card col-sm-3 m-2 p-0 ">
                <Carousel>
                    <Carousel.Item >
                        <img
                            className="d-block w-100"
                            src="/banner/city1.jpg"
                            alt="First slide"
                            height='220'
                        />
                        <Carousel.Caption>
                            <h3>All Over Country</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="d-block w-100"
                            src="/banner/city2.jpg"
                            alt="Second slide"
                            height='220'

                        />
                        <Carousel.Caption>
                            <h3>All Cities</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/banner/city3.jpg"
                            alt="Third slide"
                            height='220'

                        />
                        <Carousel.Caption>
                            <h3>Given Cities</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className="card-body text-center">
                    <h5 className="card-title">Cities</h5>
                    {
                        city.map((item, key) => {
                            return (
                                <>
                                    <Link className="text-decoration-none text-success" to={`/location/${item.name}/${item.prname}`} style={{'font-size':'12px','line-height':'normal'}}  >{item.name}</Link><br />
                                </>
                            )
                        })
                    }
                </div>
            </div>
            <div className="card col-sm-3 m-2 p-0 ">
                <Carousel>
                    <Carousel.Item >
                        <img
                            className="d-block w-100"
                            src="/banner/category1.jpg"
                            alt="First slide"
                            height='220'
                        />
                        <Carousel.Caption>
                            <h3>All Categories</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item >
                        <img
                            className="d-block w-100"
                            src="/banner/category2.jpg"
                            alt="Second slide"
                            height='220'

                        />
                        <Carousel.Caption>
                            <h3>Every Aspects</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="/banner/category3.jpg"
                            alt="Third slide"
                            height='220'

                        />
                        <Carousel.Caption>
                            <h3>Given Categories</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
                <div className="card-body text-center">
                    <h5 className="card-title">Categories</h5>
                    {
                        cats.map((item, key) => {
                            return (
                                <>
                                    <Link className="text-decoration-none text-success" to={`/category/${item.slug}`} style={{'font-size':'12px','line-height':'normal'}}  >{item.name}</Link><br />
                                </>
                            )
                        })
                    }
                </div>
            </div>
        </div>
            <div className="card-deck row justify-content-center mt-3">
                <div className="card col-sm-5 m-2 p-0 ">
                    <Carousel>
                        <Carousel.Item >
                            <img
                                className="d-block w-100"
                                src="/banner/house.jpg"
                                alt="First slide"
                                height='280'
                            />
                            <Carousel.Caption>
                                <h3>Houses For Rent</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item >
                            <img
                                className="d-block w-100"
                                src="/banner/shops.jpg"
                                alt="Second slide"
                                height='280'

                            />
                            <Carousel.Caption>
                                <h3>Shops For Rent</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/banner/electronics.jpg"
                                alt="Third slide"
                                height='280'

                            />
                            <Carousel.Caption>
                                <h3>Rental Electronics</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src="/banner/vehicle.jpg"
                                alt="Third slide"
                                height='280'

                            />
                            <Carousel.Caption>
                                <h3>Vehicles For Rent</h3>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <div className="card-body text-center">
                        <h5 className="card-title">Rental Types</h5>
                        {
                            subcat.map((item, key) => {
                                return (
                                    <>
                                        <Link className="text-decoration-none text-success" style={{'font-size':'12px','line-height':'normal'}} to={`/subcat/${item.parentcat}/${item.slug}`}  >{item.name}</Link><br />
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                {/* Agencies */}
                <div className="col-sm-10 m-2 p-0 ">

                    <div className="row justify-content-center text-center mt-3">
                        <h4>Registered Agencies</h4>
                        {
                            users.map((item, key) => {
                                return (
                                    item.role === 'agency' ?
                                        <Link to={`/author/${item.id}`} className="text-white col-sm-1 text-center">
                                            <div className="card " style={{ 'border': 'none', 'cursor': 'pointer' }}>
                                                {
                                                    item.dp ?
                                                        <img id="agency" src={`http://127.0.0.1:8000/${item.dp}`} className="card-img" alt="Agency" style={{ 'border-radius': '50%', 'width': '80px', 'height': '80px', 'object-fit': 'contain', 'background-color': 'black' }} />
                                                        :
                                                        <img id="agency" src={`http://localhost:8000/uploads/dp/defaultdp.jpg`} className="card-img" alt="Agency" style={{ 'border-radius': '50%', 'width': '80px', 'height': '80px', 'object-fit': 'contain', 'background-color': 'black' }} />

                                                }
                                                <div className="card-img-overlay text-center">
                                                    <b className="card-title text-light" style={{ 'font-size': '10px' }}>{item.name.substring(0, 10)}...</b>
                                                </div>
                                            </div>
                                        </Link>
                                        : ''
                                )
                            })
                        }


                    </div>
                </div>
                <footer className="w-100 py-4 flex-shrink-0 mt-5 bg-info">
                    <div className="container py-4">
                        <div className="row">
                            <div className="col-sm-6 m-0 p-0">
                                <Link className="" to="/">
                                    <img id="rotate" alt="RENTIZEE" src={`http://localhost:3000/fivicon.png`} style={{ 'object-fit': 'contain' }} className="m-0 p-0" width='130' />
                                    <img alt="RENTIZEE" src={`http://localhost:3000/rentizee.png`} style={{ 'object-fit': 'contain' }} className="m-0 p-0" width='330' />

                                </Link>
                            </div>
                            <div className="col-sm-6 ">
                                <h5 className="text-white m-0 mb-3 ">Quick links</h5>
                                <ul className="list-unstyled text-light text-decoration-none">
                                    <li ><Link className="text-light text-decoration-none" to="/">Home</Link></li>
                                    <li ><Link className="text-light text-decoration-none" to="/about">About</Link></li>
                                    <li ><Link className="text-light text-decoration-none" to="/faq">FAQ</Link></li>
                                    <li ><Link className="text-light text-decoration-none" to="/contact">Contact Us</Link></li>
                                    {
                                        localStorage.getItem('auth_id') ? '' :
                                            <>
                                                <li ><Link className="text-light text-decoration-none" to="/login">Login</Link></li>
                                                <li ><Link className="text-light text-decoration-none" to="/register">Register</Link></li>
                                            </>
                                    }

                                    <li ><Link className="text-light text-decoration-none" to="/rentals">Rentals Available</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className=" col-sm-6">
                                <h5 className="text-white mb-3">Our Motto</h5>
                                <p className="small text-muted">To provide all rental services at one plateform, and make your rent easy. Because We are <b className="text-light">RENTIZEE</b></p>
                            </div>
                            <div className="col-sm-6">
                                <h5 className="text-white mb-3">Our Tagline</h5>
                                <p className="small text-muted">Rent with Ease</p>
                            </div>
                        </div>
                        <small className="text-center text-lowercase"><i className="fa fa-copyright"></i>&nbsp;copyrights @rentizee.com</small>

                    </div>
                </footer>
            </div>

        </div>
    )
}
