import React from "react";
import { ExchangePassord } from "@/components";

const  ExchangePassordPage = ({ token }) => {
  return (
    <>
      <ExchangePassord token={token}/>
    </>
  );
};

 async function getServerSideProps(context) {
    const token = context.params.token;
   
    return {
      props: {
        token,
        hasSubheader: true,
        hasFooter: true,
      },
    };
  }

export default ExchangePassordPage;

