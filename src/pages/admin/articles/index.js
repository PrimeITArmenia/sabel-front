"use client";
import React from "react";
import Layout from "@/components/layout/DefaultLayout.js";
import { DashboardArticles } from "@/components";

const Page = () => {
  return <DashboardArticles />;
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

