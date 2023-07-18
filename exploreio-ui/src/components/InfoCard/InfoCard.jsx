import "./InfoCard.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import FlightForm from "../FlightForm/FlightForm.jsx";
import Hotels from "../Hotels/Hotels";

const apiKEY = "AIzaSyCB-kma-hpj9XAX-cSDoecd36eiABcPGEw";
const string = "Located in California, it is the second-largest city in the United States and is renowned for the entertainment industry, including Hollywood, as well as its pleasant climate and beautiful beaches."

export default function InfoCard(){
    return(
        <div className="infocard">
            <img id = "background" src = {"https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg"}/>

            <div className = "intro-info">
                <div className = "dest-info">
                    <h1 className = "title"> Los Angeles, USA </h1>
                    <div className="loc-info">
                        <p>{string}</p>
                    </div>
                </div>
                <div className="map">
                    <iframe
                        width="550"
                        height="500"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=${apiKEY}&q=Los Angeles`}>
                    </iframe>
                </div>
            </div>

            <div className ="full-container">
                <div className="infoAndActivities">
                    <h2 className = "activities-title">Activities</h2>
                    <p>There are plenty of activities that you can do in <span id="cityname">Los Angeles!</span> </p> 
                    <p>Here are a few:</p>                    
                </div>

                <div className="flightsAndHotels">
                    <div className="hotels">
                        <Hotels/>
                    </div>
                    <div className="flights">
                        <FlightForm/>
                    </div>
                </div>
            </div>

        </div>
    );
}