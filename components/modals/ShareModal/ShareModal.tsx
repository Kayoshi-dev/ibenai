import { Group } from "@mantine/core";
import QRCode from "react-qr-code";
import DigitCode from "./DigitCode";

export default function ShareModal() {
  return (
    <>
      <DigitCode />

      <Group position="center">
        <QRCode value="test" />
      </Group>
    </>
  );
}
