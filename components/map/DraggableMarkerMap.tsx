import {
  createContext,
  MutableRefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
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
import {
  Box,
  Button,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { BsFillGeoAltFill } from "react-icons/all";
import L from "leaflet";

interface IPositionContext {
  position: LatLngExpression;
  updateFormValues: Function;
  geoButton: MutableRefObject<any>;
}

const PositionContext = createContext<IPositionContext | undefined>(undefined);

export default function DraggableMarkerMap({
  updateFormValues,
  position,
}: {
  updateFormValues: Function;
  position: {
    lat: number;
    lng: number;
  };
}) {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const mapStyleUrl =
    colorScheme === "dark"
      ? `https://api.mapbox.com/styles/v1/kayoshi-dev/cl0pl248w00bk14qyov5fmih1/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
      : `https://api.mapbox.com/styles/v1/kayoshi-dev/ckzlajhj3001o14o8wcf9jcd8/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;

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
        updateFormValues("address", formattedData.display_name);
      });
  }, [position]);

  return (
    <PositionContext.Provider value={{ position, updateFormValues, geoButton }}>
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
          center={position}
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
            url={mapStyleUrl}
          />
          <DraggableMarker />
        </MapContainer>
      </Box>
    </PositionContext.Provider>
  );
}

function DraggableMarker() {
  const { position, updateFormValues } = useContext(
    PositionContext
  ) as IPositionContext;
  const markerRef = useRef<LeafletMarker>(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        if (marker != null) {
          updateFormValues("position", marker.getLatLng());
        }
      },
    }),
    [position]
  );

  useMapEvents({
    click(e) {
      updateFormValues("position", e.latlng);
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
  const { colorScheme } = useMantineColorScheme();
  const { updateFormValues, geoButton } = useContext(
    PositionContext
  ) as IPositionContext;

  return (
    <Button
      ref={geoButton}
      variant={colorScheme === "dark" ? "filled" : "white"}
      color="dark"
      onClick={() => {
        navigator.geolocation.getCurrentPosition((userPosition) => {
          updateFormValues("position", {
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
