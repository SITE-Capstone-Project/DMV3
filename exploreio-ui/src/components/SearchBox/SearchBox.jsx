import "./SearchBox.css"
import React, { useState } from "react";

export default function SearchBox({ data, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRating, setFilterRating] = useState("");
  const [filterCost, setFilterCost] = useState(""); 

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onFilter(event.target.value, filterRating, filterCost); 
  };

  const handleFilterRatingChange = (event) => {
    setFilterRating(event.target.value);
    onFilter(searchTerm, event.target.value, filterCost); 
  };

  const handleFilterCostChange = (event) => {
    setFilterCost(event.target.value);
    onFilter(searchTerm, filterRating, event.target.value);
  };

  return (
    <div className="search">
      <input
        id="search-box"
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleInputChange}
      />

      <select id = "filter-rating" value={filterRating} onChange={handleFilterRatingChange}>
        <option value="">Filter by rating</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
        <option value="5">5</option>
      </select>

      <select id="filter-cost" value={filterCost} onChange={handleFilterCostChange}>
        <option value="">Filter by cost</option>
        <option value="$">$</option>
        <option value="$$">$$</option>
        <option value="$$$">$$$</option>
        <option value="$$$$">$$$$</option>
      </select>
    </div>
  );
}
