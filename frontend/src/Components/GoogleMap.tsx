import React, { useState, useEffect } from 'react';
import Map, { Marker, MapLayerMouseEvent } from 'react-map-gl';
import { FormikProps } from 'formik';
import { RestaurantValues } from '../helpers/validation'; 

interface GoogleMapProps {
  formik: FormikProps<RestaurantValues>;
}

const GoogleMap: React.FC<GoogleMapProps> = ({ formik }) => {
  const [lng, setLng] = useState<number | null>(null);
  const [lat, setLat] = useState<number | null>(null);

  useEffect(() => {
    if (formik.values.location.coordinates[0] && formik.values.location.coordinates[1]) {
      setLng(parseFloat(formik.values.location.coordinates[0]));
      setLat(parseFloat(formik.values.location.coordinates[1]));
    }
  }, [formik.values.location.coordinates]);

  const handleClick = (event: MapLayerMouseEvent) => {
    const { lngLat } = event;
    setLng(lngLat.lng);
    setLat(lngLat.lat);
    formik.setFieldValue('location.coordinates', [lngLat.lng.toString(), lngLat.lat.toString()]);
  };

  return (
    <div>
      <Map
        mapLib={import('mapbox-gl')}
        initialViewState={{
          longitude: lng ?? -100,
          latitude: lat ?? 40,
          zoom: 3.5,
        }}
        mapboxAccessToken="pk.eyJ1Ijoic3VkZXZ2cyIsImEiOiJjbHhicjN6bTUwMWUxMm9zNXYzb3Jhbm4wIn0.2RDQ5l7TH-rUNQgFcwlgNw"
        style={{ width: 500, height: 250 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        onClick={handleClick}
      >
        {lng !== null && lat !== null && (
          <Marker longitude={lng} latitude={lat} color="red" />
        )}
      </Map>
    </div>
  );
};

export default GoogleMap;
