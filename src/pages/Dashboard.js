import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import BarChartComponent from "../components/Charts/BarChart";
import PieChartComponent from "../components/Charts/PieChart";
import Table from "../components/Table";
import { parseCSV } from "../utils/parseCSV";
import evData from "../data/ev_data.csv";
import '../App.css';

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    parseCSV(evData, (parsedData) => {
      setData(parsedData);
      calculateSummary(parsedData);
      setLoading(false); 
    });
  }, []);

  const calculateSummary = (data) => {
    const totalVehicles = data.length;
    const bevCount = data.filter((d) => d["Electric Vehicle Type"] === "Battery Electric Vehicle (BEV)").length;
    const phevCount = totalVehicles - bevCount;
    const avgRange =
      data.reduce((sum, d) => sum + parseInt(d["Electric Range"] || 0), 0) / totalVehicles;

    setSummary({ totalVehicles, bevCount, phevCount, avgRange: avgRange.toFixed(2) });
  };

  return (
    <div className="dashboard-container">
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner1"></div> {/* Loading spinner */}
          <div className="spinner2"></div> {/* Loading spinner */}
        </div>
      ) : (
        <>
          <div style={{ marginBottom: "30px" }}>
            <Header {...summary} />
          </div>

          <div className="chart-container">
            <div className="chart-card">
              <BarChartComponent
                data={Object.values(
                  data.reduce((acc, cur) => {
                    acc[cur.Make] = acc[cur.Make] || { make: cur.Make, count: 0 };
                    acc[cur.Make].count += 1;
                    return acc;
                  }, {})
                )}
              />
            </div>
            <div className="chart-card">
              <PieChartComponent
                data={[
                  { type: "BEV", value: summary.bevCount },
                  { type: "PHEV", value: summary.phevCount },
                ]}
              />
            </div>
          </div>

          <div className="table-card">
            <Table data={data} />
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
