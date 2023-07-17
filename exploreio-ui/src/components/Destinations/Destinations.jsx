import React, { useState } from "react";
import SearchBox from "../SearchBox/SearchBox";

export default function Destinations() {
    const [filteredData, setFilteredData] = useState([]);

    const handleFilter = (searchTerm) => {
        const filteredResults = 
            setFilteredData(filteredResults);
    };

    return (
        <div>
            <h1>Destinations</h1>
            <SearchBox data={filteredData} onFilter={handleFilter} />
            
            {filteredData.map((item) => (
                <div key={item.id}>{item.name}</div>
            ))}
        </div>
    );
}
