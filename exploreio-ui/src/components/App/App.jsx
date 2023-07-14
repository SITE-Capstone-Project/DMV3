import "./App.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "../NavBar/NavBar";
import Home from "../Home/Home";
import Destinations from "../Destinations/Destinations";
import SearchBox from "../SearchBox/SearchBox";

export default function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <div>
            <BrowserRouter>
                <NavBar isLoggedIn={loggedIn} />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/destinations" element={<Destinations />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

