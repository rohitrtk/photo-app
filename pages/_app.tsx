import { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import UserContextProvider from "../lib/context";
import Layout from "../components/Layout";

import "@fontsource/alice";

const theme = extendTheme({
  fonts: {
    heading: `'Alice', serif`,
    body: `'Alice', serif`
  }
});

const App = ({ Component, pageProps, router }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <UserContextProvider>
        <Layout>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.pathname} />
          </AnimatePresence>
        </Layout>
      </UserContextProvider>
    </ChakraProvider>
  );
}

export default App;