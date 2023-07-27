import "./Destinations.css";
import React, { useState, useEffect } from "react";
import SearchBox from "../SearchBox/SearchBox";
import DestinationContainer from "../DestinationContainer/DestinationContainer";
import Footer from "../Footer/Footer";

export default function Destinations({ destinations }) {
  const [filteredData, setFilteredData] = useState(destinations);

  useEffect(() => {
    setFilteredData(destinations);
  }, [destinations]);

  const handleFilter = (searchTerm) => {
    let filteredResults = destinations.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

      return nameMatch;
    });

    setFilteredData(filteredResults);
  };

  return (
    <div>
      <div className="clearing">
          <h1>Destinations</h1>
        <SearchBox data={filteredData} onFilter={handleFilter} />

        <DestinationContainer destinations={filteredData} />
      </div>
      <Footer/>
    </div>
  );
}