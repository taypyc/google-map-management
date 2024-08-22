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
        <ManagementTable 
          mode={mode} 
          polygons={polygons} 
          setPolygons={setPolygons} 
          markers={markers} 
          setMarkers={setMarkers} 
        />
        <button onClick={() => setMode(mode === 'polygons' ? 'markers' : 'polygons')}>
          Switch to {mode === 'polygons' ? 'Marker Management' : 'Polygon Management'}
        </button>
      </div>
    </div>
  );
}

export default App;
