import React from "react";
import { CiaoJhon } from "@/components";

const PageCiao = () => {
  return (
    <>
      <CiaoJhon />
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
}

export default PageCiao;
