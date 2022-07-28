import React, { ReactNode } from "react";
import Head from "next/Head";
import Navbar from "./Navbar";

interface ILayout {
  children: ReactNode;
}

const Layout = ({ children }: ILayout) => {
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