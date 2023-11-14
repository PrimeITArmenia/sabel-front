import React from "react";

import { PostComponent } from "@/components";

const PostPage = () => {
  return (
    <>
      <PostComponent />
    </>
  );
};
 function getStaticProps() {
  return {
    props: {
      hasSubheader: true,
      hasFooter: true,
    },
  };
}

export default PostPage;
