import React, { useState } from 'react';
import { GoogleMap, LoadScript, Polygon, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const MapComponent = ({ mode, polygons, setPolygons, markers, setMarkers }) => {
  const [currentPolygon, setCurrentPolygon] = useState([]);

  const mapClickHandler = (event) => {
    const newPoint = { lat: event.latLng.lat(), lng: event.latLng.lng() };

    if (mode === 'polygons') {
      setCurrentPolygon([...currentPolygon, newPoint]);
    } else {
      setMarkers([...markers, { name: `Marker ${markers.length + 1}`, latlng: newPoint }]);
    }
  };

  const polygonCompleteHandler = () => {
    setPolygons([...polygons, { name: `Polygon ${polygons.length + 1}`, path: currentPolygon }]);
    setCurrentPolygon([]);
  };

  const polygonRightClickHandler = (polygonIndex) => {
    setPolygons(polygons.filter((_, index) => index !== polygonIndex));
  };

  const markerRightClickHandler = (markerIndex) => {
    setMarkers(markers.filter((_, index) => index !== markerIndex));
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyCzzOPuM_6UwJgeDrVO8H-nx0x5zitVuR4">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: -3.745, lng: -38.523 }}
        zoom={10}
        onClick={mapClickHandler}
        onRightClick={mode === 'polygons' && currentPolygon.length > 0 ? polygonCompleteHandler : null}
      >
        {polygons.map((polygon, index) => (
          <Polygon
            key={index}
            paths={polygon.path}
            onRightClick={() => polygonRightClickHandler(index)}
          />
        ))}
        {currentPolygon.length > 0 && (
          <Polygon
            paths={currentPolygon}
            options={{ fillColor: 'lightblue', strokeColor: 'blue' }}
          />
        )}
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.latlng}
            onRightClick={() => markerRightClickHandler(index)}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
