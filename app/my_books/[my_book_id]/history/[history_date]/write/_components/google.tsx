'use client';

import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = { width: '100%', height: '400px' };
const initialCenter = { lat: 37.437041393899676, lng: -4.191635586788259 };

interface LatLng {
  lat: number;
  lng: number;
}

export default function GoogleMapComponent() {
  return (
    <LoadScript
      loadingElement={<div>google map loading...</div>}
      googleMapsApiKey="AIzaSyAiOi8BxW2yV2iUnT30EexjqCZGNxMMGWA"
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={initialCenter}
        zoom={10}
      >
        <Marker position={initialCenter} />
      </GoogleMap>
    </LoadScript>
  );
}
