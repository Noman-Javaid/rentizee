import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import {useHistory } from 'react-router-dom';
import {Categories} from '../../../components/admin/Categories';


export default function AdminAccess(props) {
    let Cmp = props.cmp; 
    const [loading2, setloading2] = useState(true);

    const history= useHistory();
    useEffect(() => {
        const id= localStorage.getItem('auth_id');
        axios.get('/api/rolecheck/'+id).then(res=>{
            if(res.data.role !="admin"){
            setloading2(true);
            swal("Unauthorized", "You are Unauthorized to access that page", "warning");
            history.push('/');
            }
            setloading2(false);
        })
    }, [])
    if(loading2){
        return <div className="d-flex text-info justify-content-center mt-5">
        <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
    </div>
    }
    return (
        <div>
            <Cmp />
        </div>
    )
} 
