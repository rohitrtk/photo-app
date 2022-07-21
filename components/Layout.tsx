import React, { ReactNode } from "react";
import Head from "next/Head";
import Navbar from "./Navbar";

interface Props {
  children: ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Photo App</title>
      </Head>
      <Navbar />
      {children}
    </>
  );
}

export default Layout;