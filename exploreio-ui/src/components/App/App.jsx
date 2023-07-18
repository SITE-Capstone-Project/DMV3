import "./App.css";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import Destinations from "../Destinations/Destinations";
import SearchBox from "../SearchBox/SearchBox";
import InfoCard from "../InfoCard/InfoCard";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        const fetchDestination = async () => {
            try{
                const response = await fetch("http://localhost:3001/exploreio/destinations");
                const responseJson = await response.json();
                setDestinations([...responseJson]);
                console.log(responseJson);
                console.log(typeof(responseJson));
                if (destinations != null) {
                    console.log(destinations)
                }
            } catch (error) {
                console.error(error);
            }
        }
        fetchDestination()
    }, [])

    return (
        <div>
            <BrowserRouter>
                <NavBar isLoggedIn={loggedIn} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/destinations" element={<Destinations destinations = {destinations}/>} />
                    <Route path="/test" element = {<InfoCard/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
