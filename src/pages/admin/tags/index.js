import React from "react";
import Layout from "@/components/layout/DefaultLayout.js";
import { DashboardTags } from "@/components";

const Page = () => {
  return <DashboardTags />;
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
