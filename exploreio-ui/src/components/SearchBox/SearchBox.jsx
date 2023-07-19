import React, { useState } from 'react';

export default function SearchBox({ data, onFilter }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOptions, setFilterOptions] = useState(''); // Add state for filtering options

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
    onFilter(event.target.value, filterOptions); // Pass filter options to the onFilter function
  };

  const handleFilterChange = (event) => {
    setFilterOptions(event.target.value);
    onFilter(searchTerm, event.target.value); // Pass search term and filter options to the onFilter function
  };

  return (
    <div className='search'>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />

    </div>
  );
}

