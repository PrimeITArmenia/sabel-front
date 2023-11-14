import React from "react";

import { SignUp } from "@/components";

const PageSignUp = ({}) => {
  return (
    <>
      <SignUp />
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

export default PageSignUp;
