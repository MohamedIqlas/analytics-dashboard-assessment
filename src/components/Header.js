import React from "react";
import '../App.css';

const Header = ({ totalVehicles, bevCount, phevCount, avgRange }) => {
  return (
    <div className="header-container">
      <div className="stat-card">Total Vehicles: {totalVehicles}</div>
      <div className="stat-card">BEVs: {bevCount}</div>
      <div className="stat-card">PHEVs: {phevCount}</div>
      <div className="stat-card">Average Range: {avgRange} miles</div>
    </div>
  );
};

export default Header;
