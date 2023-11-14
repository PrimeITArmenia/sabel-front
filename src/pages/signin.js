import React from "react";
import { SignIn } from "@/components";

const PageSignIn = () => {
  return (
    <>
      <SignIn />
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

export default PageSignIn;

