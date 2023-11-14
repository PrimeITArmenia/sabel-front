import React from "react";
import Layout from "@/components/layout/DefaultLayout.js";
import { DashboardPages } from "@/components";

const Page = () => {
  return <DashboardPages />;
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
