import React, { useState } from 'react';
import MapComponent from './components/MapComponent/MapComponent';
import ManagementTable from './components/ManagementTable/ManagementTable';
import './App.css';

function App() {
  const [mode, setMode] = useState('polygons'); // 'polygons' or 'markers'
  const [polygons, setPolygons] = useState([]);
  const [markers, setMarkers] = useState([]);

  return (
    <div className="app-container">
      <div className="content-container">
        <div className="map-container">
          <MapComponent 
            mode={mode} 
            polygons={polygons} 
            setPolygons={setPolygons} 
            markers={markers} 
            setMarkers={setMarkers} 
          />
        </div>
        <div className="table-container">
          <div className="tabs-container">
            <button 
              className={`tab ${mode === 'polygons' ? 'active' : ''}`} 
              onClick={() => setMode('polygons')}
            >
              Polygons management
            </button>
            <button 
              className={`tab ${mode === 'markers' ? 'active' : ''}`} 
              onClick={() => setMode('markers')}
            >
              Markers management
            </button>
          </div>
          <ManagementTable 
            mode={mode} 
            polygons={polygons} 
            setPolygons={setPolygons} 
            markers={markers} 
            setMarkers={setMarkers} 
          />
        </div>
      </div>
    </div>
  );
}

export default App;
