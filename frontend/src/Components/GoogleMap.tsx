/* eslint-disable @typescript-eslint/no-explicit-any */
// import React, { useState, useEffect } from 'react';
// import Map, { Marker, MapLayerMouseEvent } from 'react-map-gl';
// import { FormikProps } from 'formik';
// import { RestaurantValues } from '../helpers/validation'; 


// interface GoogleMapProps {
//   formik: FormikProps<RestaurantValues>;
// }

// const GoogleMap: React.FC<GoogleMapProps> = ({ formik }) => {
//   const [lng, setLng] = useState<number | null>(null);
//   const [lat, setLat] = useState<number | null>(null);

//   useEffect(() => {
//     if (formik.values.location.coordinates[0] && formik.values.location.coordinates[1]) {
//       setLng(parseFloat(formik.values.location.coordinates[0]));
//       setLat(parseFloat(formik.values.location.coordinates[1]));
//     }
//   }, [formik.values.location.coordinates]);

//   const handleClick = (event: MapLayerMouseEvent) => {
//     const { lngLat } = event;
//     setLng(lngLat.lng);
//     setLat(lngLat.lat);
//     formik.setFieldValue('location.coordinates', [lngLat.lng.toString(), lngLat.lat.toString()]);
//   };

//   return (
//     <div>
//       <Map
//         mapLib={import('mapbox-gl')}
//         initialViewState={{
//           longitude: lng ?? -100,
//           latitude: lat ?? 40,
//           zoom: 3.5,
//         }}
//         mapboxAccessToken= {import.meta.env.MAP_BOX_ACCESS_TOKEN || "pk.eyJ1Ijoic3VkZXZ2cyIsImEiOiJjbHhicjN6bTUwMWUxMm9zNXYzb3Jhbm4wIn0.2RDQ5l7TH-rUNQgFcwlgNw"} 
//         style={{ width: 500, height: 250 }}
//         mapStyle="mapbox://styles/mapbox/streets-v9"
//         onClick={handleClick}
//       >
//         {lng !== null && lat !== null && (
//           <Marker longitude={lng} latitude={lat} color="red" />
//         )}
//       </Map>
//     </div>
//   );
// };

// export default GoogleMap;



// import React, { useState, useEffect } from 'react';
// import Map, { Marker, MapLayerMouseEvent } from 'react-map-gl';
// import { FormikProps } from 'formik';
// import { RestaurantValues } from '../helpers/validation';
// import axios from 'axios';

// interface GoogleMapProps {
//   formik: FormikProps<RestaurantValues>;
// }

// export interface LocationSuggestion {
//   id: string;
//   place_name: string;
//   center: [number, number];
// }

// const GoogleMap: React.FC<GoogleMapProps> = ({ formik }) => {
//   const [lng, setLng] = useState<number | null>(null);
//   const [lat, setLat] = useState<number | null>(null);
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);

//   const mapboxToken = 'pk.eyJ1Ijoic3VkZXZ2cyIsImEiOiJjbHhicjN6bTUwMWUxMm9zNXYzb3Jhbm4wIn0.2RDQ5l7TH-rUNQgFcwlgNw';

//   useEffect(() => {
//     const [longitude, latitude] = formik.values.location.coordinates.map(coord => parseFloat(coord));
//     if (longitude && latitude) {
//       setLng(longitude);
//       setLat(latitude);
//     }
//   }, [formik.values.location.coordinates]);

//   useEffect(() => {
//     if (query.length > 2) {
//       const fetchSuggestions = async () => {
//         try {
//           const response = await axios.get(
//             `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json`,
//             {
//               params: {
//                 access_token: mapboxToken,
//                 autocomplete: true,
//                 limit: 5,
//               },
//             }
//           );
//           // eslint-disable-next-line @typescript-eslint/no-explicit-any
//           setSuggestions(response.data.features.map((feature: any) => ({
//             id: feature.id,
//             place_name: feature.place_name,
//             center: feature.center,
//           })));
//         } catch (error) {
//           console.error('Error fetching suggestions:', error);
//         }
//       };
//       fetchSuggestions();
//     } else {
//       setSuggestions([]);
//     }
//   }, [query]);

//   const handleSelectLocation = (location: LocationSuggestion) => {
//     const [longitude, latitude] = location.center;
//     setLng(longitude);
//     setLat(latitude);
//     formik.setFieldValue('location.coordinates', [longitude.toString(), latitude.toString()]);
//     setQuery(location.place_name);
//     setSuggestions([]);
//   };

//   const handleClick = (event: MapLayerMouseEvent) => {
//     const { lngLat } = event;
//     setLng(lngLat.lng);
//     setLat(lngLat.lat);
//     formik.setFieldValue('location.coordinates', [lngLat.lng.toString(), lngLat.lat.toString()]);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//         placeholder="Search location"
//         className="input border rounded-lg p-2 border-gray-200 w-full"
//       />
//       {suggestions.length > 0 && (
//         <ul className="suggestions">
//           {suggestions.map((suggestion) => (
//             <li
//               key={suggestion.id}
//               onClick={() => handleSelectLocation(suggestion)}
//             >
//               {suggestion.place_name}
//             </li>
//           ))}
//         </ul>
//       )}
//       <Map
//         mapLib={import('mapbox-gl')}
//         initialViewState={{
//           longitude: lng ?? -100,
//           latitude: lat ?? 40,
//           zoom: 3.5,
//         }}
//         mapboxAccessToken={mapboxToken}
//         style={{ width: '100%', height: 250 }}
//         mapStyle="mapbox://styles/mapbox/streets-v9"
//         onClick={handleClick}
//       >
//         {lng !== null && lat !== null && (
//           <Marker longitude={lng} latitude={lat} color="red" />
//         )}
//       </Map>
//     </div>
//   );
// };

// export default GoogleMap;




// GoogleMap.tsx
import React, { useEffect, useState } from 'react';
import ReactMapGl, { Marker } from 'react-map-gl';
import './MapBox.css';
import "mapbox-gl/dist/mapbox-gl.css";
import { HiLocationMarker } from 'react-icons/hi';



const mapboxToken = 'pk.eyJ1Ijoic3VkZXZ2cyIsImEiOiJjbHhicjN6bTUwMWUxMm9zNXYzb3Jhbm4wIn0.2RDQ5l7TH-rUNQgFcwlgNw';

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