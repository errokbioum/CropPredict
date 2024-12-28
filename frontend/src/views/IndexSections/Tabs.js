

import React, { useState, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TabsSection = ({ predictions, recommendations }) => {
  const [activeTab, setActiveTab] = useState('prediction');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBy, setFilterBy] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  const filteredPredictions = useMemo(() => {
    return predictions.filter(prediction => {
      if (!searchTerm && !selectedDate) return true;
      if (filterBy === 'city' && searchTerm) return prediction.city.toLowerCase().includes(searchTerm.toLowerCase());
      if (filterBy === 'date' && selectedDate) {
        const predictionDate = new Date(prediction.date);
        return predictionDate.toDateString() === selectedDate.toDateString();
      }
      return Object.values(prediction).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [predictions, searchTerm, filterBy, selectedDate]);

  const filteredRecommendations = useMemo(() => {
    return recommendations.filter(recommendation => {
      if (!searchTerm && !selectedDate) return true;
      if (filterBy === 'city' && searchTerm) return recommendation.city.toLowerCase().includes(searchTerm.toLowerCase());
      if (filterBy === 'date' && selectedDate) {
        const recommendationDate = new Date(recommendation.date);
        return recommendationDate.toDateString() === selectedDate.toDateString();
      }
      if (filterBy === 'season' && searchTerm) return recommendation.season.toLowerCase().includes(searchTerm.toLowerCase());
      return Object.values(recommendation).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
  }, [recommendations, searchTerm, filterBy, selectedDate]);

  const renderTable = (data, columns) => (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.accessorKey === 'date'
                    ? new Date(item[column.accessorKey]).toLocaleString()
                    : item[column.accessorKey]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const predictionColumns = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "humidity", header: "Humidity" },
    { accessorKey: "temperature", header: "Temperature" },
    { accessorKey: "rainfall", header: "Rainfall" },
    { accessorKey: "area", header: "Area" },
    { accessorKey: "crop", header: "Crop" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "result", header: "Prediction Result" },
  ];

  const recommendationColumns = [
    { accessorKey: "date", header: "Date" },
    { accessorKey: "nitrogen", header: "Nitrogen" },
    { accessorKey: "pottasium", header: "Potassium" },
    { accessorKey: "phosphorous", header: "Phosphorus" },
    { accessorKey: "ph", header: "pH" },
    { accessorKey: "season", header: "Season" },
    { accessorKey: "city", header: "City" },
    { accessorKey: "temperature", header: "Temperature" },
    { accessorKey: "humidity", header: "Humidity" },
    { accessorKey: "rainfall", header: "Rainfall" },
    { accessorKey: "result", header: "Recommendation Result" },
  ];

  return (
    <div className="tabs-section">
      <style jsx>{`
        .tabs-section {
          font-family: 'Arial', sans-serif;
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f0f4f8;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .tabs {
          display: flex;
          margin-bottom: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
        }
        .tab {
          flex: 1;
          padding: 12px 20px;
          background-color: transparent;
          color: #4a5568;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          text-align: center;
          outline: none;
        }
        .tab:hover {
          background-color: #FFA500;
        }
        .tab.active {
          background-color: #FFA500;
          color: white;
        }
        .filter-section {
          display: flex;
          gap: 20px;
          margin-bottom: 20px;
          flex-wrap: wrap;
        }
        .filter-group {
          flex: 1;
          min-width: 200px;
        }
        .filter-group label {
          display: block;
          margin-bottom: 8px;
          color: #4a5568;
          font-weight: 600;
        }
        .filter-group input,
        .filter-group select {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #FFA500;
          border-radius: 6px;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        .filter-group input:focus,
        .filter-group select:focus {
          border-color: #FFA500;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
          outline: none;
        }
        .date-picker-container {
          display: ${filterBy === 'date' ? 'block' : 'none'};
          transition: all 0.3s ease;
        }
        .date-picker-container input {
          width: 100%;
          padding: 10px 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        .date-picker-container input:focus {
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.2);
          outline: none;
        }
        .table-container {
          overflow-x: auto;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
        }
        th, td {
          padding: 12px 15px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
        th {
          background-color: #f7fafc;
          font-weight: 600;
          color: #4a5568;
          text-transform: uppercase;
          font-size: 12px;
          letter-spacing: 0.05em;
        }
        tr:last-child td {
          border-bottom: none;
        }
        tr:nth-child(even) {
          background-color: #f7fafc;
        }
        tr {
          transition: background-color 0.3s ease;
        }
        tr:hover {
          background-color: #edf2f7;
        }
      `}</style>
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'prediction' ? 'active' : ''}`}
          onClick={() => setActiveTab('prediction')}
        >
          Prediction
        </button>
        <button
          className={`tab ${activeTab === 'recommendation' ? 'active' : ''}`}
          onClick={() => setActiveTab('recommendation')}
        >
          Recommendation
        </button>
      </div>
      <div className="filter-section">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <label htmlFor="filterBy">Filter By</label>
          <select
            id="filterBy"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
          >
            <option value="">All</option>
            <option value="city">City</option>
            <option value="date">Date</option>
            {activeTab === 'recommendation' && <option value="season">Season</option>}
          </select>
        </div>
        <div className="filter-group date-picker-container">
          <label htmlFor="datePicker">Select Date</label>
          <DatePicker
            id="datePicker"
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="MM/dd/yyyy"
            placeholderText="Select a date"
          />
        </div>
      </div>
      {activeTab === 'prediction' && renderTable(filteredPredictions, predictionColumns)}
      {activeTab === 'recommendation' && renderTable(filteredRecommendations, recommendationColumns)}
    </div>
  );
};

export default TabsSection;

