import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LatLngTuple } from "leaflet";
import { Box, Paper, useMantineTheme } from "@mantine/core";

export default function Map() {
  const theme = useMantineTheme();
  const position: LatLngTuple = [45.188529, 5.724524];

  return (
    <Box
      style={{
        height: "100%",
        width: "100%",
      }}
      sx={(theme) => ({ boxShadow: theme.shadows.md })}
    >
      <MapContainer
        center={position}
        zoom={13}
        scrollWheelZoom={false}
        style={{
          height: "100%",
          width: "100%",
          borderRadius: theme.radius.md,
          zIndex: 1,
        }}
      >
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
          url={`https://api.mapbox.com/styles/v1/kayoshi-dev/ckzlajhj3001o14o8wcf9jcd8/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
        />
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
}
