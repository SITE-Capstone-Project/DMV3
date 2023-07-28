import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import Destinations from "../Destinations/Destinations";
import InfoCard from "../InfoCard/InfoCard";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Favorites from "../Favorites/Favorites";
import { getDestinations, getUser } from "../../utilities/apiClient"

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [appState, setAppState] = useState({})
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestination = async () => {
            try{
                const response = await getDestinations()
                setDestinations([...response]);
            } catch (error) {
                console.error(error);
            }
        }
        const grabUserData = async () => {
            const user = await getUser()
            if (user) {
                setLoggedIn(true)
                setAppState(user)
            } else {
                setLoggedIn(false)
                setAppState({})
            }
        }
        fetchDestination()
        grabUserData()
    }, [])

    return (
        <div>
            <BrowserRouter>
                <NavBar isLoggedIn = {loggedIn} 
                setLoggedIn = {setLoggedIn}
                setAppState = {setAppState}/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/destinations" element={<Destinations destinations = {destinations}/>} />
                    <Route path="/destinations/:id" element = {<InfoCard isLoggedIn={loggedIn}/>}/>
                    <Route path="/login" element={<Login 
                    setLoggedIn = {setLoggedIn}
                    setAppState= {setAppState}/>} />
                    <Route path="/register" element={<Register 
                    setLoggedIn = {setLoggedIn}
                    setAppState= {setAppState}/>} />
                    <Route path="/favorites" element={<Favorites
                    appState = {appState}
                    isLoggedIn={loggedIn}/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
