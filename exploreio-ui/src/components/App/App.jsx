import "./App.css"
import React from "react"
import { useState, useEffect } from "react"
import NavBar from "../NavBar/NavBar"
import { ReactDOM } from "react"
import { BrowserRouter } from "react-router-dom"

export default function App () {
    const [loggedIn, setLoggedIn] = useState(false)

    return(
        <div className="app">
            <BrowserRouter>
                <NavBar isLoggedIn={loggedIn}/>
            </BrowserRouter>
        </div>
    )
}
