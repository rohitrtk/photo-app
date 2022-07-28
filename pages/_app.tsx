import { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import { useUserData } from "../hooks";
import { UserContext } from "../lib/context";
import { AuthContextProvider } from "../context/AuthContext";
import Layout from "../components/Layout";

import "@fontsource/alice";

const theme = extendTheme({
  fonts: {
    heading: `'Alice', serif`,
    body: `'Alice', serif`
  }
});

const App = ({ Component, pageProps, router }: AppProps) => {

  const { user, username } = useUserData();

  return (
    <ChakraProvider theme={theme}>
      <UserContext.Provider value={{ user, username }}>
        <Layout>
          <AnimatePresence exitBeforeEnter>
            <Component {...pageProps} key={router.pathname} />
          </AnimatePresence>
        </Layout>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;