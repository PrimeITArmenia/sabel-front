'use client'

import React from "react";
import { useState, useEffect } from "react";
import Layout from "@/components/layout/DefaultLayout.js";
import { DashboardCreateArticle } from "@/components";
import { useRouter } from 'next/router';
import {url} from '@/api'

const Page = () => {
  const router = useRouter();
  const { id } = router.query;
  const [ data, setData ] = useState({});

  useEffect(() => {
    try {
        fetch(`${url}/articles/${id}`)
            .then((res) => res.json())
            .then((res) => {
              setData(res)
            })
    } catch(error) {
        console.log(error)
    }
  }, [id])
  
  
  return <DashboardCreateArticle data={data} />;
};

Page.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};

export default Page;

