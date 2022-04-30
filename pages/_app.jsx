import Head from "next/head";
import { MantineProvider, ColorSchemeProvider, Global } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "../styles/global.scss";
import MainWrapper from "../components/layout/MainWrapper";
import AuthLayout from "../components/layout/AuthLayout";
import { useState } from "react";

const layouts = {
  main: MainWrapper,
  auth: AuthLayout,
};

export default function MyApp(props) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState("light");
  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
  const Layout =
    (layouts[Component.layout] ? layouts[Component.layout] : layouts.main) ||
    ((children) => <>{children}</>);

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme,
            headings: {
              fontFamily: "Inter, sans-serif",
            },
            fontFamily: "Inter, sans-serif",
            defaultRadius: "md",
            white: "#eff2f5",
          }}
        >
          <ModalsProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ModalsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
