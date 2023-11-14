import { Membership } from "@/components";
// import { Container, Row, Col } from "react-bootstrap";

export default function Index() {
  return (
    <>

      <Membership />
 
    </>
  );
}
  export function getStaticProps() {
  return {
    props: {
      hasSubheader: true,
      hasFooter: true,
    },
  };
}
