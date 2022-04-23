import { Box, useMantineTheme } from "@mantine/core";
import Map from "../map/Map";
import { useMediaQuery } from "@mantine/hooks";

export default function FullscreenMapModal() {
  const theme = useMantineTheme();
  const isLargerThanTablet = useMediaQuery(
    `(min-width: ${theme.breakpoints.lg}px)`
  );

  return (
    <Box style={{ height: isLargerThanTablet ? "75vh" : "500px" }}>
      <Map showFullscreenButton={false} />
    </Box>
  );
}
