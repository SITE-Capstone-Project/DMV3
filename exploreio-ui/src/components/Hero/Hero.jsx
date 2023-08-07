import * as React from 'react';
import "./Hero.css";
import logo from "../../assets/logo.png"

export default function Hero() {
  return (
    <div className = "hero-background">
      <div className="hero">
        <div className="content">
          <div className="title">
            <h1>Exploreio</h1>
            <p>The gateway to global adventure </p>
          </div>
          <div className="blurb">
            <img src = {logo}/>
          </div>
        </div>
      </div>
    </div>
  );
}
