import { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import { AuthContextProvider } from "../context/AuthContext";
import Layout from "../components/Layout";

import "@fontsource/alice";

const theme = extendTheme({
  fonts: {
    heading: `'Alice', serif`,
    body: `'Alice', serif`
  }
});

const App: React.FC<AppProps> = ({ Component, pageProps, router }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <Layout>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.pathname} />
          </AnimatePresence>
        </Layout>
      </AuthContextProvider>
    </ChakraProvider>
  );
}

export default App;