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

const apiKEY = "AIzaSyCB-kma-hpj9XAX-cSDoecd36eiABcPGEw";
const string = "Located in California, it is the second-largest city in the United States and is renowned for the entertainment industry, including Hollywood, as well as its pleasant climate and beautiful beaches."

export default function InfoCard(){
    return(
        <div className="infocard">
            <img id = "background" src = {"https://images.pexels.com/photos/2525903/pexels-photo-2525903.jpeg"}/>

            <div className = "intro-info">
                <div className = "dest-info">
                    <h1 className = "title">Los Angeles, USA</h1>
                    <div className="loc-info">
                        <p>{string}</p>
                    </div>
                </div>
                <div className="map">
                    <iframe
                        width="550"
                        height="500"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=${apiKEY}&q=Los Angeles`}>
                    </iframe>
                </div>
            </div>

            <div className ="full-container">
                <div className="infoAndActivities">
                    <h2>Activities</h2>
                    <p>Flight goes here</p>                    
                </div>

                <div className="flightsAndHotels">

                    <div className="flights">
                        <h2>Flights</h2>
                        <p>Flight goes here</p>
                    </div>

                    <div className="hotels">
                        <h2>Hotels</h2>
                        <p>Hotels go here</p>
                    </div>

                </div>
            </div>

        </div>
    );
}