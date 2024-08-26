/* eslint-disable @typescript-eslint/no-explicit-any */

// GoogleMap.tsx
import React, { useEffect, useState } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import './MapBox.css';
import "mapbox-gl/dist/mapbox-gl.css";
import { HiLocationMarker } from 'react-icons/hi';



const mapboxToken = import.meta.env.VITE_MAPBOX_API_KEY;

interface GoogleMapProps {
  longitude: any;
  latitude: any;
  updateCoordinates?: (latitude: number, longitude: number) => void;
  isMarkerDraggable?: boolean;
}

const GoogleMap: React.FC<GoogleMapProps> = ({
  longitude,
  latitude,
  updateCoordinates,
  isMarkerDraggable = true
}) => {

const [ viewport, setViewport] = useState({
  latitude,
  longitude,
  zoom: 16,
})


useEffect(() => {
  setViewport((oldViewport) => ({
    ...oldViewport,
    latitude,
    longitude,
  }));
}, [latitude, longitude]);

const handleMarkerDrag = (event: any) => {
  const latitude = event.lngLat.lat;
  const longitude = event.lngLat.lng;
  if (updateCoordinates) updateCoordinates(latitude, longitude);
};

return (
  <div className="h-56 w-full">
    <ReactMapGl
      {...viewport}
      mapboxAccessToken={mapboxToken}
      mapStyle="mapbox://styles/mapbox/streets-v12"
      onMove={(event) => {
        setViewport(event.viewState);
      }}
    
    >
      <Marker
        latitude={latitude}
        longitude={longitude}
        draggable={isMarkerDraggable}
        onDragEnd={handleMarkerDrag}
      >
        <HiLocationMarker color="teal"  size={28} strokeWidth={0.2} />
      </Marker>
    </ReactMapGl>
  </div>
);
};

export default GoogleMap;