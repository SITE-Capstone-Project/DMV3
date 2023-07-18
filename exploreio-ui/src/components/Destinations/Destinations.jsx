import React, { useState, useEffect } from "react";
import SearchBox from "../SearchBox/SearchBox";
import DestinationContainer from "../DestinationContainer/DestinationContainer";

export default function Destinations({ destinations }) {
  // Set the initial state of filteredData to destinations
  const [filteredData, setFilteredData] = useState(destinations);

  // Update filteredData when destinations prop changes
  useEffect(() => {
    setFilteredData(destinations);
  }, [destinations]);

  const handleFilter = (searchTerm, filterOptions) => {
    let filteredResults = destinations.filter((item) => {
      // Filter by name (search term)
      const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      // If no filter option selected or filter option is 'rating', include the item in the results
      const ratingMatch = !filterOptions || filterOptions === "rating";
      
      // If filter option is 'region', include the item in the results only if it has a region property
      const regionMatch = filterOptions === "region" && item.region;

      return nameMatch && (ratingMatch || regionMatch);
    });

    setFilteredData(filteredResults);
  };

  return (
    <div>
      <h1>Destinations</h1>
      <SearchBox data={filteredData} onFilter={handleFilter} />

      <DestinationContainer destinations={filteredData} />
    </div>
  );
}
