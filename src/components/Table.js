import React, { useState } from "react";
import '../App.css'; // Importing the CSS file

const Table = ({ data }) => {
  // State for filter values
  const [yearFilter, setYearFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [modelFilter, setModelFilter] = useState("");
//   const [rangeFilter, setRangeFilter] = useState("");
  const [rangeSortOrder, setRangeSortOrder] = useState("none"); // Three states: "none", "asc", "desc"
  
 
  const filteredData = data
    .filter((row) => {
      const yearMatch = yearFilter ? row["Model Year"] === yearFilter : true;
      const typeMatch = typeFilter ? row["Electric Vehicle Type"].includes(typeFilter) : true;
      const modelMatch = modelFilter ? row.Model.toLowerCase().includes(modelFilter.toLowerCase()) : true;
      const brandMatch = brandFilter ? row.Model.toLowerCase().includes(brandFilter.toLowerCase()) : true;
    //   const rangeMatch = rangeFilter ? parseInt(row["Electric Range"]) >= parseInt(rangeFilter) : true;

      return yearMatch && typeMatch && modelMatch && brandMatch;
    })
    .sort((a, b) => {
      if (rangeSortOrder === "asc") {
        const rangeA = parseInt(a["Electric Range"]);
        const rangeB = parseInt(b["Electric Range"]);
        return rangeA - rangeB; 
      } else if (rangeSortOrder === "desc") {
        const rangeA = parseInt(a["Electric Range"]);
        const rangeB = parseInt(b["Electric Range"]);
        return rangeB - rangeA; 
      }
      return 0; 
    });

  const toggleRangeSortOrder = () => {

    if (rangeSortOrder === "none") {
      setRangeSortOrder("asc"); 
    } else if (rangeSortOrder === "asc") {
      setRangeSortOrder("desc"); 
    } else {
      setRangeSortOrder("none"); 
    }
  };

  return (
    <div className="table-container">
      <div className="filters">

        <input
          className="filter-input"
          type="text"
          placeholder="Filter by Brand"
          value={brandFilter}
          onChange={(e) => setBrandFilter(e.target.value)}
        />

        <input
          className="filter-input"
          type="text"
          placeholder="Filter by Model"
          value={modelFilter}
          onChange={(e) => setModelFilter(e.target.value)}
        />
        
        <select
          className="filter-select"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">Select Year</option>
          {[...new Set(data.map((row) => row["Model Year"]))].map((year, index) => (
            <option key={index} value={year}>
              {year}
            </option>
          ))}
        </select>

        {/* Type Filter */}
        <select
          className="filter-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">Select Type</option>
          {[...new Set(data.map((row) => row["Electric Vehicle Type"]))].map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>

       {/* Range Filter */}
        {/* <input
          className="filter-input"
          type="number"
          placeholder="Filter by Range (miles)"
          value={rangeFilter}
          onChange={(e) => setRangeFilter(e.target.value)}
        /> */}

        {/* Range Sort Order Button */}
        <button className="sort-button" onClick={toggleRangeSortOrder}>
          Sort Range: {rangeSortOrder === "none" ? "Normal" : rangeSortOrder === "asc" ? "Ascending" : "Descending"}
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Make</th>
            <th>Model</th>
            <th>Year</th>
            <th>Type</th>
            <th>Range (miles)</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 ? (
            filteredData.map((row, index) => (
              <tr key={index}>
                <td>{row.Make}</td>
                <td>{row.Model}</td>
                <td>{row["Model Year"]}</td>
                <td>{row["Electric Vehicle Type"]}</td>
                <td>{row["Electric Range"]}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No results found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
