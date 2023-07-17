import "./DestinationCard.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function DestinationCard() {
  return (
    <div className="destinationCard">
      <img src={logo} />
      <div className="titleRating">
        <h2>Los Angeles</h2>
        <p>Rating: 3/5</p>
      </div>
    </div>
  );
}
