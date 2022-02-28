import {
  createContext,
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  MapContainer,
  Marker,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { LatLngExpression, Marker as LeafletMarker } from "leaflet";
import { Box, Button, useMantineTheme } from "@mantine/core";
import { addressFormatted } from "../../lib/MapUtils";
import { BsFillGeoAltFill } from "react-icons/all";
import L from "leaflet";

const center: LatLngExpression = {
  lat: 45.188529,
  lng: 5.724524,
};

interface IPositionContext {
  position: LatLngExpression;
  setPosition: Dispatch<SetStateAction<any>>;
  geoButton: MutableRefObject<any>;
}

const PositionContext = createContext<IPositionContext | undefined>(undefined);

export default function DraggableMarkerMap({
  onChangeAdress,
}: {
  onChangeAdress: Function;
}) {
  const theme = useMantineTheme();
  const [position, setPosition] = useState({
    lat: 45.188529,
    lng: 5.724524,
  });

  /**
   * Disable the click propagation for the GeoButton, because it was moving the marker through it
   */
  const geoButton = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (geoButton.current) {
      L.DomEvent.disableClickPropagation(geoButton.current);
    }
  });

  useEffect(() => {
    fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${position.lat}&lon=${position.lng}&format=json`
    )
      .then((r) => r.json())
      .then((formattedData) => {
        console.log(formattedData);
        onChangeAdress("address", addressFormatted(formattedData));
      });
  }, [position]);

  return (
    <PositionContext.Provider value={{ position, setPosition, geoButton }}>
      <Box
        style={{
          height: "100%",
          width: "100%",
        }}
        sx={(theme) => ({
          boxShadow: theme.shadows.md,
          marginBottom: theme.spacing.md,
        })}
      >
        <MapContainer
          center={center}
          zoom={13}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: theme.radius.md,
            zIndex: 1,
          }}
        >
          <ButtonLocalizeUser />
          <TileLayer
            attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
            url={`https://api.mapbox.com/styles/v1/kayoshi-dev/ckzlajhj3001o14o8wcf9jcd8/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
          />
          <DraggableMarker />
        </MapContainer>
      </Box>
    </PositionContext.Provider>
  );
}

function DraggableMarker() {
  const { position, setPosition } = useContext(
    PositionContext
  ) as IPositionContext;
  const markerRef = useRef<LeafletMarker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          setPosition(marker.getLatLng());
        }
      },
    }),
    [position]
  );

  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return (
    <Marker
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
}

function ButtonLocalizeUser() {
  const map = useMap();
  const { setPosition, geoButton } = useContext(
    PositionContext
  ) as IPositionContext;

  return (
    <Button
      ref={geoButton}
      variant="white"
      color="dark"
      onClick={() => {
        navigator.geolocation.getCurrentPosition((userPosition) => {
          setPosition({
            lat: userPosition?.coords?.latitude,
            lng: userPosition?.coords?.longitude,
          });

          map.flyTo(
            {
              lat: userPosition?.coords?.latitude,
              lng: userPosition?.coords?.longitude,
            },
            18
          );
        });
      }}
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        padding: "0 12px 0 12px",
        zIndex: 500,
      }}
      sx={(theme) => ({ boxShadow: theme.shadows.md })}
    >
      <BsFillGeoAltFill />
    </Button>
  );
}
