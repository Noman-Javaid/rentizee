import {React, useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
 
export const Sidebar = () => { 
    const [catname, setcatname] = useState('');
    const [cat, setCat] = useState([]);
    const [subcat, setSubcat] = useState([]);
    const [loading, setLoading] = useState(true);
    var SubCats='';

    useEffect(() => {
        axios.get(`/api/allcat`).then(res=>{
            if(res.data.status===200){
                setCat(res.data.category);
            }
        }) 
    }, [])

    const navClick = (slug)=>{
        SubCats='';
        setLoading(true);
        setcatname(slug);
           axios.get(`/api/subcatslug/${slug}`).then(res=>{
            if(res.data.subcat){
                setSubcat(res.data.subcat);
                setLoading(false);
            }
        })
    }

    if(loading){
        SubCats =(
            <div className="d-flex text-light justify-content-center">
        <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
        </div> );
    }else{
        SubCats = (
            <>
                            <Link className=" btn btn-dark btn-sm mx-3 mb-1" to={`/category/${catname}`} >All</Link>

                {subcat.map((item, key)=>{
                        return (
                            <Link className="nav-link text-light" to={`/subcat/${catname}/${item.slug}`}>{item.name}</Link>
                            );
                        
                        })}
            </>
        );
    }

    return (
<nav className="sb-sidenav accordion sb-sidenav-dark bg-info" id="sidenavAccordion">
        <div className="sb-sidenav-menu">
            <div className="nav">
                <div className="sb-sidenav-menu-heading text-dark">Welcome {localStorage.getItem('auth_name')}</div>
                <Link className="nav-link text-light" to="/admin/dashboard">
                    <div className="sb-nav-link text-light-icon"><i className="fas fa-tachometer-alt"></i></div>
                    Dashboard
                </Link>
                <Link className="nav-link text-light" to="/admin/profile">
                    <div className="sb-nav-link text-light-icon"><i className="fas fa-user"></i></div>
                    Profile
                </Link>
                <Link className="nav-link text-light" to="/">
                    <div className="sb-nav-link text-light-icon"><i className="fas fa-home"></i></div>
                    Home
                </Link>
                <div className="sb-sidenav-menu-heading text-dark">Managment</div>
                {
                    localStorage.getItem('auth_role')=="admin"?
                    <>
                    <Link className="nav-link text-light collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#users" aria-expanded="false" aria-controls="users">
                    <div className="sb-nav-link text-light-icon"><i className="fas fa-users"></i></div>
                    USERS
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="users" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link text-light" to="/admin/allusers"><i className="fas fa-users"></i>&nbsp;All User</Link>
                        <Link className="nav-link text-light" to="/admin/adduser"><i className="fas fa-user-plus"></i>&nbsp;Add Users</Link>
                    </nav>
                </div>
                <Link className="nav-link text-light collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#category" aria-expanded="false" aria-controls="category">
                    <div className="sb-nav-link text-light-icon"><i className="fas fa-th"></i></div>
                    CATEGORY
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="category" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link text-light" to="/admin/categories"><i className="fas fa-th"></i>&nbsp;Categories</Link>
                        <Link className="nav-link text-light" to="/admin/addcategory"><i className="fas fa-plus"></i>&nbsp;Category</Link>
                        <Link className="nav-link text-light" to="/admin/addsubcat"><i className="fas fa-plus"></i>&nbsp;Sub Category</Link>
                    </nav>
                </div>
                 <Link className="nav-link text-light collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#locations" aria-expanded="false" aria-controls="locations">
                    <div className="sb-nav-link text-light-icon"><i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;</div>
                    Locations
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="locations" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        <Link className="nav-link text-light" to="/admin/locations"><i className="fa fa-map-marker" aria-hidden="true"></i>&nbsp;All Locations</Link>
                        <Link className="nav-link text-light" to="/admin/addprovince"><i className="fas fa-plus"></i>&nbsp;Add Province</Link>
                        <Link className="nav-link text-light" to="/admin/addcity"><i className="fas fa-plus"></i>&nbsp;Add City</Link>
                    </nav>
                </div>
                </>
                :null
                } 

                <Link className="nav-link text-light collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#rentals" aria-expanded="false" aria-controls="rentals">
                    <div className="sb-nav-link text-light-icon"><i className="fas fa-truck-loading"></i></div>
                    RENTALS
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="rentals" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav">
                        {
                            localStorage.getItem('auth_role')=="admin"?
                        <Link className="nav-link text-light" to="/admin/allrentals"><i className="fas fa-truck-loading"></i>&nbsp;All</Link>
                            :null
                        }
                        <Link className="nav-link text-light" to="/admin/addrentals"><i className="fas fa-plus"></i>&nbsp;Rental</Link>
                    </nav>
                </div>
                <Link className="nav-link text-light collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                    <div className="sb-nav-link text-light-icon"><i className="fas fa-book-open"></i></div>
                    PAGES
                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                </Link>
                <div className="collapse" id="collapsePages" aria-labelledby="headingTwo" data-bs-parent="#sidenavAccordion">
                    <nav className="sb-sidenav-menu-nested nav accordion" id="sidenavAccordionPages">



                    {
                      cat.map((item, key)=>{
                        return ( 
                            item.slug=="others"? '':
                            <span key={item.id}>
                            <Link onClick={(e)=>navClick(item.slug)} className="nav-link text-light collapsed" to="#" data-bs-toggle="collapse" data-bs-target={`#${item.slug}`} aria-expanded="false" aria-controls={item.slug}>
                                {item.name}
                                <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                            </Link>
                            <div className="collapse" id={item.slug} aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                                <nav className="sb-sidenav-menu-nested nav">
                                    {SubCats}
                                </nav>
                            </div>
                                   </span> 
                                 );
                        })
                    }
                    {   cat.map((item, key)=>{
                            return ( 
                                item.slug !="others" ? '':
                                <span key={item.id}>
                        <Link onClick={(e)=>navClick(item.slug)} className="nav-link text-light collapsed" to="#" data-bs-toggle="collapse" data-bs-target={`#${item.slug}`} aria-expanded="false" aria-controls={item.slug}>
                            {item.name}
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id={item.slug} aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                            <nav className="sb-sidenav-menu-nested nav">
                            {SubCats}
                            </nav>
                        </div>
                               </span>    );
                            })
                     }
                        <Link className="nav-link text-light collapsed" to="#" data-bs-toggle="collapse" data-bs-target="#about" aria-expanded="false" aria-controls="about">
                            About
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </Link>
                        <div className="collapse" id="about" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordionPages">
                            <nav className="sb-sidenav-menu-nested nav">
                                <Link className="nav-link text-light" to="/about">About</Link>
                                <Link className="nav-link text-light" to="/faq">FAQ</Link>
                                <Link className="nav-link text-light" to="/contact">Contact Us</Link>

                            </nav>
                        </div>
                    </nav>
                </div>
                <div className="sb-sidenav-menu-heading text-dark">Addons</div>
                <Link className="nav-link text-light" to="charts.html">
                    <div className="sb-nav-link text-light-icon"><i className="fas fa-chart-area"></i></div>
                    Charts
                </Link>
                <Link className="nav-link text-light" to="tables.html">
                    <div className="sb-nav-link text-light-icon"><i className="fas fa-table"></i></div>
                    Tables
                </Link>
            </div>
        </div>
        <div className="sb-sidenav-footer bg-dark">
            <div className="small">Logged in as:</div>
            {localStorage.getItem('auth_role')=="end"?
            <small>Basic Account</small>
            :
            localStorage.getItem('auth_role')}
  
        </div>
    </nav> 
    )
} 
export default Sidebar;