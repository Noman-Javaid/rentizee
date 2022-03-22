import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import swal from 'sweetalert';

export default function EditRental() {
    //Loading States
    const [loading, setloading] = useState(true);
    const history = useHistory();
    //Frontend States
    const {pid} = useParams();
    const [error, setError] = useState([]);
    //Frontend Vars
    var property = '';
    var electronics = '';
    var vehicles = '';
    var image = '';
    //Fetch Data 
    useEffect(() => {
      axios.get(`/api/fetchpost/${pid}`).then(res=>{
          if(res.data.status===200){
            setrentalInput(res.data.rental);
            setcatvalue(res.data.rental.category);
          }else if(res.data.status===404){
              swal("Error",res.data.message,'error');
              history.push(`/admin/allrentals`);
          }
          //Data Values
          setloading(false);
    });
  }, [history])
  useEffect(() => {
    document.title= "Portfolio | rentizee | Edit Rental";
}, [])

    ////////////////////////////Form Value States///////////////////////////////
    const [catvalue, setcatvalue] = useState('');
    const [elevator, setelevator] = useState(false);
    const [lawn, setlawn] = useState(false);
    const [roof, setroof] = useState(false);
    const [parking, setparking] = useState(false);
    const [operator, setoperator] = useState(false);
    const [picture, setpicture] = useState([]);
    const [rentalInput, setrentalInput] = useState({
        image:'',
        phone:'',
        email:'',
        address:'',
        title:'',
        description:'',
        price:'',
        phone2:'',
        keywords:'',
        condition:'',
        duration:'',
        area:'',
        floors:'',
        bedrooms:'',
        bathrooms:'',
        kitchens:'',
        car_model:'',
        milage:'',
        fuel_type:'',
        fuel_average:'',
        elec_model:'',
        company:'',
    });
    const handleInput = (e)=>{
        e.persist();
        setrentalInput({...rentalInput, [e.target.name]:e.target.value});
    }
    const handleImage =(e)=>{
        setpicture({image: e.target.files[0] });
    }
    const updaterental = (e)=>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('image', picture.image);
        formData.append('category', catvalue);
        formData.append('elevator', elevator);
        formData.append('lawn', lawn);
        formData.append('roof', roof);
        formData.append('parking', parking);
        formData.append('operator', operator);
        formData.append('address', rentalInput.address);
        formData.append('title', rentalInput.title);
        formData.append('description', rentalInput.description);
        formData.append('price', rentalInput.price);
        formData.append('phone2', rentalInput.phone2);
        formData.append('keywords', rentalInput.keywords);
        formData.append('condition', rentalInput.condition);
        formData.append('duration', rentalInput.duration);
        formData.append('area', rentalInput.area);
        formData.append('floors', rentalInput.floors);
        formData.append('bedrooms', rentalInput.bedrooms);
        formData.append('bathrooms', rentalInput.bathrooms);
        formData.append('kitchens', rentalInput.kitchens);
        formData.append('car_model', rentalInput.car_model);
        formData.append('milage', rentalInput.milage);
        formData.append('fuel_type', rentalInput.fuel_type);
        formData.append('fuel_average', rentalInput.fuel_average);
        formData.append('elec_model', rentalInput.elec_model);
        formData.append('company', rentalInput.company);

        axios.post(`/api/updaterental/${pid}`, formData).then(res=>{
            if(res.data.status===200){
                swal("Success", res.data.message, "success");
                history.push('/admin/dashboard');
                setError([]);
            }else if(res.data.status===422){
                setError(res.data.error);
                swal("Error", "All fields are Mandatory", "error");
            }else if(res.data.status===423){
                setError(res.data.error);
                swal("Error", "Image Format is Incorrect", "error");
            }else if(res.data.status===401){
                swal("Error", res.data.message, "error");
                history.push('/admin/dashboard');
            }
        })
    }
    if(loading){
        return <div className="d-flex text-info justify-content-center mt-5">
        <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
                <img id="loading" src={`/fivicon.png`} style={{'object-fit':'contain'}} className="mx-1" width='25' />
    </div>
    }
  if(catvalue){
      if(catvalue==='property'){
        property=(
         <>
         <div className="row">
                    <div className="text-danger mt-3 col-sm-12 offset-2">Property Features</div>
                    <div className='form-group  col-sm-4 offset-2'>
                    <label className='mt-3'>Area</label> <small> (marla)</small>
                    <input  type="number" min='0' name="area" onChange={handleInput} value={rentalInput.area} className="form-control" />
                    </div>
                    <div className='form-group  col-sm-4 '>
                    <label className='mt-3'>Floors</label>
                    <input  type="text" name="floors" onChange={handleInput} value={rentalInput.floors} className="form-control" />
                    </div>
                    </div>
                    <div className="row">
                    <div className='form-group mt-3 col-sm-2 offset-2'>
                    <input  type="checkbox" onChange={(e)=>setelevator(e.target.checked)} defaultChecked={rentalInput.elevator} className='form-check-input text-success bg-success'    />
                    <small>&nbsp;Elevator</small>
                    </div>
                    <div className='form-group mt-3 col-sm-2'>
                    <input  type="checkbox" onChange={(e)=>setlawn(e.target.checked)} defaultChecked={rentalInput.lawn}  className='form-check-input text-success bg-success' />
                    <small>&nbsp;Lawn</small>
                    </div>
                    <div className='form-group mt-3 col-sm-2'>
                    <input  type="checkbox" onChange={(e)=>setparking(e.target.checked)} defaultChecked={rentalInput.parking} className='form-check-input text-success bg-success'   />
                    <small>&nbsp;Parking</small>
                    </div>
                    <div className='form-group mt-3 col-sm-2'>
                    <input  type="checkbox" onChange={(e)=>setroof(e.target.checked)} defaultChecked={rentalInput.roof}    className='form-check-input text-success bg-success' />
                    <small>&nbsp;Roof</small>
                    </div>
                    </div>
                    <div className="row">
                    <div className='form-group  col-sm-4 offset-2'>
                    <label className='mt-3'>Bedrooms</label>
                    <input  type="number" name="bedrooms" className="form-control" onChange={handleInput} value={rentalInput.bedrooms} />
                    </div>
                    <div className='form-group  col-sm-4'>
                    <label className='mt-3'>Bathrooms</label>
                    <input  type="number" name="bathrooms" className="form-control" onChange={handleInput} value={rentalInput.bathrooms} />
                    </div>
                    </div>
                    <div className="row">
                    <div className='form-group  col-sm-4 offset-2'>
                    <label className='mt-3'>Kitchens</label>
                    <input  type="number" name="kitchens" className="form-control" onChange={handleInput} value={rentalInput.kitchens} />
                    </div>
                    </div>
         </>
            );
    }else if(catvalue==='vehicles'){
        vehicles =(
            <>
             <div className="text-danger col-sm-12 mt-3 offset-2">Vehicle Features</div>
                    <div className="row">
                    <div className='form-group  col-sm-4 offset-2'>
                    <label className='mt-3'>Car Model</label>
                    <input  type="text" name="car_model" onChange={handleInput} value={rentalInput.car_model} className="form-control" />
                    </div>
                    <div className='form-group col-sm-4'>
                    <label className='mt-3'>Milage</label><small className="text-danger text-lowercase"> (KM)</small>
                    <input  type="number" name="milage" onChange={handleInput} value={rentalInput.milage} className="form-control" />
                    </div>
                    </div>
                    <div className="row">
                    <div className='form-group  col-sm-4 offset-2'>
                    <label className='mt-3'>Fuel Type</label>
                    <input  type="text" name="fuel_type" onChange={handleInput} value={rentalInput.fuel_type} className="form-control" />
                    </div>
                    <div className='form-group  col-sm-4'>
                    <label className='mt-3'>Fuel Average</label><small className="text-danger text-lowercase"> (Per KM)</small>
                    <input  type="number" name="fuel_average" onChange={handleInput} value={rentalInput.fuel_average} className="form-control" />
                    </div>
                    </div>
                    <div className='row'>
                    
                    </div>

            </>
        )
    }else if(catvalue==='electronics'){
        electronics = (
            <>
             <div className="text-danger col-sm-12 mt-3 offset-2">Electronics Feature</div>
                    <div className='row'>
                    <div className='form-group offset-2 col-sm-4'>
                    <label className='mt-3'>Electronic Model</label>
                    <input  type="text" name="elec_model" onChange={handleInput} value={rentalInput.elec_model} className="form-control" />
                    </div>
                    <div className='form-group col-sm-4'>
                    <label className='mt-3'>Company Name</label>
                    <input  type="text" name="company" onChange={handleInput} value={rentalInput.company} className="form-control" />
                    </div>
                    </div>
                    <div className='row'>
                    <div className='form-group mt-3 offset-2 col-sm-4'>
                    <input  type="checkbox" onChange={(e)=>setoperator(e.target.checked)} defaultChecked={rentalInput.operator} className='form-check-input text-success bg-success'  />
                    <small>&nbsp;Operator</small>
                    </div>
                    </div></>
        )
    }
      }
    return (
        <div className="container-fluid mt-3 px-3">
               <h1 className=" text-uppercase" >Edit Rentals</h1>

               <ul className="nav nav-tabs mt-2" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                    <button className="nav-link active text-success" id="mandatory-tab" data-bs-toggle="tab" data-bs-target="#mandatory" type="button" role="tab" aria-controls="mandatory" aria-selected="true">Mandatory</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link text-success" id="basic-tab" data-bs-toggle="tab" data-bs-target="#basic" type="button" role="tab" aria-controls="basic" aria-selected="false">Basic</button>
                </li>
                <li className="nav-item" role="presentation">
                    <button className="nav-link text-success" id="other-tab" data-bs-toggle="tab" data-bs-target="#other" type="button" role="tab" aria-controls="other" aria-selected="false">Other Details</button>
                </li>
                </ul>
            <form onSubmit={updaterental}>
                <div className="tab-content" id="myTabContent">
                    {/* Mandatory  Fields ____________________________*/}
                <div className="tab-pane fade show active text-success card-body border" id="mandatory" role="tabpanel" aria-labelledby="mandatory-tab">
                <div className="row col-sm-12 offset-2">
                    <label className='mt-3'><span className="text-danger">* </span>Locations</label>
                <div className='form-group mb-3 col-sm-4'>
                <select className="form-control form-select custom-select" value={rentalInput.province} disabled>
                    <option disabled value={rentalInput.province} >{rentalInput.province}</option>
                </select>
                <small className="text-danger text-lowercase">{error.province ? error.province: '' }</small>
                </div>
                <div className='form-group mb-3 col-sm-4'>
                        <select className="form-control form-select custom-select" value={rentalInput.city} disabled>
                        <option disabled value={rentalInput.city} >{rentalInput.city}</option>
                        </select>
                        <small className="text-danger text-lowercase">{error.city ? error.city: '' }</small>
                        </div>
                
                </div>

                <div className="row col-sm-12 offset-2">
                    <label className='mt-3'><span className="text-danger">* </span>Rental Type</label>
                <div className='form-group mb-3 col-sm-4'>
                <select className="form-control form-select custom-select" value={rentalInput.category} disabled>
                <option disabled value={rentalInput.category} >{rentalInput.category}</option>
                </select>
                <small className="text-danger text-lowercase">{error.category ? error.category: '' }</small>

                </div>
                <div className='form-group mb-3 col-sm-4'>
                <select className="form-control form-select custom-select"  value={rentalInput.subcat} disabled>
                <option disabled value={rentalInput.subcat} >{rentalInput.subcat}</option>
                </select>
                <small className="text-danger text-lowercase">{error.subcat ? error.subcat: '' }</small>

                </div>
                </div>
                <div className="row">
                <div className='form-group mb-3 offset-2 col-sm-8'>
                <label className='mt-3'><span className="text-danger">* </span>Custom Address</label>
                <textarea placeholder='Enter Address' style={{'overflow-y':'scroll;', 'resize':'none'}}   name="address" onChange={handleInput} value={rentalInput.address} row='3' className="form-control" >
                </textarea>
                <small className="text-danger text-lowercase">{error.address ? error.address: '' }</small>
                </div>
                </div>
                </div>
                {/* Basic Fields ______________ */}
                <div className="tab-pane fade text-success card-body border" id="basic" role="tabpanel" aria-labelledby="basic-tab">
                    <div className="row">
                    <div className='form-group mb-3 col-sm-8 offset-2'>
                    <label className='mt-3'><span className="text-danger">* </span>Title</label>
                    <input  type="text" className="form-control" placeholder='Enter Rental Title' name='title' onChange={handleInput} value={rentalInput.title} />
                <small className="text-danger text-lowercase">{error.title ? error.title: '' }</small>
                    
                    </div>
                    </div>

                    <div className="row">
                    <div className='form-group mb-3 col-sm-8 offset-2'>
                    <label className='mt-3'><span className="text-danger">* </span>Description</label>
                    <textarea placeholder='Enter Rental Detail' style={{'overflow-y':'scroll;', 'resize':'none'}}  name="description" onChange={handleInput} value={rentalInput.description} row='3' className="form-control" >
                </textarea>
                <small className="text-danger text-lowercase">{error.description ? error.description: '' }</small>
                    </div>
                    </div>

                    <div className="row">
                    <div className='form-group mb-3 col-sm-8 offset-2'>
                    <label className='mt-3'><span className="text-danger">* </span>Price</label>
                    <input type="number" min='0' className="form-control" name="price" onChange={handleInput} value={rentalInput.price} />
                <small className="text-danger text-lowercase">{error.price ? error.price: '' }</small>
                    </div>
                    </div>

                    <div className="row">
                    <div className='form-group mb-3 col-sm-8 offset-2'>
                    <label className='mt-3'><span className="text-danger">* </span>Phone 1</label>
                    <input disabled  type="tel" name="phone1" pattern="[+][9][2][3][0-9]{9}" className=" form-control" readonly placeholder="+923[9]" value={rentalInput.phone1} />
                    </div>
                    </div>

                    <div className="row">
                    <div className='form-group mb-3 col-sm-8 offset-2'>
                    <label className='mt-3'><span className="text-danger">* </span>Phone 2</label>
                    <input  type="tel" name="phone2" onChange={handleInput} value={rentalInput.phone2} pattern="[+][9][2][3][0-9]{9}" className=" form-control" placeholder="+923[9]" />
                    <small className="text-danger text-lowercase">{error.phone2 ? error.phone2: '' }</small>  
                    </div>
                    </div>

                    <div className="row">
                    <div className='form-group mb-3 col-sm-8 offset-2'>
                    <label className='mt-3'><span className="text-danger">* </span>Email</label>
                    <input disabled type="email" className="form-control" name='email' readonly value={rentalInput.auth_email} />
                    </div>
                    </div>

                    <div className="row">
                    <div className='form-group mb-3 col-sm-8 offset-2'>
                    <label className='mt-3'><span className="text-danger">* </span>Add Image</label>
                    <input  type="file" name="image" onChange={handleImage}  className=" btn btn-info text-light form-control" />
                    <small className='text-warning text-lowercase'>jpg, png, jpeg (5 MB max)</small><br />
                    <small className="text-danger text-lowercase">{error.image ? error.image: '' }</small>
                    <img src={`http://localhost:8000/${rentalInput.image}`}  alt={rentalInput.image} defaultValue={rentalInput.image} width='200px' />
                    </div>
                    </div>
 
                </div>
                <div className="tab-pane fade text-success card-body border" id="other" role="tabpanel" aria-labelledby="other-tab">
                {/* Other Detail Filds _________________ */}
                <div className="row">
                    <div className='form-group mb-3 col-sm-8 offset-2'>
                    <label className='mt-3'>Add Keywords</label>
                    <input  type="text" name="keywords" onChange={handleInput} value={rentalInput.keywords} className="form-control" placeholder='keywords with space'/>
                    </div>
                    </div>

                    {/* General */}
                    <div className="text-danger col-sm-12 mt-3 offset-2">Basic Features</div>     
                    <div className="row">
                    <div className='form-group offset-2 col-sm-4'>
                    <label className='mt-3'>Rental Condition</label>
                    <input  type="text" name="condition" onChange={handleInput} value={rentalInput.condition} className="form-control" />
                    </div>
                    <div className='form-group col-sm-4'>
                    <label className='mt-3'>Rent Duration</label>
                    <input  type="text" name="duration" onChange={handleInput} value={rentalInput.duration} className="form-control" />
                    </div>
                    </div>
                    {/* Property */}
                    {property}
                    {/* Vehicles */}
                    {vehicles}
                    {/* Electronics */}
                    {electronics}
                </div>
                <button className="btn btn-info text-light mt-3 mb-4 float-end" type="submit">Update Listing</button>
                </div>
            </form>
        </div>
    )
}