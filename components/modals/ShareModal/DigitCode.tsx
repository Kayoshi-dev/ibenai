import { Button, Group, Title } from "@mantine/core";
import { HiOutlineRefresh } from "react-icons/hi";

export default function DigitCode() {
  return (
    <>
      <Title order={3} mb="md">
        Invite your friends with this code
      </Title>

      <Group position="center" mb="md">
        <input
          type="text"
          maxLength={1}
          className="digit-input"
          value={1}
          readOnly
        />
        <input
          type="text"
          maxLength={1}
          className="digit-input"
          value={1}
          readOnly
        />
        <input
          type="text"
          maxLength={1}
          className="digit-input"
          value={1}
          readOnly
        />
        <input
          type="text"
          maxLength={1}
          className="digit-input"
          value={1}
          readOnly
        />

        <Button variant="outline" color="indigo">
          <HiOutlineRefresh />
        </Button>
      </Group>
    </>
  );
}
