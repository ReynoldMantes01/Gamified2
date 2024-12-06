import React from "react";

// Sample data import (replace with actual data import from a file or API)
import mapsData from "./maps.json";

const MapSelection = ({ onMapSelect }) => {
  return (
    <div className="map-selection">
      <h1>Select Your Level</h1>
      <div className="maps-container">
        {mapsData.maps.map((map) => (
          <div
            key={map.id}
            className="map-card"
            style={{
              backgroundImage: `url(${map.background})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            onClick={() => onMapSelect(map)}
          >
            <h2>{map.name}</h2>
            <p>Theme: {map.theme}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MapSelection;
