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
      
      return nameMatch;
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
