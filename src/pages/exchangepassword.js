import React from "react";
import { ExchangePassord } from "@/components";

const  ExchangePassordPage = () => {
  return (
    <>
      <ExchangePassord />
    </>
  );
};
  export function getStaticProps() {
  return {
    props: {
      hasSubheader: false,
      hasFooter: false,
    },
  };
};

export default ExchangePassordPage;

