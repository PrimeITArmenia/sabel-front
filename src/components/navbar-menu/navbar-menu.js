"use client";

import {  Nav,  NavLink } from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signOut } from "next-auth/react";
import style from "./navbar-menu.module.scss";
import { useSession } from "next-auth/react";
import {useRouter} from "next/router";
import {url} from '@/api'
import axios from 'axios'

function NavbarMenu(close) {
  const router = useRouter()
  const [categories, setCategories] = useState([]);
  const session = useSession();
  const [userRole, setUserRole] = useState(null)
  const [token, setToken] = useState("")

////////////////////////////////////////////////////////////
  async function handleLogOut() {
    if(token){
      await signOut({ callbackUrl: "/" });
    }else{
     await router.push("/signin")
    }
  }
  ////////////////////////////////////////////////////////////
  //   get user

  useEffect(() => {
    if( session.status === "authenticated"){
      setUserRole(session?.data?.user.role)
      setToken(session.data?.user?.token?.accessToken)
    }
  },[]);

  ////////////////////////////////////////////////////////////
  //   get category

  useEffect(() => {
    axios.get(`${url}/categories`)
      .then((response) => {
        setCategories(response.data) ;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  ////////////////////////////////////////////////////////////

  return (
      <Nav className={` ${style.subheader_navbar}`}>
        {
          categories.map((category) =>(
              <NavLink className="nav-item d-lg-none" href={`/category/${category.id}`} as={Link} key={category.id}>
                {category.name}
              </NavLink>
          ))
        }
        <NavLink className={`nav-item px-4 ${style.subheader_navbar_items}`} href="/about"  >
          ABOUT
        </NavLink>

        <NavLink className={`nav-item px-4  d-lg-none ${style.subheader_navbar_items}`} href="/favorites"  >
          FAVOURITES
        </NavLink>

        {
            userRole === 'user' && (
              <NavLink className={`nav-item px-4 d-lg-none ${style.subheader_navbar_items}`} href="/profile"  >
                PROFILE
              </NavLink>
            )
        }
        <NavLink className={`nav-item px-4 ${style.subheader_navbar_items}`} href="/membership"  >
          MEMBERSHIP
        </NavLink>

        <div onClick={handleLogOut} className={`nav-item px-4 d-lg-none ${style.subheader_navbar_items} `} >
          { token ? "Log Out" : "Sign In"}
        </div>

        {/*<div className="input-group d-lg-none">*/}

        {/*  <button className="border-start-0 border bg-quaternary" type="button">*/}
        {/*    <img src="assets/icons/serch-gray-icon.svg" alt={""} className="btn border-start-0"/>*/}
        {/*  </button>*/}

        {/*</div>*/}

      </Nav>

  )
}

export default NavbarMenu;
