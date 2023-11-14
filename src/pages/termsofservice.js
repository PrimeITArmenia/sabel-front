import React from "react";
import {

  TermsOfServiceComponent,

} from "@/components";

const TermsOfService = () => {
  return (
    <>
      <TermsOfServiceComponent />
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

export default TermsOfService;
