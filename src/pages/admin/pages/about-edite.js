import React from "react";
import Layout from "@/components/layout/DefaultLayout.js";
import { DashboardCreateAbout } from "@/components";

const Page = () => {
  const data = {
    content: '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'
  }
  return <DashboardCreateAbout data={data} />;
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
