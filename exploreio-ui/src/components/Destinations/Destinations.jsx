import React, { useState, useEffect } from "react";
import SearchBox from "../SearchBox/SearchBox";
import DestinationContainer from "../DestinationContainer/DestinationContainer";
import Footer from "../Footer/Footer";
import { Container } from "react-bootstrap"; // Import Container from React Bootstrap

export default function Destinations({ destinations }) {
  const [filteredData, setFilteredData] = useState(destinations);

  useEffect(() => {
    setFilteredData(destinations);
  }, [destinations]);

  const handleFilter = (searchTerm, filterOptions) => {
    let filteredResults = destinations.filter((item) => {
      const nameMatch = item.name.toLowerCase().includes(searchTerm.toLowerCase());

      // Check if the rating is greater than or equal to the selected filter option
      const ratingMatch = item.rating >= parseFloat(filterOptions);

      return nameMatch && (!filterOptions || ratingMatch);
    });

    setFilteredData(filteredResults);
  };

  return (
    <div>
      <Container> {/* Wrap the content in a Container from React Bootstrap */}
        <h1>Destinations</h1>
        <SearchBox data={filteredData} onFilter={handleFilter} />
        <DestinationContainer destinations={filteredData} />
        <Footer />
      </Container>
    </div>
  );
}