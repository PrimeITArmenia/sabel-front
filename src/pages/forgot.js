import React from "react";
import {ForgotPassword } from "@/components";

const PageForgotPassword = () => {
  return (
    <>
      <ForgotPassword />
    </>
  );
};
export function getStaticProps() {
  return {
    props: {
      // hasSubheader: true,
      hasFooter: true,
    },
  };
};

export default PageForgotPassword;
