import "./Home.css"
import React from "react"
import Hero from "../Hero/Hero";
// import Footer from "../Footer/Footer";

export default function Home() {
    return (
        <div>
            <div className="media">
                <img src="https://image.cnbcfm.com/api/v1/image/107178919-1673854215895-gettyimages-669463000-shutterstock_621020393.jpeg?v=1674003106" alt="front" />
            </div>
            <div className="topPage">
                <Hero />
            </div>
        </div>
    );
}
