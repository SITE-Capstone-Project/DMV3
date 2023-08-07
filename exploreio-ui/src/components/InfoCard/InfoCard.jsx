import "./InfoCard.css";
import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import FlightForm from "../FlightForm/FlightForm.jsx";
import Hotels from "../Hotels/Hotels";
import Activities from "../Activities/Activities";
import Footer from "../Footer/Footer";
import { getDestination, addFavorites, deleteFavorites, getFavorites } from "../../utilities/apiClient";
import FunFacts from "../FunFacts/FunFacts";

const apiKey = "AIzaSyDtniF-184Xg1wRRhQwY4xVXdjH8cW4dqI";

export default function InfoCard({ isLoggedIn }){
    const[map, setMap] = useState(false)
    const[isFetching, setIsFetching] = useState(false)
    const[destination, setDestination] = useState([])
    const[favorite, setFavorite] = useState(false)
    const[loadedFavorites, setLoadedFavorites] = useState([])

    const params = useParams()
    const id = params.id

    const loadMap = async () => {
        setMap(true)
    }

    useEffect(() => {
        const findInfo = async () => {
            try {
                setIsFetching(true)
                await getDestination(id).then((res) => {
                    setDestination(res)
                })
            } catch (error) {
                console.log(error)
            } finally {
                setIsFetching(false)
            }
        }
        window.scrollTo(0,0)
        findInfo()
        setTimeout(loadMap, 3000)
    }, [])

    const canFavoriteDest = async (destination) => {
        try {
            let favorited = true
            const response = await getFavorites()

            for (let i = 0; i < response?.length; i++) {
                if (response[i].destination?.destinationid === destination) {
                    setFavorite(false)
                    favorited = false
                    break;
                }                
            }

            if (favorited) {
                setFavorite(true)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const favoriteDestination = async () => {
        try {
            const body = destination?.destinationInfo
            const response = await addFavorites(body)
            setFavorite(false)
            window.location.reload()
            return response
        } catch (error) {
            console.log(error)
        }
    }

    const deleteFavoriteDestination = async () => {
        try {
            const body = {name: destination?.destinationInfo?.name}
            const response = await deleteFavorites(body)
            setFavorite(true)
            window.location.reload()
            return response
        } catch (error) {
            console.log(error)
        }       
    }


    useEffect(() => {
        canFavoriteDest(destination?.destinationInfo?.destinationid)

        /* Loading the user's favorites */
        let favorites = undefined
        const loadFavorites = async () => {
            favorites = await getFavorites()
            setLoadedFavorites(favorites)
            return favorites
        }
        loadFavorites()

    }, [destination])

    setTimeout(loadMap, 3000)

    return(
        <div>
        <div className="infocard">
            <img id = "background" src = {destination?.destinationInfo?.back_url}/>

            <div className = "intro-info">
                <div className = "dest-info">
                    <h1 className = "destination-title"> 
                        {destination?.destinationInfo?.name} 
                    </h1>
                    <div className="loc-info">
                        <p>{destination?.destinationInfo?.description}</p>
                    </div>
                    {!isFetching ? (
                        <div>
                            <span id="cost-level"> 
                                <p> Price Level: </p> {destination?.destinationInfo?.cost_level} 
                            </span>

                            {isLoggedIn ? (
                                favorite ? (
                                    <button className = "favorite-button" onClick={favoriteDestination}> 
                                        <img 
                                            id="favorite-image" 
                                            src = "https://png.pngtree.com/png-vector/20220428/ourmid/pngtree-smooth-glossy-heart-vector-file-ai-and-png-png-image_4557871.png"/>
                                        <p>Favorite</p>
                                    </button>
                                ) : (
                                    <button className = "favorite-button" onClick={deleteFavoriteDestination}> 
                                        <img
                                            id="favorite-image" 
                                            src = "https://png.pngtree.com/png-vector/20220428/ourmid/pngtree-smooth-glossy-heart-vector-file-ai-and-png-png-image_4557871.png"/>
                                        <p>Favorited</p>
                                    </button>
                                )
                            ) : (
                                <button className = "favorite-button" disabled> 
                                    <img 
                                        id="favorite-image" 
                                        src = "https://png.pngtree.com/png-vector/20220428/ourmid/pngtree-smooth-glossy-heart-vector-file-ai-and-png-png-image_4557871.png"/>
                                    <p>Log In to Favorite</p>
                                </button>
                            )}

                        </div>

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
                        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${destination?.destinationInfo?.name}, ${destination?.destinationInfo?.country}`}>
                    </iframe>
                </div>
            </div>

            <div className ="full-container">
                <div className="infoAndActivities">
                    <Activities
                    destinationid = {destination?.destinationInfo?.destinationid} 
                    activities = {destination?.destinationActivities}
                    favorite = {favorite}
                    isLoggedIn = {isLoggedIn}
                    loadedFavorites = {loadedFavorites}/>
                </div>
                <div className="hotels-section">
                    <div className="hotels">
                        <Hotels
                        hotels = {destination?.hotels?.data}
                        destinationid = {destination?.destinationInfo?.destinationid} 
                        favorite = {favorite}
                        isLoggedIn = {isLoggedIn}
                        loadedFavorites = {loadedFavorites}
                        />
                    </div>
                </div>
                <div className = "flights-section">
                    <div>
                    <div className="flights">
                        <FlightForm area = {destination?.destinationInfo?.name} 
                        isFetching = {isFetching}
                        destinationIATA = {destination?.destinationInfo?.airlines}/>
                    </div>
                    <div className="flights">
                        <FunFacts facts = {destination?.funFacts}/>
                    </div>
                    </div>
                </div>
            </div>
        </div>
            <Footer/>
        </div>
    );
}