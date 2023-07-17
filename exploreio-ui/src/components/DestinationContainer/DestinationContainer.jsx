import "./DestinationContainer.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import DestinationCard from "../DestinationCard/DestinationCard";

export default function DestinationContainer() {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="destinationContainer">
        <div className="container1">
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
        </div>
        <div className="container2">
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
        </div>
      <div className="showMoreButton">
        <button onClick={() => setShowMore(!showMore)}>Show More</button>
      </div>
    </div>
  );
}
