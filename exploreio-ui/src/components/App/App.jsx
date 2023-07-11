import "./App.css"
import React from "react"
import { useState, useEffect } from "react"
import NavBar from "../NavBar/NavBar"
import Home from "../Home/Home"
import { ReactDOM } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

export default function App(){
    const [loggedIn, setLoggedIn] = useState(false)
    return(
        <div>
            <BrowserRouter>
                <NavBar isLoggedIn={loggedIn}/>
                <Routes>
                    <Route path = "/" element = {<Home/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    )
}
    
