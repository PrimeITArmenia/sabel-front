import Container from "react-bootstrap/Container";
import style from "./post.module.scss";
import Image from "react-bootstrap/Image";
import {  Form } from "react-bootstrap";
import React, {useEffect} from "react";
import { useState } from "react";
import { getSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import axios from 'axios'
import {url} from "@/api"
import {useRouter} from "next/router";

function PostComponent({ data, color = false }) {

  const router = useRouter()
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [showHeart, setShowHeart] = useState(color);
  const [articleId, setArticleId] = useState(color);

  // const articleId = data._id;

  useEffect(() => {
    setArticleId(data?._id)
    setComments(data.comments )
  }, [data]);
  const notify = () =>
    toast("Please Sign In", {
      duration: 4000,
      position: "top-right",
      icon: "😊",
      iconTheme: {
        primary: "#000",
        secondary: "#ff7c65",
      },
    });

  async function handleSendClick() {
    const session = await getSession();
    if (session) {
      const token = session?.user?.token?.accessToken;
      const body = {
        content: comment,
        articleId,
      };
      const response = await fetch(`${url}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        setComment("");
        const response = await fetch(
          `${url}/comments/article/${articleId}`
        );
        const updatedComments = await response.json();
        setComments(updatedComments);
      } else {
        console.log("Error");
      }
    } else {
      console.log("The user is not authenticated, handle accordingly");
    }
  }

  async function handleAddToFavorite() {
    const session =  await  getSession();
    const token = session?.user?.token?.accessToken;
    
    if ( session ) {
      try {
        const response = await axios.post(`${url}/articles/${articleId}`, null,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              }},
          );
        if( response.status === 200 ) {
          setShowHeart(!color);
          toast(`${response.data.message}`, {
            duration: 4000,
            position: "top-right",
            icon: "😊",
            iconTheme: {
              primary: "#000",
              secondary: "#ff7c65",
            },
          })
        }
        console.log('response-favorite', response)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } else {
      console.log("Please sign in");
      toast("Please sign in");
    }
  }

  async function handleCorrectTags(tag){
      await router.push({
        pathname: `/tags/${tag._id}`,
        query: { data: JSON.stringify(tag) }
      }
      ,)
  }

  return (
    <section className={style.post_section}>
      <Container fluid className={`px-2 pb-5 d-flex flex-column align-items-center ${style.post_header}`}>

        <h1 className="">{data?.name}</h1>
        <h5 className="d-flex">{ data?.updatedAt.slice(0,10) }</h5>

        <h5>
          {
            data?.tags?.map((tag) =>
                  <span className="text-primary" onClick={()=>handleCorrectTags(tag)} style={{cursor:'pointer'}}>
                    {tag?.name} { "      " }
                  </span>
          )}
        </h5>
        <Container className={` ${style.image_icons_body}`}>

          <div className={style.icons_box}>
            <Toaster />

            <a onClick={ ()=>handleAddToFavorite() }>
              <img src={ showHeart ? "../assets/icons/heart-icon.svg" : "../assets/icons/heart.svg"} width={20} height={20} alt=""/>
            </a>

            <a>
              <img src="../assets/icons/facebook.svg" width={24} height={24} alt=""/>
            </a>

            <a>
              <img src="../assets/icons/twitter.svg" width={24} height={24} alt=""/>
            </a>

            <a>
              <img src="../assets/icons/instagram.svg" width={24} height={24} alt=""/>
            </a>

            <a>
              <img src="../assets/icons/link.svg" width={24} height={24} alt=""/>
            </a>
          </div>
          <img src={data?.image} height={1068} width={860} alt="" className="object-fit-contain img-fluid"/>

        </Container>

        <div dangerouslySetInnerHTML={{ __html: data?.content
            .replace(
            /<img/g,
            '<img  style="width: 850px; height: 600px; padding-top:30px; margin-bottom:30px; display:block; " ',)
            .replace(
                /<p(.*?)>/g,
                '<p$1 style="font-size: 2em; text-align: center; margin: 3rem;">'
            )
        }}
        />
          <div className={`${style.post_comment} `}>
            <div className={`${style.post_comment_view_push}`}>

              <Form className="position-relative">
                <Form.Group
                  className={`${style.post_commit_form_group} mb-3 position-relative`}
                  controlId="exampleForm.ControlTextarea1"
                  placeholfer="comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Leave a comment here"
                    value={comment}/>
                  <div onClick={handleSendClick} className={`${style.post_comment_icon} position-absolute `}>
                    <Image
                      src="../assets/icons/comment-icon.svg"
                      alt="comment-message"
                      width={24}
                      height={24}/>
                  </div>

                </Form.Group>
              </Form>

            </div>
            {
              comments.length > 0 ?(
                  comments?.map((item) => {
                      return (
                        <div className={style.post_all_comment_view}>
                          <div className={`${style.post_comment_view}`}>
                            <div className={`${style.peronal_icon}`}>
                              <Image
                                src="../assets/icons/user-icon.svg"
                                alt="perosonal_icon"
                                width={40}
                                height={40}/>
                            </div>
                            <div className={`${style.post_date_comment}`}>
                              <div className={style.post_comment_date_username}>
                                <span className="text-uppercase text-primary">
                                  {item?.userId?.name}
                                </span>
                                <span style={{fontSize:'13px', fontWeight:'600', color:'gray'}}> {item.createdAt.slice(0,10)}/{item.createdAt.slice(11,16)}</span>
                              </div>
                              <div className={style.post_comment_user_comment}>
                                <p>{item?.content }</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      )})
              ) : ""
            }
          </div>
      </Container>
    </section>
  );
}

export default PostComponent;
