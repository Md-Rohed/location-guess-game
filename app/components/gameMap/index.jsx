// GameMap.tsx
import React from "react";
import Map, { Marker } from "react-map-gl";

const MAPBOX_ACCESS_TOKEN =
  "pk.eyJ1Ijoicm9oZWQ4NSIsImEiOiJjbHd0MGkyd2kwMWF4MmpzZGt1N2xwZTJqIn0.M096MIOsdItffP_tDVb2xA";
const mapStyle = {
  version: 8,
  name: "Basic",
  metadata: {
    "mapbox:autocomposite": true,
  },
  sources: {
    transit: {
      url: "mapbox://mapbox.transit-v2",
      type: "vector",
    },
    mapbox: {
      url: "mapbox://mapbox.mapbox-streets-v7",
      type: "vector",
    },
  },
  sprite: "mapbox://sprites/mapbox/basic-v8",
  glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
  layers: [
    {
      id: "background",
      type: "background",
      paint: {
        "background-color": "#e5e7eb",
      },
      interactive: true,
    },
    {
      id: "landuse_park",
      type: "fill",
      source: "mapbox",
      "source-layer": "landuse",
      filter: ["==", "class", "park"],
      paint: {
        "fill-color": "#d1d5db",
      },
      interactive: true,
    },
    {
      id: "water",
      type: "fill",
      source: "mapbox",
      "source-layer": "water",
      paint: {
        "fill-color": "#9ca3af",
      },
      interactive: true,
    },
  ],
};

const GameMap = ({ placedPin, correctPin, handleMapClick }) => (
  <div className="w-full max-w-4xl">
    <Map
      initialViewState={{
        longitude: 10,
        latitude: 50,
        zoom: 3.5,
      }}
      style={{ width: "100%", height: "600px" }}
      mapStyle={mapStyle}
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      onClick={handleMapClick}
    >
      {placedPin && (
        <Marker
          longitude={placedPin.lng}
          latitude={placedPin.lat}
          color="red"
        />
      )}
      {correctPin && (
        <Marker
          longitude={correctPin.lng}
          latitude={correctPin.lat}
          color="blue"
        />
      )}
    </Map>
  </div>
);

export default GameMap;
