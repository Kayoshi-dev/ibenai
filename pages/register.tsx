import {
  ActionIcon,
  Center,
  Container,
  Divider,
  Grid,
  Group,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core"
import Image from "next/image"
import RegisterForm from "../components/forms/RegisterForm"
import { FcGoogle } from "react-icons/fc"
import { BsFacebook, BsTwitter } from "react-icons/bs"
import OAuthButton from "../components/buttons/OAuthButton"
import { MoonIcon, SunIcon } from "@radix-ui/react-icons"

export default function Register() {
  const theme = useMantineTheme()

  return (
    <Container fluid style={{ padding: 0 }}>
      <Grid gutter={0} style={{ height: "100vh", position: "relative" }}>
        <Grid.Col span={5}>
          <Center
            style={{ height: "100%" }}
            sx={(theme) => ({ padding: theme.spacing.xl })}
          >
            <div className="register-form" style={{ width: "70%" }}>
              <Title
                sx={(theme) => ({
                  fontSize: "4em",
                  textAlign: "center",
                  marginBottom: theme.spacing.md,
                })}
              >
                Register
              </Title>

              <Title
                order={2}
                sx={(theme) => ({
                  marginBottom: theme.spacing.md,
                  color: theme.colors.gray[7],
                })}
              >
                Join Ibenai today and start organizing your future events.
              </Title>

              <RegisterForm />

              <Divider my="xs" label="OR" labelPosition="center" />

              <Group position="center" direction="column">
                <OAuthButton
                  provider="Facebook"
                  link="https://facebook.com"
                  icon={
                    <BsFacebook
                      style={{
                        marginLeft: theme.spacing.xs,
                        color: "#4267B2",
                      }}
                    />
                  }
                />

                <OAuthButton
                  provider="Twitter"
                  link="https://twitter.com"
                  icon={
                    <BsTwitter
                      style={{
                        marginLeft: theme.spacing.xs,
                        color: "#1DA1F2",
                      }}
                    />
                  }
                />

                <OAuthButton
                  provider="Google"
                  link="https://google.fr"
                  icon={<FcGoogle style={{ marginLeft: theme.spacing.xs }} />}
                />
              </Group>
            </div>
          </Center>
        </Grid.Col>
        <Grid.Col span={7} style={{ position: "relative" }}>
          <Image
            src="https://images.unsplash.com/photo-1508238166958-2d1444b4ae3a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format"
            layout="fill"
            alt="Background Image"
            objectFit="cover"
            priority
          />
        </Grid.Col>
      </Grid>
    </Container>
  )
}
