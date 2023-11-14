"use client";
import NoSSR from "react-no-ssr";
import style from "./article-box.module.scss";
import ArticleItem from "../articles-item/articles-item";
import { Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import { fetcher } from '../../utils/fetcher.js';
import axios from "axios";
import classNames from "classnames";
import Loading from '../loading/index'


function ArticleBox({ type, onChange, setUpdate, update, forOnChangeTypeButton }) {

  const [totalPages, setTotalPages] = useState(1);
  const [articles, setArticles] = useState([]);
  const [headers, setHeaders] = useState([])
  const [countPage, setCountPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  
  useEffect(() => {
    if (type === 'article') {
       fetchArticles();
    } else if (type === 'category') {
      console.log('fetch-', type)
       fetchCategories();

    } else if (type === 'tag') {
      console.log('fetch-', type)
       fetchTags();

    } else if (type === 'user') {
      console.log('fetch-', type)
       fetchUsers();
    }
  }, [setUpdate, update]);

  useEffect(() => {
    const foo = async () =>{
      if (type === 'article') {
        await fetchArticles();
      } else if (type === 'category') {
        await fetchCategories();
      } else if (type === 'tag') {
       await fetchTags();
      } else if (type === 'user') {
       await fetchUsers();
      }
    }
    foo()
  }, [type])

  const fetchArticles = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/articles/getall',{
      });
      const data = await response.json();
      let filterData = filterHeadersTitle(data.articles)
      setHeaders(filterData)
      setArticles(data.articles);
      setTotalPages(data.totalPages);
      setIsLoading(true)
    } catch (error) {
      console.error('Error fetching articles:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/categories/getall');
      const data = await response.json();
      let filterData = filterHeadersTitle(data)
      setHeaders(filterData)
      setArticles(data);
      setIsLoading(true)
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }

  const fetchTags = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/tags/getall' );
      const data = await response.json();
      let filterData = filterHeadersTitle(data.tags)
      setHeaders(filterData)
      setArticles(data.tags);
      setTotalPages(data.totalPages);
      setIsLoading(true);
    } catch (error) {
      console.error('Error fetching tags:', error);
    }
  }

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/getall' );
      const data = await response.json();
      let filterData = filterHeadersTitle(data.users)
      setHeaders(filterData)
      setArticles(data.users);
      setTotalPages(data.totalPages);
      setIsLoading(true);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  }

  const handleDeleteSuccess = async() => {
    if (type === 'article') {
      await fetchArticles();
    } else if (type === 'category') {
      await fetchCategories();
    } else if (type === 'tag') {
      await fetchTags();
    }
  }

  function filterHeadersTitle  (values){
    const computedHeaders = Object.keys(values[0]).filter((item) => item !== "_id" && item !== "id" && item !== 'articles' && item !== 'content')
    computedHeaders.push("***");
    return computedHeaders
  }

  async function handlePageFetch(pageNumber){
    setIsLoading(!isLoading)
    let pathForBlack ;

    if(type === 'article'){
      pathForBlack = 'articles'
    }else if(type === 'tag'){
      pathForBlack = 'tags'
    }

    if( countPage + pageNumber > totalPages ) {
      setIsLoading(true)
      return console.log('return ')
    }

    if ((pageNumber > 0) || (countPage > 1 && pageNumber < 0  ) ) {
      setCountPage(prevState => prevState + pageNumber);
    }

    const newPageNumber = countPage + pageNumber >= 1 ? countPage + pageNumber : 1;

    if ( newPageNumber >= 1 ) {
      try {
        const response = await axios.get(`http://localhost:3000/api/${pathForBlack}/getall?page=${newPageNumber}`);
        if( type === 'article'){
          setArticles([...response.data.articles]);
          setIsLoading(true)
        }else if(type === 'tag'){
          setArticles([...response.data.tags]);
          setIsLoading(true)
        }
      } catch (error) {
        setIsLoading(false)
        console.error('Error fetching articles:', error);
      }
    } else {
      setIsLoading(false)
      console.log('No more pages to fetch.');
    }
  }



  return (
    <Container fluid className={style.aticle_box}>
      <NoSSR>
        {
          !isLoading ? (
              <Loading/>
          ) : (
              <NoSSR>
                <table className={`table text-center bg-quaternary ${style.article_box_table}`}>
                  <thead>
                  <tr className={`${style.article_box_header}`}>
                    {
                        headers.length > 0 && (
                            headers.map( ( header_item, index) => (
                                <th key={index} scope="col" >
                                  {header_item}
                                </th>
                            )))
                    }
                  </tr>
                  </thead>
                  <tbody >
                  <NoSSR>
                    {
                      articles.map((item, index) => (
                          <NoSSR key={item.id}>

                            <ArticleItem type={type} headers={headers} item={item} key={index} handleDeleteSuccess={handleDeleteSuccess}
                                         onChange={onChange} forOnChangeTypeButton={forOnChangeTypeButton}/>
                          </NoSSR>
                      ))
                    }
                  </NoSSR>
                  </tbody>
                </table>
                {
                  articles.length > 0 && (  type === 'article' || type === 'tag' || type ==='user' || type === 'category') ? (
                      articles &&
                      <div className={style.countPagination}>
                        <div className={style.containerPagination}>
                          <span className={classNames( countPage === 1 ?  style.pageIconDisable : style.pageIconEnable)} onClick={()=>handlePageFetch(-1)}>{" < "} </span>
                          <span className={style.countPage}> {countPage} </span>
                          <span className={classNames( countPage === totalPages ?  style.pageIconDisable : style.pageIconEnable)} onClick={()=>handlePageFetch(1)}>  {" > "}</span>
                        </div>
                      </div>
                  ) : ""
                }
              </NoSSR>
          )
        }
      </NoSSR>
    </Container>
  );
}

export default ArticleBox;