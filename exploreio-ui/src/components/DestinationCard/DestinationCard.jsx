import "./DestinationCard.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function DestinationCard({id, name, rating, image}) {
  return (
    <Link to = {`/destinations/${id}`}>
      <div className="destinationCard">
        <img src={image} />
        <div className="titleRating">
          <h2>{name}</h2>
          <p>{rating}</p>
        </div>
      </div>
    </Link>
  );
}
