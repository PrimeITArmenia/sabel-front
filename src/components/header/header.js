import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, NavLink } from "react-bootstrap";
import NavbarMenu from "@/components/navbar-menu/index";
import UserExtensions from "@/components/user-extension/index";
import Subheader from "@/components/subheader/index";
import Logo from "@/components/logo/index";
import style from "./header.module.scss";
import Link from "next/link";


const Header = () => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded(!expanded);
  };


  return (
    <Navbar expand="lg" expanded={expanded} fixed="top"
      className={`text-center text-lg-left position-relative ${style.navbar_menu}`}>

      <Navbar.Brand href="/home" className={`mr-lg-auto  ${style.header_navbar_logo}`} as={Link}>
        <Logo />
      </Navbar.Brand>

      <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggle}>
        <img
          src="/assets/icons/button-burger.svg"
          height={24}
          width={24}
          alt=""
        />
      </Navbar.Toggle>

      <Navbar.Collapse id="navbar-nav" className=" justify-content-lg-between">

        <div className="d-lg-none">
          <NavbarMenu close={handleToggle} />
          <UserExtensions />
        </div>

        <Nav className="ml-auto d-lg-flex d-none">
          <NavbarMenu />
        </Nav>

        <Nav className="justify-content-end d-lg-flex d-none">
          <UserExtensions />
        </Nav>

      </Navbar.Collapse>
      {/* </Container> */}
    </Navbar>
  );
};
export default Header;
