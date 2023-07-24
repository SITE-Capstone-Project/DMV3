import "./InfoCard.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import FlightForm from "../FlightForm/FlightForm.jsx";
import Hotels from "../Hotels/Hotels";
import Activities from "../Activities/Activities";

const apiKEY = "";

export default function InfoCard(){
    const[map, setMap] = useState(false)
    const[destination, setDestination] = useState([])

    const findInfo = async () => {
        const response = await fetch("http://localhost:3001/exploreio/destinations/2");
        const responseJson = await response.json();
        setDestination(responseJson)
    }

    useEffect(() => {
        findInfo()
    }, [])

    const loadMap = async () => {
        setMap(true)
    }

    setTimeout(loadMap, 2000)

    return(
        <div className="infocard">
            <img id = "background" src = {destination?.destinationInfo?.back_url}/>

            <div className = "intro-info">
                <div className = "dest-info">
                    <h1 className = "destination-title"> {destination?.destinationInfo?.name} </h1>
                    <div className="loc-info">
                        <p>{destination?.destinationInfo?.description}</p>
                    </div>
                </div>
                <div className="map">
                    {!map || destination?.length == 0 ? ( 
                        <div className = "loading"> 
                            <img  src={"https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"}/>
                        </div>
                    ) : ( <div></div> )}
                    <iframe
                            width="550"
                            height="500"
                            referrerPolicy="no-referrer-when-downgrade"
                            src={`https://www.google.com/maps/embed/v1/place?key=${apiKEY}&q=${destination?.destinationInfo?.name}`}>
                    </iframe>
                </div>
            </div>

            <div className ="full-container">
                <div className="infoAndActivities">
                    <Activities activities = {destination?.destinationActivities}/>
                </div>
                <div className="flightsAndHotels">
                    <div className="hotels">
                        <Hotels hotels = {destination?.hotels?.data}/>
                    </div>
                    <div className="flights">
                        <FlightForm/>
                    </div>
                </div>
            </div>

        </div>
    );
}