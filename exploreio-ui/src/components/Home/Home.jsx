import "./Home.css"
import React from "react"
import Hero from "../Hero/Hero";
// import Footer from "../Footer/Footer";
//"https://image.cnbcfm.com/api/v1/image/107178919-1673854215895-gettyimages-669463000-shutterstock_621020393.jpeg?v=1674003106"
//https://images.unsplash.com/photo-1515859005217-8a1f08870f59?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=800&q=60 

export default function Home() {
    return (
        <div>
            <div className="media">

                <img id = "background-image" src=
                "https://image.cnbcfm.com/api/v1/image/107178919-1673854215895-gettyimages-669463000-shutterstock_621020393.jpeg?v=1674003106" 
                alt="front" />
                
                <div className="topPage">
                    <Hero />
                </div>
            </div>
        </div>
    );
}
