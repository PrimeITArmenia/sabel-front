import React from "react";
import Layout from "@/components/layout/DefaultLayout.js";
import { DashboardCategories } from "@/components";

const Page = () => {
  return <DashboardCategories title="Categories" />;
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
