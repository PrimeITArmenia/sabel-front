import {

  Home,
} from "@/components";
// import { Container, Row, Col } from "react-bootstrap";

export default function Index() {
  return (
    <>
      <Home />
    </>
  );
  };
export function getStaticProps() {
  return {
    props: {
      hasSubheader: true,
      hasFooter: true,
    },
  };
};


