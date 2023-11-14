'use client'
import React from "react";

import { Home } from "@/components";

const PageHome = () => {

  return (
    <>
      <Home />
    </>
  );
};
export function getStaticProps() {
  return {
    props: {
      hasSubheader: true,
      hasFooter: true,
    },
  };
};

export default PageHome;
