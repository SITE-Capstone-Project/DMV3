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
};

export default function DestinationContainer({destinations}) {
  const [showMore, setShowMore] = useState(false);

  const destinationsByRegion = {};
  // Loop through each destination in the 'destinations' array
  for (const destination of destinations) {
  // Check region property of current destination exists 
    if (!destinationsByRegion[destination.region]) {
  // If the region doesn't exist, initialize it as an empty array
      destinationsByRegion[destination.region] = [];
    }
  // Push the current destination into the array
    destinationsByRegion[destination.region].push(destination);
  }

  return (
    <div className="destinationContainer">
      {Object.entries(destinationsByRegion).map(([region, destinations]) => (
        <div key={region} className="regionContainer">
          {/* Display full region name based on region abbreviation */}
          <h2>{regionAbbreviationsToFullNames[region]}</h2>
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
        {/* <div className="container2">
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
          <DestinationCard />
        </div> */}
      <div className="showMoreButton">
        <button onClick={() => setShowMore(!showMore)}>Show More</button>
      </div>
    </div>
  );
}
