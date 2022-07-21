import { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import Layout from "../components/Layout";

import "@fontsource/alice";

const theme = extendTheme({
  fonts: {
    heading: `'Alice', serif`,
    body: `'Alice', serif`
  }
});

const App: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <AnimatePresence exitBeforeEnter>
          <Component {...pageProps} />
        </AnimatePresence>
      </Layout>
    </ChakraProvider>
  );
}

export default App;