import "./DestinationCard.css";
import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

export default function DestinationCard({ id, name, rating, image }) {
  const formattedRating = rating.toFixed(1);

  return (
    <Link to={`/destinations/${id}`}>
      <div className="destinationCard">
        <img id="destimage" src={image} />
        <div className="titleRating">
          <div className="destinationTitle">
            <h3>{name}</h3>
          </div>
          <div className="rating">
            <p>{formattedRating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
