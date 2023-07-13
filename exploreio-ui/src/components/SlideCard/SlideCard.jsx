import "./SlideCard.css"
import React from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"

export default function SlideCard(){
    return(
        <div className="slidecardpage">
        <div className="slidingContainer">
            <div className="slidecard">
                <img src = {logo}/>
                <div className="titleRating">
                    <h2>Los Angeles</h2>
                    <p>Rating: 3/5</p>
                </div>
            </div>

            <div className="slidecard">
                <img src = {logo}/>
                <div className="titleRating">
                    <h2>New York</h2>
                    <p>Rating: 3.6/5</p>
                </div>
            </div>

            <div className="slidecard">
                <img src = {logo}/>
                <div className="titleRating">
                    <h2>Washington, DC</h2>
                    <p>Rating: 3/5</p>
                </div>
            </div>

            <div className="slidecard">
                <img src = {logo}/>
                <div className="titleRating">
                    <h2>Nashville, TN</h2>
                    <p>Rating: 3.7/5</p>
                </div>
            </div>

            <div className="slidecard">
                <img src = {logo}/>
                <div className="titleRating">
                    <h2>San Francisco, CA</h2>
                    <p>Rating: 4/5</p>
                </div>
            </div>

            <div className="slidecard">
                <img src = {logo}/>
                <div className="titleRating">
                    <h2>Silver Spring, MD</h2>
                    <p>Rating: 3/5</p>
                </div>
            </div>

            <div className="slidecard">
                <img src = {logo}/>
                <div className="titleRating">
                    <h2>Hello, World</h2>
                    <p>Rating: 3/5</p>
                </div>
            </div>
        </div>
        </div>
    )
}