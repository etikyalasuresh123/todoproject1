import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add_details(){

  const nav =  useNavigate();

const [details, setdetails] =    useState({
        Name:'',
        Contact:'',
        Email: '',
        Address: '',
        
    })

    const Detailssubmit = (e) =>{
        e.preventDefault();
        axios.post('https://todo-fb26a-default-rtdb.firebaseio.com/details.json', details).then(r1=>{
            alert("details added sucessfully");
            nav('/get_details')
        })
    }



    return(
        <>
        <div className="col-6 offset-3">
            
             <center><h2><b>Details</b></h2></center>
             <form onSubmit={Detailssubmit}>
                <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Enter Your Name</label>
                <input type="text" name="Name" onChange={(e)=>setdetails({...details,[e.target.name]:[e.target.value]})} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Contact Number</label>
                <input type="tel" name="Contact" onChange={(e)=>setdetails({...details,[e.target.name]:[e.target.value]})} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                
            </div>

             <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email</label>
                <input type="tel" name="Email" onChange={(e)=>setdetails({...details,[e.target.name]:[e.target.value]})} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                
            </div>

             <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Address</label>
                <input type="tel" name="Address" onChange={(e)=>setdetails({...details,[e.target.name]:[e.target.value]})} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                
            </div>
              
            <button type="submit" class="btn btn-primary">Submit</button>

             </form>
        
        </div>
            
        
    

       
        </>
    )
}

export default Add_details;