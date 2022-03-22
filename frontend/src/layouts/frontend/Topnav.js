import {React, useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import {useHistory} from 'react-router-dom'; 
import {Nav, Container,Navbar, NavDropdown, Button} from 'react-bootstrap'; 


export default function Topnav() {
    const [cat, setCat] = useState([]);
    const [subcat, setSubcat] = useState([]);
    const [catname, setcatname] = useState('');
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get(`/api/allcat`).then(res=>{
            if(res.data.status===200){
                setCat(res.data.category);
            }
        }) 
    }, [])
    const history= useHistory();
    const logoutSubmit= (e)=>{
        e.preventDefault();
        axios.post('/api/logout').then(res =>{
            if(res.data.status === 200){
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem('auth_role');
                localStorage.removeItem('auth_id');
                swal("Success",res.data.message,"success");
                history.push('/');
            } 
        });
    }
    var SubCats='';
    const navClick = (slug)=>{
        setLoading(true);
        SubCats='';
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
        <div className="d-flex text-info justify-content-center">
        <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
        </div> );
    }
    
    if(!loading){
        SubCats = (
            <>          
                        <a className="mx-3 btn btn-dark btn-sm px-5 mb-1" href={`/category/${catname}`}>All</a>
                         {subcat.map((item, key)=>{
                        return (
                        <a className="text-success text-decoration-none mx-3" href={`/subcat/${catname}/${item.slug}`}><b><small>{item.name}</small></b><br /></a> 
                        );
                        })}
            </>
        );
    }
    var AuthButtons ='';
    if(!localStorage.getItem('auth_token')){
        AuthButtons= (
            <>
         <Link className="nav-link text-light" title="Login" to="/login"><i class="fa-solid fa-right-to-bracket"></i></Link>
         <Link className="nav-link text-light" title="Register" to="/register"><i class="fa-solid fa-user-plus"></i></Link>
            </>
        );
    }else{
        AuthButtons=(
            <>
         <Link className="nav-link text-light" title="Add Rental" to="/admin/addrentals"><i class="fa-solid fa-plus"></i>&nbsp;</Link>
         <Link className="nav-link text-light" title="Admin Pannel" to="/admin/dashboard"><i className="fas fa-user"></i>&nbsp;</Link>
            </>
        );
    }
    if(localStorage.getItem('auth_token')){
     var logout='';
     logout = (
         <>
        <Button style={{'borderRadius':'20px', 'fontSize':'80%'}} className="btn btn-dark" onClick={logoutSubmit} variant="secondary">Logout</Button>
         </>
     );   
    }
    return (
        <>
        <Navbar collapseOnSelect expand="lg" className="p-0" bg="info" variant="dark">
            <Container>
            <Link className="navbar-brand" to="/">
            <img id="rotate" alt="RENTIZEE" src={`http://localhost:3000/fivicon.png`} style={{'object-fit':'contain'}} className="m-0 p-0" width='60' />
            <img alt="RENTIZEE" src={`http://localhost:3000/rentizee.png`} style={{'object-fit':'contain'}} className="m-0 p-0" width='160' />
        
            </Link>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Link className="nav-link text-light" to="/"><i className="fas fa-home"></i>&nbsp;</Link>
            <Link title="rentals" className="nav-link text-light" to="/rentals"><i className="fas fa-truck-loading"></i>&nbsp;Rentals</Link>

  
                {/* <Nav.Link href="#pricing">Rentals</Nav.Link> */}
                {
                      cat.map((item, key)=>{
                        return ( item.slug=="others"? '':
                        <small style={{'border-radius':'4px', 'font-size':'80%'}} className="m-1 bg-dark text-dark">
                        <NavDropdown  key={item.id} onClick={(e)=>navClick(item.slug)} title={item.name}  id="collasible-nav-dropdown">
                                {SubCats}
                                 </NavDropdown></small>
                                 );
                        })
                    }
                    {   cat.map((item, key)=>{
                            return ( item.slug!="others"? '':
                        <small style={{'border-radius':'4px', 'font-size':'80%'}} className="m-1 bg-dark text-dark">
                            <NavDropdown key={item.id} onClick={(e)=>navClick(item.slug)} title={item.name}  id="collasible-nav-dropdown">
                                    {SubCats}
                                     </NavDropdown></small>
                                     );
                            })
                     }
            </Nav>
        <Nav>
        {AuthButtons}
            {logout}
        </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>
    </>
    )
}
