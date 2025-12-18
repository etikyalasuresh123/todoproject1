import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Add_details from "./Add_details";
import Navbar from "./Navbar";
import Get_details from "./Get_details";



function Details_index(){
    return(
        <>
        <div>
            <BrowserRouter>
            <Navbar />
            
            <Routes>
                <Route path={'/'} element={<Add_details />} />
                <Route path={'/get_details'} element={<Get_details />} />
               
            </Routes>
            </BrowserRouter>
        </div>
        </>
    )
}

export default Details_index;