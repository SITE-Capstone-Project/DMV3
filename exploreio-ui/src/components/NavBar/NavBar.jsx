import "./NavBar.css"
import React from "react"
import { useNavigate, Link } from "react-router-dom"
import logo from "../../assets/logo.png"

export default function NavBar({ isLoggedIn, setLoggedIn, setAppState }){
    const navigate = useNavigate()

    const signOut = async function() {
        setLoggedIn(false)
        localStorage.setItem("exploreio-token", null)
        setAppState({})
        navigate("/")
    }

    return(
        <nav className = "navbar">
            <img src = {logo}/>

            <div className ="other">
                {isLoggedIn?(
                    <div>
                    <Link className = "link" to = "/">
                    <button className = "signOut" onClick = {signOut}>Sign Out</button>
                    </Link>
                    <Link className = "link adjust" to = "/favorites">Favorites</Link>
                    </div>
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
                {/* <Link className = "link adjust" to = "/favorites">Favorites</Link> */}
                <Link className = "link adjust" to = "/destinations">Destinations</Link>
                <Link className = "link adjust" to = "/">Home</Link>
            </div>
        </nav>
    )
}