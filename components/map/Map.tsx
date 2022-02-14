import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LatLngTuple } from "leaflet";
import { Box, Button, useMantineTheme } from "@mantine/core";
import { BiFullscreen } from "react-icons/bi";
import { useModals } from "@mantine/modals";
import FullscreenMapModal from "../modals/FullscreenMapModal";

export declare interface IMapProps {
  showFullscreenButton: boolean;
}

export default function Map({ showFullscreenButton }: IMapProps) {
  const theme = useMantineTheme();
  const modals = useModals();
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
        {showFullscreenButton && (
          <Button
            variant="white"
            color="dark"
            onClick={() =>
              modals.openModal({
                title: "Fullscreen map of the location of the event",
                children: <FullscreenMapModal />,
                size: "75%",
              })
            }
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              padding: "0 12px 0 12px",
              zIndex: 500,
              boxShadow: theme.shadows.md,
            }}
          >
            <BiFullscreen />
          </Button>
        )}

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
