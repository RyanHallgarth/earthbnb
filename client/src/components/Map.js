import React from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  height: "100%",
  width: "100%",
  overflow: "hidden",
  position: "relative",
};

const Map = ({ lat, lng }) => {
  const center = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  const position = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className='map'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={14}
        center={center}
      >
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
};

export default React.memo(Map);
