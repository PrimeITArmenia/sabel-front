import React from "react";
import {
  
  WanderlustLeyout,
 
} from "@/components";

const PageWanderlust = () => {
  return (
    <>
      <WanderlustLeyout />
    </>
  );
};
export function getStaticProps() {
  return {
    props: {
      hasSubheader: true,
      hasFooter: false,
    },
  };
};

export default PageWanderlust;
