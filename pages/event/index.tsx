import {
  Avatar,
  AvatarsGroup,
  Box,
  Button,
  Container,
  Grid,
  Group,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import { MdQrCode2 } from "react-icons/md";

export default function Event() {
  const theme = useMantineTheme();

  return (
    <Container size="xl">
      <Grid>
        <Grid.Col span={8}>
          <Image
            src="https://images.unsplash.com/photo-1596240748549-6ec0f32d4c95?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
            layout="responsive"
            width="100%"
            height="50%"
            alt="Event"
          />

          <Group position="apart">
            <Title>Mon évènement</Title>
            <Group spacing="xs">
              <Button
                color="indigo"
                radius="md"
                variant="outline"
                leftIcon={<MdQrCode2 />}
              >
                Show QR Code
              </Button>
              <Button color="indigo" radius="md">
                Share
              </Button>
            </Group>
          </Group>

          <Text color="dimmed">Le 16 Juillet 2022</Text>

          <Group mb={theme.spacing.xl}>
            <AvatarsGroup limit={3}>
              <Avatar
                src="https://randomuser.me/api/portraits/men/32.jpg"
                component="a"
                href="https://github.com/rtivital"
              />
              <Avatar src="https://randomuser.me/api/portraits/men/33.jpg" />
              <Avatar src="https://randomuser.me/api/portraits/men/34.jpg" />
            </AvatarsGroup>
            <p>x personnes y participent!</p>
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
        <Grid.Col span={4}>2</Grid.Col>
      </Grid>
    </Container>
  );
}
