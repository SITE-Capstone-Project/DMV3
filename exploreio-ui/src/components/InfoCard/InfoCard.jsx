import "./InfoCard.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

//Los Angeles
//4
//"Located in California, it is the second-largest city in the United States and is renowned for the entertainment industry, including Hollywood, as well as its pleasant climate and beautiful beaches."
//https://images.pexels.com/photos/3006222/pexels-photo-3006222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1
//https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg
//NA
//USA
//LAX

export default function InfoCard(){
    return(
        <div className="infocard">
            <h1>Los Angeles</h1>
            <div className="infoAndActivities">
                <div className="info">
                    <h2>Info</h2>
                    <p>Info goes here</p>
                </div>
                <div className="activities">
                    <h2>Activities</h2>
                    <p>Activities go here</p>
                </div>
            </div>
            <div className="flightsAndHotels">
                <div className="map">
                    <img src = {logo}/>
                </div>
                <div className="flights">
                    <h2>Info</h2>
                    <p>Info goes here</p>
                </div>
                <div className="hotels">
                    <h2>Activities</h2>
                    <p>Activities go here</p>
                </div>
            </div>
        </div>
    );
}