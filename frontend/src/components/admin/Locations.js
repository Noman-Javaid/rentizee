import {React, useState, useEffect} from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import { Link } from 'react-router-dom';

export default function Locations() {
    const [loading, setloading] = useState(true);
    const [province, setprovince] = useState([]);
    const [city, setcity] = useState([]);
    useEffect(() => {
        axios.get(`/api/province`).then(res=>{
            if(res.data.status===200){
                setprovince(res.data.province);
            }
            setloading(false);
        }) 
    }, [])

    useEffect(() => {
      axios.get(`/api/cities`).then(res=>{
          if(res.data.status===200){
              setcity(res.data.cities);
          }
          setloading(false);
      }) 
  }, [])
  useEffect(() => {
    document.title= "Portfolio | rentizee | Locations";
}, [])
  const delprovince = (e, id) =>{
   e.preventDefault();
   let province= e.currentTarget;
   province.innerHTML = 'deleting...';
   axios.delete(`api/delprovince/${id}`).then(res=>{
    if(res.data.status===200){
        swal('Success',res.data.message,"success");
        province.closest("tr").remove();
      }else if(res.data.status=404){
        swal('Error',res.data.message,"error");
        province.innerHTML = 'Not Deleted';
      }
   })
  }
  const delcity = (e, id) =>{
    e.preventDefault();
    let city= e.currentTarget;
    city.innerHTML = 'deleting...';
    axios.delete(`api/delcity/${id}`).then(res=>{
        if(res.data.status===200){
            swal('Success',res.data.message,"success");
            city.closest("tr").remove();
          }else if(res.data.status=404){
            swal('Error',res.data.message,"error");
            city.innerHTML = 'Not Deleted';
          }
  }) 
}



  if(loading){
    return <div className="d-flex text-info justify-content-center mt-5">
    <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
</div>
}else{
    var province_content = province.map((item, key)=>{
        return (<tbody>      <tr key={item.id}>
            <td className="text-success">{item.id}</td>
            <td className="text-success">{item.name}</td>
            <td className="text-danger">
                <button type="button" onClick={(e)=>delprovince(e, item.id)} className="btn text-danger" ><i className="fas fa-trash"></i></button>
            </td>
        </tr></tbody>)
    });
    var city_content = city.map((item, key)=>{
        return (<tbody>      <tr key={item.id}>
            <td className="text-success">{item.id}</td>
            <td className="text-success">{item.name}</td>
            <td className="text-success">{item.prname}</td>
            <td className="text-danger">
                <button type="button" onClick={(e)=>delcity(e, item.id)} className="btn text-danger" ><i className="fas fa-trash"></i></button>
                <Link to={`/location/${item.name}/${item.prname}`} className="btn text-success" ><i className="fa-solid fa-camera text-info"></i></Link>
            </td>
        </tr></tbody>)
    });
 

}
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4 text-success text-uppercase " >Locations</h1>

        <ul className="nav nav-tabs pt-3" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
            <button className="nav-link active text-success" id="province-tab" data-bs-toggle="tab" data-bs-target="#province" type="button" role="tab" aria-controls="province" aria-selected="true">Provinces ({province.length})</button>
        </li>
        <li className="nav-item" role="presentation">
            <button className="nav-link text-success" id="city-tab" data-bs-toggle="tab" data-bs-target="#city" type="button" role="tab" aria-controls="city" aria-selected="false">Cities ({city.length})</button>
        </li>
        </ul>
        <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active text-success" id="province" role="tabpanel" aria-labelledby="province-tab">
        <Link to={`/admin/addprovince`} className="btn btn-info text-light btn-sm float-end mt-2">Add Province</Link>
            
        <table className="table text-success text-center">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">Province Name</th>
      <th scope="col">Operations</th>
    </tr>
  </thead>
  {province_content}

</table>    
             
        </div>
        <div className="tab-pane fade text-success" id="city" role="tabpanel" aria-labelledby="city-tab">
        <Link to={`/admin/addcity`} className="btn btn-info text-light btn-sm float-end mt-2">Add City</Link>

        <table className="table text-success text-center">
  <thead>
    <tr>
      <th scope="col">ID</th>
      <th scope="col">City Name</th>
      <th scope="col">Province</th>
      <th scope="col">Operations</th>
    </tr>
  </thead>
  {city_content}

</table>
        </div>
        </div>
        </div>
    )
}

