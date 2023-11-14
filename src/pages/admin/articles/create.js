
import React from "react";
import Layout from "@/components/layout/DefaultLayout.js";
import { DashboardCreateArticle } from "@/components";

const Page = () => {

  return (
      <DashboardCreateArticle />
  );
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;
