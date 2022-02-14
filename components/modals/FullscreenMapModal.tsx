import { LatLngTuple } from "leaflet";
import { Box, useMantineTheme } from "@mantine/core";
import Map from "../map/Map";

export default function FullscreenMapModal() {
  return (
    <Box style={{ height: "75vh" }}>
      <Map showFullscreenButton={false} />
    </Box>
  );
}
