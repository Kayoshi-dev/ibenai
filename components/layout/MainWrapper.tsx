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
} from "@mantine/core";
import Link from "next/link";
import { useState } from "react";
import { createStyles } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

const useStyles = createStyles((theme) => {
  return {
    menuTitle: {
      fontSize: "5rem",
      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        fontSize: "3.2rem",
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
            Mon blog
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
        </MediaQuery>
      </Group>

      <Collapse in={opened}>
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
      </Collapse>

      {children}
    </Container>
  );
}
