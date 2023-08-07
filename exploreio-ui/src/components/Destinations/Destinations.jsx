import "./Destinations.css"
import React, { useState, useEffect } from "react";
import SearchBox from "../SearchBox/SearchBox";
import DestinationContainer from "../DestinationContainer/DestinationContainer";
import Footer from "../Footer/Footer";
import { Container } from "react-bootstrap";

export default function Destinations({ destinations }) {
  const [filteredData, setFilteredData] = useState(destinations);
  const [filterRating, setFilterRating] = useState("");
  const [filterCost, setFilterCost] = useState(""); // Add state for filtering by cost
  const [showNoResultsMessage, setShowNoResultsMessage] = useState(false); // State for displaying no results message

  useEffect(() => {
    setFilteredData(destinations);
  }, [destinations]);

  const handleFilter = (searchTerm, filterRating, filterCost) => {
    let filteredResults = destinations.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Check if the rating is greater than or equal to the selected filter option
      const ratingMatch = item.rating >= parseFloat(filterRating);

      // Check if the cost_level matches the selected filter option
      const costMatch = !filterCost || item.cost_level === filterCost;

      return nameMatch && (!filterRating || ratingMatch) && (!filterCost || costMatch);
    });

    setFilteredData(filteredResults);
    setShowNoResultsMessage(filteredResults.length === 0); // Update no results message state

  };

  return (
    <div>
      <Container>
        <h1 className="clearing"> Destinations </h1>
        <SearchBox
          data={filteredData}
          onFilter={(searchTerm, filterRating, filterCost) =>
            handleFilter(searchTerm, filterRating, filterCost)
          }
        />
        {filteredData.length === 0 && showNoResultsMessage ? (
          <p className="no-results-message">Oops - please try again!</p>
        ) : (
          <DestinationContainer destinations={filteredData} />
        )}
      </Container>
      <Footer />
    </div>
  );
}