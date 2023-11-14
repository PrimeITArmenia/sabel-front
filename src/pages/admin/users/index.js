import React from "react";
import Layout from "@/components/layout/DefaultLayout.js";
import { DashboardUsers } from "@/components";

const Page = () => {
  return <DashboardUsers />;
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
