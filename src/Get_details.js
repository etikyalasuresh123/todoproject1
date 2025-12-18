import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import axios from "axios";


function Get_details(){

    const [details, setdetails] = useState({})
    const [editingId, setEditingId] = useState(null); 
    const [editFormData, setEditFormData] = useState({
        Name: "",
        Email: "",
        Contact: "",
        Address: ""
    });

    useEffect(()=>{
         axios.get('https://todo-fb26a-default-rtdb.firebaseio.com/details.json' ).then(r1=>{
        //console.log(r1);
        setdetails(r1.data || {})
    })
        
    },[])
   
    


    let Available_details=[]

    console.log("details :",  details)
    for(let x of Object.keys(details)){
        Available_details.push({
            'id':x,
            'Name' : details[x].Name, 
            'Email' : details[x].Email, 
            'Contact' : details[x].Contact, 
            'Address' : details[x].Address, 
           
        
        })             
    }

        console.log('available_details :', Available_details);




        const deleteDetail = (id) =>{
            axios.delete(`https://todo-fb26a-default-rtdb.firebaseio.com/details/${id}.json`).then(()=>{
                setdetails(prevDetails => {
                    const newDetails = { ...prevDetails };
                    delete newDetails[id]; 
                    return newDetails;
                });
           
       
            });
     
        }

        const handleEditClick = (detail) => {
            setEditingId(detail.id);
            setEditFormData({
            Name: detail.Name,
            Email: detail.Email,
            Contact: detail.Contact,
            Address: detail.Address
        });
    }


        const handleSaveClick = (id) => {
            axios.put(`https://todo-fb26a-default-rtdb.firebaseio.com/details/${id}.json`, editFormData).then(() => {
                setdetails(prevDetails => ({...prevDetails, [id]: editFormData }));
                setEditingId(null);
            });
        }

          const handleCancelClick = () => {
            setEditingId(null);
        }



    return(
        <>
           <div className= "container mt-5">
            <center><u><h5><b>details</b></h5></u></center>
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact</th>
                    <th scope="col">Address</th>
                    <th>Action</th>
                    </tr>
                </thead>
            <tbody>
                {
                    Available_details.map((x,index)=><tr key={x.id}>
                        <th scope="row">{index+1}</th>
                        <td>{ editingId === x.id ? (
                            <input type="text" name="Name" value={editFormData.Name} onChange={(e)=>setEditFormData({...editFormData,[e.target.name]:[e.target.value]})} />
                                    ) : x.Name}</td>

                        <td>{ editingId === x.id ? (
                            <input type="text" name="Email" value={editFormData.Email} onChange={(e)=>setEditFormData({...editFormData,[e.target.name]:[e.target.value]})} />
                                    ) : x.Email}</td>

                        <td>{ editingId === x.id ? (
                            <input type="text" name="Contact" value={editFormData.Contact} onChange={(e)=>setEditFormData({...editFormData,[e.target.name]:[e.target.value]})} />
                                    ) : x.Contact}</td>

                        <td>{ editingId === x.id ? (
                            <input type="text" name="Address" value={editFormData.Address} onChange={(e)=>setEditFormData({...editFormData,[e.target.name]:[e.target.value]})} />
                                    ) : x.Address}</td>

                        <td>
                            {editingId === x.id ? (
                                <>

                                    <button className="btn btn-success btn-sm me-2" onClick={() => handleSaveClick(x.id)}>Save</button>
                                    <button className="btn btn-secondary btn-sm" onClick={handleCancelClick}>Cancel</button>
                                </>
                                    ) : (
                                <>
                                    <button className="btn btn-warning btn-sm me-2" onClick={() => handleEditClick(x)}>Edit</button>
                                    <button className="btn btn-danger btn-sm" onClick={() => deleteDetail(x.id)}>Delete</button>
                                </>
                                    )}
                                </td>
                        
                    
                        
                    </tr>
                    )
                }
            </tbody>
            </table>
        </div>
        
        </>
    )
}


export default Get_details;