import React from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  infoWindow,
} from "@react-google-maps/api";
import Icon from "./Icon";

const mapContainerStyle = {
  height: "100%",
  width: "100%",
  overflow: "hidden",
  position: "relative",
};

const Map = ({ lat, lng }) => {
  const center = {
    lat: lat,
    lng: lng,
  };

  const position = {
    lat: lat,
    lng: lng,
  };

  console.log(process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className='map'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={12}
        center={center}
      >
        <Marker position={position} />
      </GoogleMap>
    </div>
  );
};

export default React.memo(Map);
