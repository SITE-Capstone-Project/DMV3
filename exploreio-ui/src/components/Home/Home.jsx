import "./Home.css"
import React from "react"
import Hero from "../Hero/Hero";
import SlideCard from "../SlideCard/SlideCard";
import SlideCard2 from "../SlideCard/SlideCard2";
import SlideCard3 from "../SlideCard/SlideCard3";
import Footer from "../Footer/Footer";

export default function Home() {
    return (
        <div>
            <div className="home">
                <img id = "background-image" src=
                "https://pixabay.com/get/g64a912660b8b8ba9331b01a9b9aba18ad033a6acf8a20a7740309a2401d9e8f67d026a1c44954503968bb048aa7a5fe33e7ae63feff9ea7c44eed49c44a799ce_1920.jpg" 
                alt="front" />     
                <div className="topPage">
                    <Hero />
                </div>
      
                <div className="midPage">
                    <SlideCard />
                    <br></br>
                    <br></br>
                    <SlideCard2 />
                    <br></br>
                    <br></br>
                    <SlideCard3 />
                </div>
      
                <div className="bottomPage">
                    <Footer />
                </div>
      
            </div>
        </div>
    );
}
