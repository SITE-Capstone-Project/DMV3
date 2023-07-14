import "./SlideCard.css"
import React from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"

export default function SlideCard(){
    return(
        <div className = "sliding-card">
            <div className="slidecard">
                <img src = {logo}/>
                <div className="titleRating">
                    <h2>Los Angeles</h2>
                    <p>Rating: 3/5</p>
                </div>
            </div>
        </div>
    )
}