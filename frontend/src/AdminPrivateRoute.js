import React from 'react';
import {Route, Redirect, useHistory} from 'react-router-dom';
import Master from './layouts/admin/Master';
import { useState, useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';

export default function AdminPrivateRoute({...rest}) {
    const history = useHistory(); 
    const [auth, setauth] = useState(false);
    const [loading, setloading] = useState(true);
    useEffect(() => {
        axios.get('/api/authChecking').then(res =>{ 
            if(res.status === 200){
                setauth(true);
            }
            setloading(false);
        })
        return () => {
            setauth(false);
        }
    }, [])

    // axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
    //     if(err.response.status === 401){
    //         swal("Unauthorized", err.response.data.message, "warning");
    //         history.push('/login');
    //     }
    //     return Promise.reject(err);
    // });

    if(loading){
        return <div className="d-flex text-info justify-content-center mt-5">
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
    </div>
    }
    return (
        <div className="text-uppercase text-success">
            <Route {...rest}
            render={({props, location})=>
            auth ?
            (<Master {...props} />) :
            (<Redirect to={{pathname:"/login", state:{from: location}}} />)
            }
            />
        </div>
    )
}
