import React from 'react'
import {Link,useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import axios from 'axios';
import {NavDropdown} from 'react-bootstrap'


export const Navbar = () => {
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
    return (
            <nav className="sb-topnav navbar navbar-expand navbar-info bg-info">
            <Link className="navbar-brand ps-3" to="/">
        <img id="rotate" alt="RENTIZEE" src={`http://localhost:3000/fivicon.png`} style={{'object-fit':'contain'}} className="m-1 p-0" width='50' />
        <img alt="RENTIZEE" src={`http://localhost:3000/rentizee.png`} style={{'object-fit':'contain'}} className="m-1 p-0" width='130' />
            </Link>
            {/* <button className="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" to="#!"><i className="fas fa-bars"></i></button> */}
            <form className="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
                <div className="input-group">
                 <button style={{'borderRadius':'20px', 'fontSize':'80%'}} type="button" onClick={logoutSubmit} className="btn btn-dark"  >LogOut</button>
                
                </div>
            </form>
        </nav>
    )
}

export default Navbar;
