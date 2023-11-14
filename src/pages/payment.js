import React from "react";
import { PaymentComponent } from "@/components";

const Payment = () => {
  return (
    <>
      <PaymentComponent />
    </>
  );
};
export function getStaticProps() {
  return {
    props: {
      hasSubheader: false,
      hasFooter: false,
    },
  };
}
export default Payment;
