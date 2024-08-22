import React from 'react';
import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const MapComponent = ({ mode, polygons, setPolygons, markers, setMarkers }) => {
  const mapClickHandler = (event) => {
    const newPoint = { lat: event.latLng.lat(), lng: event.latLng.lng() };
    
    if (mode === 'polygons') {
      const newPolygon = [...(polygons[polygons.length - 1]?.path || []), newPoint];
      setPolygons([...polygons.slice(0, polygons.length - 1), { path: newPolygon }]);
    } else {
      setMarkers([...markers, newPoint]);
    }
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCzzOPuM_6UwJgeDrVO8H-nx0x5zitVuR4">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: -3.745, lng: -38.523 }}
        zoom={10}
        onClick={mapClickHandler}
      >
        {polygons.map((polygon, index) => (
          <Polygon key={index} paths={polygon.path} />
        ))}
        {markers.map((marker, index) => (
          <Marker key={index} position={marker} />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
