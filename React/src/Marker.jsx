import React, { useState } from "react";
import { Marker } from "@react-google-maps/api";

function MapMarker(props) {
  const [markers] = useState(props.coordinates);

  return markers.map((coord) => {
    return (
      <Marker
        key={coord.lat + " " + coord.lng + Math.random()}
        position={coord}
      />
    );
  });
}

export default React.memo(MapMarker);
