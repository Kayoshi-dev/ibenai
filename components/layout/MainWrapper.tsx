import {
  Container,
  Title,
  Group,
  Text,
  useMantineTheme,
  MediaQuery,
  Burger,
  Collapse,
  ActionIcon,
  useMantineColorScheme,
  Avatar,
  Menu,
  Divider,
  TextInput,
  Box,
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  ChatBubbleIcon,
  GearIcon,
  ImageIcon,
  MagnifyingGlassIcon,
  PersonIcon,
  PinRightIcon,
  TrashIcon,
  MoonIcon,
  SunIcon,
} from "@radix-ui/react-icons";
import { BiSearchAlt2 } from "react-icons/bi";

const useStyles = createStyles((theme) => {
  return {
    menuTitle: {
      fontSize: "5rem",
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        fontSize: "3.2rem",
      },
    },
    hoverSearchIcon: {
      color: theme.colors.gray[5],

      "&:hover": {
        cursor: "pointer",
      },
    },
  };
});

export declare interface ICustomNavbarProps {
  children: JSX.Element;
}

export default function CustomNavbar({ children }: ICustomNavbarProps) {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();
  const { classes } = useStyles();
  const superiorMedium = useMediaQuery(
    `(min-width: ${theme.breakpoints.md}px)`
  );
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const dark = colorScheme === "dark";

  // Automatically close the burger if the user gets somehow a larger screen (maybe by switching to the landscape format I dunno stop reading that omg)
  if (superiorMedium && opened) {
    setOpened(false);
  }

  return (
    <Container
      size="xl"
      sx={(theme) => ({
        paddingTop: theme.spacing.md,
      })}
    >
      <Group position="apart" sx={{ marginBottom: theme.spacing.xl }}>
        <Link href="/" passHref>
          <Title
            order={1}
            className={classes.menuTitle}
            sx={(theme) => ({
              "&:hover": {
                cursor: "pointer",
                textDecoration: "underline",
                color: theme.colors.blue[6],
              },
              transition: "all .2s",
            })}
          >
            いべない！
          </Title>
        </Link>

        <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
          <MediaQuery largerThan="md" styles={{ display: "none" }}>
            <Burger
              opened={opened}
              onClick={() => setOpened((o) => !o)}
              size="md"
              color={theme.colors.dark[6]}
              mr="xl"
            />
          </MediaQuery>
        </div>

        <MediaQuery smallerThan="md" styles={{ display: "none" }}>
          <Group position="apart" spacing="xl">
            <TextInput
              classNames={{ rightSection: classes.hoverSearchIcon }}
              placeholder="Search for events"
              rightSection={<BiSearchAlt2 />}
            />
            <Link href="/" passHref>
              <Text
                component="a"
                weight={500}
                sx={(theme) => ({
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.md,
                  "&:hover": {
                    background: dark
                      ? theme.colors.dark[8]
                      : theme.colors.gray[2],
                  },
                  transition: "all .2s",
                })}
              >
                Home
              </Text>
            </Link>

            <Link href="/" passHref>
              <Text
                component="a"
                weight={500}
                sx={(theme) => ({
                  padding: theme.spacing.xs,
                  borderRadius: theme.radius.md,
                  "&:hover": {
                    background: dark
                      ? theme.colors.dark[8]
                      : theme.colors.gray[2],
                  },
                  transition: "all .2s",
                })}
              >
                About
              </Text>
            </Link>

            <ActionIcon
              color={dark ? "yellow" : "blue"}
              onClick={() => toggleColorScheme()}
              title="Toggle color scheme"
            >
              {dark ? <SunIcon /> : <MoonIcon />}
            </ActionIcon>

            <Menu
              position="bottom"
              transition="scale-y"
              transitionDuration={100}
              transitionTimingFunction="ease"
              control={
                <Avatar
                  radius="xl"
                  sx={() => ({
                    "&:hover": {
                      cursor: "pointer",
                    },
                  })}
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80"
                />
              }
            >
              <Menu.Label>Application</Menu.Label>
              <Menu.Item icon={<PersonIcon />}>My Profile</Menu.Item>
              <Menu.Item icon={<ChatBubbleIcon />}>Messages</Menu.Item>
              <Menu.Item icon={<ImageIcon />}>Gallery</Menu.Item>
              <Menu.Item
                icon={<MagnifyingGlassIcon />}
                rightSection={
                  <Text size="xs" color="dimmed">
                    ⌘K
                  </Text>
                }
              >
                Search
              </Menu.Item>
              <Divider />
              <Menu.Label>Danger zone</Menu.Label>
              <Menu.Item icon={<PinRightIcon />}>Transfer my data</Menu.Item>
              <Menu.Item icon={<GearIcon />}>Parameters</Menu.Item>
              <Menu.Item color="red" icon={<TrashIcon />}>
                Delete my account
              </Menu.Item>
            </Menu>
          </Group>
        </MediaQuery>
      </Group>

      <Collapse in={opened}>
        <Box
          style={{
            zIndex: 5,
            height: "100vh",
            position: "absolute",
            background: "#eff2f5",
            width: "100vw",
          }}
        >
          <Group
            direction="column"
            sx={(theme) => ({
              marginBottom: theme.spacing.lg,
            })}
          >
            <Link href="/" passHref>
              <Text component="a" weight={500}>
                Accueil
              </Text>
            </Link>

            <Link href="/" passHref>
              <Text component="a" weight={500}>
                A propos
              </Text>
            </Link>
          </Group>
        </Box>
      </Collapse>

      {children}
    </Container>
  );
}
