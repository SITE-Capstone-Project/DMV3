import "./Home.css";
import React from "react";
import Hero from "../Hero/Hero";
import SlideCard from "../SlideCard/SlideCard";
import SlideCard2 from "../SlideCard/SlideCard2";
import SlideCard3 from "../SlideCard/SlideCard3";
import vid from "../../assets/background-vid7.mp4"
import Footer from "../Footer/Footer";

export default function Home() {
  return (
    <div>
      <div className="home">
        <video id="background-image" playsInline autoPlay muted loop>
          <source src={vid} type="video/webm"/>
        </video>

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
