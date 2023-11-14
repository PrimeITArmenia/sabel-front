import React from "react";
import Layout from "@/components/layout/DefaultLayout.js";
import { DashboardProfile } from "@/components";

const Page = () => {
  return <DashboardProfile />;
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
