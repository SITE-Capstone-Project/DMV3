import "./NavBar.css"
import React from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/earthLogo.png"

export default function NavBar({isLoggedIn}){
    return(
        <nav className = "navbar">
            <img src = {logo}/>
            <Link className = "link" to = "/">Home</Link>
            <Link className = "link" to = "/destinations">Destinations</Link>
            <Link className = "link" to = "/packages">Packages</Link>
            {isLoggedIn?(
                <Link className = "link" to = "/">
                <button className = "signOut">Sign Out</button>
                </Link>
            ):(
            <div>
                <Link className = "link" to = "/login">
                <button className = "signIn">Sign In</button>
                </Link>
                <Link className = "link" to = "/register">
                <button className = "register">Register</button>
                </Link>
            </div>
            )}
        </nav>
    )
}