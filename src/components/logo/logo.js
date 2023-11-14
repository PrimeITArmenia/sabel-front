import Image from "next/image";
import { Navbar } from "react-bootstrap";
import Animate from "../animate";
import style from "./logo.module.scss";

function Logo() {
  return (
    <Animate delay={0} animateIn="animate__fadeIn">
      <Image src={`/assets/images/logo.webp`} width={122} height={55} alt="" />
    </Animate>
  );
}

export default Logo;
