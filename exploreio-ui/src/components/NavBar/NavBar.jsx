import "./NavBar.css"
import React from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"

export default function NavBar({isLoggedIn}){
    return(
        <nav className = "navbar">
            <img src = {logo}/>

            <div className ="other">
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
                <Link className = "link adjust" to = "/packages">Packages</Link>
                <Link className = "link adjust" to = "/destinations">Destinations</Link>
                <Link className = "link adjust" to = "/">Home</Link>
            </div>
        </nav>
    )
}