import React, { useState } from "react";

export default function SearchBox({ onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState(""); // Add state for filtering options

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onFilter(event.target.value, filterOptions); // Pass search term and filter options to the onFilter function
  };

  const handleFilterChange = (event) => {
    setFilterOptions(event.target.value);
    onFilter(searchTerm, event.target.value); // Pass search term and filter options to the onFilter function
  };

  return (
    <div className="search">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />

      <select value={filterOptions} onChange={handleFilterChange}>
        <option value="">Filter by rating</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
        <option value="5">5</option>
      </select>
    </div>
  );
}
