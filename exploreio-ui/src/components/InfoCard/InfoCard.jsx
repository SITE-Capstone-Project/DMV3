import "./InfoCard.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

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