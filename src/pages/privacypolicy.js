import React from "react";
import { PrivacyPolicyComponent } from "@/components";

const PrivacyPolicy = () => {
  return (
    <>
      <PrivacyPolicyComponent />
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
}

export default PrivacyPolicy;
