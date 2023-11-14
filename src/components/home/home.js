"use client"
import ReadMoreReact from 'read-more-react';
import { Container } from "react-bootstrap";
import style from "./home.module.scss";
import CardsList from "./../cards-list";
import { useState, useEffect } from "react";
import Loading from "../loading/index"
import {url} from  '@/api'
import axios from 'axios'
function Home() {
  const [data, setData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading ] = useState(false)

  useEffect(() => {
    fetchData(`${url}/homepage`).then((res)=>{
      setIsLoading(true)
    })
    fetchArticles(`${url}/articles/home`)
  }, []);


  const fetchData = async( url ) => {
    try {
      const response = await axios.get(url);
      console.log('response-data', response)
      setData( response?.data );
      setIsLoading(true)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchArticles= async ( url ) => {
    try{
      const response = await axios.get(url)
      setArticles(response.data)
      console.log('response-article', response)
    }catch(err){
      console.log('error - fetching - set-articles', err)
    }
  }


  const array = [
    {
      hasBg: "assets/images/post_image_1.webp",
      title: "Fara Homidi beauty",
      text: "Afghan-born, and raised in the San Francisco suburbs, Fara Homidi's first foray into fashion and beauty came from the glut of ...",
    },
    {
      hasBg: "assets/images/wanderlust-image2.webp",
      title: "Title goes here",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
    },
    {
      hasBg: "assets/images/wanderlust-image1.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
    },
  ];

  return (
    <section className={` px-5 ${style.home_section}`}>
      {
        !isLoading ? (
            <Loading/>
        ) : (
             <div className=" d-flex align-items-center flex-column">

                <h1 className="display-1">
                  {data?.homePage?.headerTitle}
                </h1>

                <div className={style.home_image_one} style={{
                  backgroundImage: `url(${data?.homePage?.headerImage})`,}}>
                </div>

                <div  style={{cursor:"pointer"}}>
                    <h2 className="display-2 pt-5">
                      { data?.homePage?.headerSubtitle}
                    </h2>
                    <p className="display-4 py-2">
                      { data?.homePage?.headerAuthor }
                    </p>
                      { data?.homePage?.headerText }{" "}
                          <ReadMoreReact text={data?.homePage?.headerText}
                                         min={150} ideal={250} max={1920}
                                         readMoreText="Read More... "/>
                </div>

                <div className="pt-5">
                  <CardsList equal={false} array={array} />
                </div>

                <div className={`${style.home_image_two}`} style={{
                  backgroundImage: `url(${data?.homePage?.footerImage})`,}}>
                </div>{" "}

                <Container fluid className={`d-flex align-items-center flex-column ${style.home_body}`}>

                  <h1 className={`display-1 ${style.home_body_header}`}>
                    {data?.homePage?.footerTitle}
                  </h1>
                  <p className={`${style.home_image_about} display-4 p-3`}>
                    {data?.homePage?.footerAuthor}
                  </p>
                  <p className={`${style.home_body_text}`}>
                    {data?.homePage?.footerText}
                  </p>

              </Container>

            </div>
        )
      }
    </section>
  );
}

export default Home;
