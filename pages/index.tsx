import type { NextPage } from "next";
import Head from "next/head";
import {
  Container,
  Image,
  Text,
  useMantineTheme,
  Title,
  Grid,
  AvatarsGroup,
  Avatar,
  createStyles,
  Group,
} from "@mantine/core";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiFillCalendar } from "react-icons/ai";

const useStyles = createStyles((theme, _params, getRef) => ({
  cardEvent: {
    [`&:hover .${getRef("cardEventImage")}`]: {
      transform: "scale(1.03)",
    },

    [`&:hover .${getRef("cardTitle")}`]: {
      color: theme.colors.indigo,
    },

    "&:hover": {
      background:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[2],
      boxShadow: theme.shadows.sm,
    },

    borderRadius: theme.radius.md,
    transition: "all .3s ease-in-out",
  },
  cardEventImage: {
    ref: getRef("cardEventImage"),
    transition: "all .3s ease-in-out",
    cursor: "pointer",
  },
  imageWrapper: {
    overflow: "hidden",
  },
  cardTitle: {
    ref: getRef("cardTitle"),
    transition: "all .3s ease-in-out",

    cursor: "pointer",
  },
}));

const Home: NextPage = () => {
  const theme = useMantineTheme();
  const secondaryColor =
    theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.dark[8];
  const { classes } = useStyles();

  return (
    <Container>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Title>Your upcoming events</Title>

      <Grid p="md" mb="lg" className={classes.cardEvent}>
        <Grid.Col span={12} sm={6} className={classes.imageWrapper}>
          <Image
            radius="md"
            className={classes.cardEventImage}
            src="https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80"
            height={160}
            alt="Norway"
          />
        </Grid.Col>
        <Grid.Col
          span={12}
          sm={6}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Group pb="xs" position="apart">
            <Title order={5} className={classes.cardTitle}>
              Visiting Tokyo
            </Title>

            <Text
              color="indigo"
              weight={800}
              size="xs"
              style={{ display: "flex", alignItems: "center" }}
            >
              <AiFillCalendar /> 10th May 2022
            </Text>
          </Group>

          <Text
            size="sm"
            pb="xl"
            style={{ color: secondaryColor, lineHeight: 1.5 }}
            lineClamp={3}
          >
            Beginning its existence as a center of postwar black-market
            activity, Akihabara later became the showcase of Japanese tech,
            jam-packed with shops selling all kinds of electronics and IT to the
            world.
          </Text>

          <Group position="apart">
            <Text
              size="sm"
              color="dimmed"
              style={{ display: "flex", alignItems: "center" }}
            >
              <FaMapMarkerAlt />
              Tokyo
            </Text>
            <AvatarsGroup limit={2} total={7}>
              <Avatar
                src="https://randomuser.me/api/portraits/women/51.jpg"
                component="a"
                href="https://github.com/rtivital"
              />
              <Avatar src="https://randomuser.me/api/portraits/men/54.jpg" />
            </AvatarsGroup>
          </Group>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
export default Home;
