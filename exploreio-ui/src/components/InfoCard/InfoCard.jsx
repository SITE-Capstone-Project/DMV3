import "./InfoCard.css";
import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import FlightForm from "../FlightForm/FlightForm.jsx";
import Hotels from "../Hotels/Hotels";
import Activities from "../Activities/Activities";
import Footer from "../Footer/Footer";
import { getDestination } from "../../utilities/apiClient";

const apiKey = "AIzaSyDtniF-184Xg1wRRhQwY4xVXdjH8cW4dqI";

export default function InfoCard(){
    const[map, setMap] = useState(false)
    const[isFetching, setIsFetching] = useState(false)
    const[destination, setDestination] = useState([])

    const params = useParams()
    const id = params.id

    const findInfo = async () => {
        try {
            setIsFetching(true)
            const response = await getDestination(id);
            setDestination(response)
        } catch (error) {
            console.log(error)
        } finally {
            setIsFetching(false)
        }
    }

    const loadMap = async () => {
        setMap(true)
    }

    useEffect(() => {
        window.scrollTo(0,0)
        findInfo()
        setTimeout(loadMap, 3000)
    }, [])

    setTimeout(loadMap, 3000)

    return(
        <div className="infocard">
            <img id = "background" src = {destination?.destinationInfo?.back_url}/>

            <div className = "intro-info">
                <div className = "dest-info">
                    <h1 className = "destination-title"> 
                        {destination?.destinationInfo?.name} 
                        <span id="cost-level"> 
                            {destination?.destinationInfo?.cost_level} 
                        </span> 
                    </h1>
                    <div className="loc-info">
                        <p>{destination?.destinationInfo?.description}</p>
                    </div>
                    {!isFetching ? (
                        <button className = "favorite-button"> 
                            <img 
                                id="favorite-image" 
                                src = "https://png.pngtree.com/png-vector/20220428/ourmid/pngtree-smooth-glossy-heart-vector-file-ai-and-png-png-image_4557871.png"/>
                            <p>Favorite</p>
                        </button>
                    ) : (
                        <div></div>
                    )}
                </div>
                <div className="map">
                    {!map || isFetching ? (
                        <div className = "loading">
                            <img src={"https://i.gifer.com/origin/34/34338d26023e5515f6cc8969aa027bca_w200.gif"}/>
                        </div>
                    ) : ( <div></div> )}
                    <iframe
                        width="550"
                        height="500"
                        referrerPolicy="no-referrer-when-downgrade"
                        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${destination?.destinationInfo?.name}`}>
                    </iframe>
                </div>
            </div>

            <div className ="full-container">
                <div className="infoAndActivities">
                    <Activities activities = {destination?.destinationActivities}/>
                </div>
                <div className="hotels-section">
                    <div className="hotels">
                        <Hotels hotels = {destination?.hotels?.data}/>
                    </div>
                </div>
                <div className = "flights-section">
                    <div className="flights">
                        <FlightForm area = {destination?.destinationInfo?.name} isFetching = {isFetching}/>
                    </div>
                </div>
            </div>

            <div>
                <Footer/>
            </div>

        </div>
    );
}