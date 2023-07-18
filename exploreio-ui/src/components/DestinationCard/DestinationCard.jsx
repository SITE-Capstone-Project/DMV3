import "./DestinationCard.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function DestinationCard({ id, name, rating, image }) {
  return (
    <Link to={`/destinations/${id}`}>
      <div className="destinationCard">
        <img id= "destimage" src={image} />
        <div className="titleRating">
          <div className="title">
            <h3>{name}</h3>
          </div>
          <div className="rating">
            <p>{rating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
