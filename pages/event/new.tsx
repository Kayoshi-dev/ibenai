import NewEventForm from "../../components/forms/NewEventForm";
import { Container, Title } from "@mantine/core";

export default function NewEvent() {
  return (
    <Container>
      <Title>New Event</Title>
      <NewEventForm />
    </Container>
  );
}

NewEvent.layout = "main";
