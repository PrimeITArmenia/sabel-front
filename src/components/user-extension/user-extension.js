"use client";

import style from "./user-extension.module.scss";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import axios from 'axios'
import {url} from '@/api'

function UserExtensions() {
  const router = useRouter();
  const session = useSession();

  const [show, setShow] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [userRole, setUserRole] = useState("")
  // const [searchItem, setSearchItem] = useState('')
  // const isCategory =  router.pathname.includes('/category');

  const handleSearchClick = () => {
    // setIsSearchActive(true);
  };
  const handleSearchClose = () => {
    setIsSearchActive(false);
  };
  useEffect(() => {
    if( session?.data?.user ){
      setUserRole(session.data.user?.role)
    }
  }, );
  const handleClose = () => setShow(false);


  const handleShow = async () => {
      setShow(true)
  };

  const handleSignInOrLogOut = async () => {
    console.log('click---', userRole)
     await signOut({ callbackUrl: "/signin" })
  }

  return (
      <div>
        <div className="d-none d-lg-flex">
          {
            userRole === 'admin' && (
                <Link className="nav-item px-4" href="/admin/articles">
                  <Image
                      src={"/assets/icons/dashboard-icon.svg"}
                      width={20}
                      height={20}
                      alt=""/>
                </Link>
              )
          }
          {/*{*/}
          {/*    isCategory && (*/}
          {/*        <Button onClick={handleShow} variant="" className={`${style.button_search_line} nav-item px-4`}>*/}
          {/*          <Image*/}
          {/*              src={"/assets/icons/serch-icon.svg"}*/}
          {/*              width={20}*/}
          {/*              height={20}*/}
          {/*              alt=""/>*/}
          {/*      </Button>*/}
          {/*)}*/}
          <Link className="nav-item px-4" href="/favorites">
            <Image
                src={"/assets/icons/heart-gray-icon.svg"}
                width={20}
                height={20}
                alt=""/>
          </Link>

          {
            userRole === 'user' && (
                <Link className="nav-item px-4" href="/profile" >
                  <Image
                      src={"/assets/icons/user-icon.svg"}
                      width={20}
                      height={20}
                      alt=""/>
                </Link>
              )
          }

          <div className="nav-item px-4"  onClick={()=>handleSignInOrLogOut()}>
            <Image
                src={"/assets/icons/log-out.svg"}
                width={20}
                height={20}
                alt=""/>
          </div>

              {/*<Modal show={show} onHide={handleClose} className={style.modal_saerch}>*/}
              {/*  <form className={`${style.searchBox} ${isSearchActive ? style.active : "" }`}>*/}

              {/*    <input type="text"*/}
              {/*           placeholder="Search..."*/}
              {/*           value={searchItem}*/}
              {/*           onChange={(e)=> setSearchItem(e.target.value)}*/}
              {/*    />*/}

              {/*    <Button variant="secondary" onClick={handleClose}>*/}
              {/*      <Image*/}
              {/*          src={"/assets/icons/serch-gray-icon.svg"}*/}
              {/*          width={20}*/}
              {/*          height={20}*/}
              {/*          alt=""/>*/}
              {/*    </Button>*/}

              {/*  </form>*/}
              {/*</Modal>*/}
        </div>
      </div>
  )

}

export default UserExtensions;


