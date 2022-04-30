import {
  Avatar,
  AvatarsGroup,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Header,
  Text,
  Title,
  Modal,
  useMantineTheme,
  Badge,
  Popover,
  Tooltip,
} from "@mantine/core";
import Image from "next/image";
import { MdQrCode2 } from "react-icons/md";
import dynamic from "next/dynamic";
import Link from "next/link";
import ShareModal from "../../components/modals/ShareModal/ShareModal";
import { useState } from "react";
import { motion } from "framer-motion";
import { BsCalendarEvent } from "react-icons/bs";

const Map = dynamic(() => import("../../components/map/Map"), {
  ssr: false,
});

export default function Event() {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const [openedPopover, setOpenedPopover] = useState(false);

  return (
    <Container size="xl">
      <Header height={60}>
        <Group position="apart">
          <Title>Ibenai</Title>

          <Group>
            <Link href="#" passHref>
              <a>Create a new event</a>
            </Link>
          </Group>
        </Group>
      </Header>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Share this event with your friends"
      >
        <ShareModal />
      </Modal>
      <Grid>
        <Grid.Col span={12} lg={8}>
          <Box mb="md">
            <Image
              src="https://images.unsplash.com/photo-1596240748549-6ec0f32d4c95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
              layout="responsive"
              width="100%"
              height="50%"
              alt="Event"
              priority
            />{" "}
          </Box>

          <Group position="apart">
            <Title>Mon évènement</Title>
            <motion.div animate={{ scale: 0.5 }} />

            <Group spacing="xs">
              <Button
                color="indigo"
                radius="md"
                variant="outline"
                leftIcon={<MdQrCode2 />}
                onClick={() => setOpened(true)}
              >
                Show QR Code
              </Button>
              <Button color="indigo" radius="md">
                Share
              </Button>
            </Group>
          </Group>

          <Group spacing="xs" style={{ color: theme.colors.gray[6] }}>
            <BsCalendarEvent />

            <Text>Tuesday, 26 April 2022 at 20:00</Text>
          </Group>

          <Tooltip
            wrapLines
            width={220}
            withArrow
            transition="fade"
            transitionDuration={200}
            label="Use this button to save this information in your profile, after that you will be able to access it any time and share it via email."
          >
            <Avatar
              style={{ borderLeft: "2px solid white" }}
              radius="xl"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              onMouseEnter={() => setOpenedPopover(true)}
              onMouseLeave={() => setOpenedPopover(false)}
            />
          </Tooltip>

          <Tooltip
            style={{ marginLeft: "-10px" }}
            wrapLines
            width={220}
            withArrow
            transition="fade"
            transitionDuration={200}
            label="Use this button to save this information in your profile, after that you will be able to access it any time and share it via email."
          >
            <Avatar
              style={{ borderLeft: "2px solid white" }}
              radius="xl"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              onMouseEnter={() => setOpenedPopover(true)}
              onMouseLeave={() => setOpenedPopover(false)}
            />
          </Tooltip>

          <Tooltip
            style={{ marginLeft: "-10px" }}
            wrapLines
            width={220}
            withArrow
            transition="fade"
            transitionDuration={200}
            label="Test"
          >
            <Avatar
              style={{ borderLeft: "2px solid white" }}
              radius="xl"
              src="https://randomuser.me/api/portraits/men/32.jpg"
              onMouseEnter={() => setOpenedPopover(true)}
              onMouseLeave={() => setOpenedPopover(false)}
            />
          </Tooltip>

          <Group mb="xl">
            <AvatarsGroup limit={3} total={5}>
              <Avatar
                src="https://randomuser.me/api/portraits/men/32.jpg"
                onMouseEnter={() => setOpenedPopover(true)}
                onMouseLeave={() => setOpenedPopover(false)}
              />
              <Avatar src="https://randomuser.me/api/portraits/men/33.jpg" />
              <Avatar src="https://randomuser.me/api/portraits/men/34.jpg" />
            </AvatarsGroup>
            <p>x persons are going!</p>
          </Group>

          <Box>
            <Title order={3}>Description</Title>
            <Text>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad,
              asperiores blanditiis dolor ea eligendi est inventore libero odit
              perspiciatis praesentium, quas sapiente sunt vitae! Aperiam aut
              dignissimos dolorem excepturi fugit id magnam magni molestiae
              nostrum officiis praesentium sed vitae, voluptatibus. Aut
              blanditiis consequatur dignissimos harum itaque nisi quas quisquam
              ratione sed. Aliquam consequuntur eaque hic ipsa magni maxime
              nesciunt perferendis repellendus sint voluptatibus. Ab alias aut
              autem commodi corporis cupiditate distinctio dolorem doloribus
              earum est excepturi id illo ipsum iusto laborum libero maxime
              minima neque officia officiis omnis optio quae quam qui quia quis
              quod quos recusandae, reiciendis repellat rerum sapiente sed
              similique suscipit totam voluptas voluptatum. Aliquid animi, at
              autem consectetur consequuntur culpa deserunt dignissimos ea illo
              inventore itaque laboriosam laborum natus nesciunt officiis, optio
              pariatur placeat quae quia quisquam ratione reprehenderit rerum
              sed suscipit totam vero vitae. Aut dolore laboriosam nam, placeat
              quidem ut voluptatibus. Animi architecto asperiores aut
              consequatur culpa deserunt dicta dignissimos dolor dolore ducimus
              eaque error, ex excepturi facilis illum inventore iusto magni
              maxime modi molestiae nobis non officia, officiis pariatur placeat
              quas qui quia quibusdam quo rem reprehenderit repudiandae sed
              similique sit vel voluptas voluptatibus. Ab atque error laboriosam
              nihil pariatur qui tempora! Aperiam?
            </Text>
          </Box>
        </Grid.Col>
        <Grid.Col span={12} lg={4}>
          <Group
            sx={(theme) => ({
              padding: theme.spacing.sm,
              height: "45%",
            })}
          >
            <Title order={3}>Location of the event</Title>
            <Map showFullscreenButton />
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
}
