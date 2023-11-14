import style from "./subheader.module.scss";
import {  Navbar, Nav, NavLink } from "react-bootstrap";
import Link from "next/link";
import { useState, useEffect } from "react";
import {url} from '@/api'
import axios from 'axios'
import Loading from '../loading/index'

function Subheader() {

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect( () => {
       fetchCategory()
  }, []);

  async function fetchCategory (){
      try{
        const response  = await axios.get(`${url}/categories` )
        setCategories(response.data)
        setIsLoading(true)
    }catch (err){
        console.log('error---subheader', err)
      }
 }


  return (
      <>
          {
              !isLoading ? (
                     <Loading/>
              ) : (
                  <Navbar className={style.subheader_navbar}>
                      <Nav className={`justify-content-between  w-100 `}>
                          {
                              categories.map((category) => {
                                  return (
                                      <NavLink href={`/category/${category.id}`} className="nav-item " as={Link} key={category.id}>
                                          {category.name}
                                      </NavLink>
                                  )}
                              )
                          }
                      </Nav>
                  </Navbar>
             )
          }
      </>

  );
}

export default Subheader;
