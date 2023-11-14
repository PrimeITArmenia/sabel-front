import React from "react";

import { AboutComponent} from "@/components";

const AboutHome = () => {
  return (
    <>
      <AboutComponent />
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

export default AboutHome;
