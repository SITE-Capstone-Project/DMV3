import "./DestinationContainer.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import DestinationCard from "../DestinationCard/DestinationCard";

// Mapping object to convert region abbreviations to full names
const regionAbbreviationsToFullNames = {
  NA: "North America",
  SA: "South America",
  EU: "Europe",
  AS: "Asia",
  AF: "Africa",
  OC: "Oceania",
  CA: "Caribbean"
};

export default function DestinationContainer({destinations}) {
  // const [showMore, setShowMore] = useState(false);

  const destinationsByRegion = {};
  for (const destination of destinations) {
    if (!destinationsByRegion[destination.region]) {
      destinationsByRegion[destination.region] = [];
    }
    destinationsByRegion[destination.region].push(destination);
  }

  return (
    <div className="destinationContainer">
      {Object.entries(destinationsByRegion).map(([region, destinations]) => (
        <div key={region} className="regionContainer">
          {/* Display full region name based on region abbreviation */}
          <h2 id = "region-split">{regionAbbreviationsToFullNames[region]}</h2>
          <div className="container1">
            {destinations.map((element, index) => (
              <DestinationCard
                key={element.destinationid + index}
                id={element.destinationid}
                name={element.name}
                rating={element.rating}
                image={element.image_url}
              />
            ))}
          </div>
        </div>
      ))}

      {/* <div className="showMoreButton">
        <button onClick={() => setShowMore(!showMore)}>Show More</button>
      </div> */}
    </div>
  );
}
