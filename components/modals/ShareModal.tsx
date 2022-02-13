import { Modal } from "@mantine/core";
import { useState } from "react";

export default function ShareModal() {
  const [opened, setOpened] = useState(false);

  return (
    <Modal opened={opened} onClose={() => setOpened(false)} centered>
      TEST
    </Modal>
  );
}
