import { AppProps } from "next/app";
import Head from "next/head";
import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import "../styles/global.scss";

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Page title</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          colorScheme: "light",
          headings: {
            fontFamily: "Inter, sans-serif",
          },
          fontFamily: "Inter, sans-serif",
        }}
      >
        <ModalsProvider>
          {/*<MainWrapper>*/}
          <Component {...pageProps} />
          {/*</MainWrapper>*/}
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}
