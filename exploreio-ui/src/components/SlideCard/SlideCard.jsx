import "./SlideCard.css"
import React from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import { Slide } from "@mui/material"

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

// export const Carousel = () => {
//     return (
//         <div className="carouselslide" data-ride="carousel">
//             <div className="carousel-inner">
//                 <div className="carousel-item active">
//                     <SlideCard />
//                 </div>
//                 <div className="carousel-item">
//                     <SlideCard />
//                 </div>
//                 <div className="carousel-item">
//                     <SlideCard />
//                 </div>
//             </div>

//             <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
//                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
//                     <span className="sr-only">Previous</span>
//             </a>Name
//             <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
//                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
//                     <span className="sr-only">Next</span>
//             </a>
//         </div>
//     )
// }

// const SlideCard = () => {
//     return (
//         <div className='slide-card'>
//             <div className="slidecard">
//                  <img src = {logo}/>
//                  <div className="titleRating">
//                      <h2>Los Angeles</h2>
//                      <p>Rating: 3/5</p>
//                 </div>
//              </div>
//         </div>
//     )
// }