import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

// console.log("hello");

function Map() {
  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
    libraries,
  });

  const { state } = useLocation();

  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    setCoordinates(() => {
      console.log(state.payload);
      return state.payload.map((item) => {
        return {
          lat: item.metaData[0].location[0].latitude,
          lng: item.metaData[0].location[0].longitude,
        };
      });
    });
  }, []);

  return isLoaded ? (
    <>
      (
      <GoogleMap
        mapContainerStyle={{
          width: "100vw",
          height: "100vh",
        }}
        center={{ lat: 34.0648099, lng: -118.2940402 }}
        zoom={10}
      >
        {coordinates.map((coord) => {
          return <Marker key={coord.lat + coord.lng} position={coord} />;
        })}
      </GoogleMap>
      )
    </>
  ) : (
    <></>
  );
}

export default React.memo(Map);
