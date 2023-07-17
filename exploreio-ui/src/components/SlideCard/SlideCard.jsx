import "./SlideCard.css"
import React from "react"
import { Link } from "react-router-dom"
import logo from "../../assets/logo.png"
import { Slide } from "@mui/material"

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