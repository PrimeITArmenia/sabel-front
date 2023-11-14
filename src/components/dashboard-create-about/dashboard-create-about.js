// "use client";

import style from "./dashboard-create-about.module.scss";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import React from "react";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import dynamic from "next/dynamic";
import {url} from '@/api';
import axios from 'axios';
import {useSession} from "next-auth/react";
import Loading from "../loading/index";
import toast , {Toaster} from "react-hot-toast";
const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

function DashboardCreateAbout() {
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false)
  const [content, setContent] = useState("");
  const token = session.data?.user.token.accessToken;

  const quillModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ align: [] }],
      [{ color: [] }],
      ["code-block"],
      ["clean"],
    ],
  };

  const quillFormats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "align",
    "color",
    "code-block",
  ];

  const handleEditorChange = (newContent) => {
    setContent(newContent);
  };

  useEffect(() => {
    fetch(`${url}/aboutpage`)
      .then(response => response.json())
      .then(data => {
        setContent(data.content)
        setIsLoading(true)
      })
      .catch(error => console.error('Error fetching content:', error));
  }, []);

  //
  async function handleSaveButton() {
    const body = { content }
    setIsLoading(false)
    try {
      const response = await fetch(`${url}/aboutpage`, {
        method: "PATCH",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type' : 'application/json',
          'maxBodyLength': 'Infinity',
        },
        body: JSON.stringify(body),
      });
      console.log(response)
      if(response.status === 200 ){
        setIsLoading(true)
        const data = await response.json();
        toast.success(`${data.message}`)
      }

    } catch (error) {
      console.error('Error fetching data:', error);
    }
    // await fetch(`${url}/aboutpage`, {
    //   method: "PATCH",
    //   headers: {
    //     'Content-Type' : 'application/json',
    //     'Authorization': `Bearer ${token}`,
    //   },
    //   body: JSON.stringify(body),
    // })
    //     .then((response)=>{
    //         console.log('response', response)
    //     })
    //     .catch((err)=>console.log('error', err))
  }


  return (
    <>
      {
        !isLoading ? (
            <Loading/>
        ) : (
            <section className="d-flex">
              <Container fluid className={`${style.container_dashboard_crete_article} bg-dashboard`}>
                <Toaster/>
                <div className={`${style.container_main}`}>
                  <div className={style.crete_article_form}>
                    <Formik>
                      {
                        ({ handleSubmit, handleChange, values, touched, errors }) => (
                            <Col className={`"gap-5 "`}>
                              <Row>
                                <Form className={`"d-flex gap-5 ${style.article_create_form}`}>

                                  <div className={style.tags_row_style}>

                                    <Form.Group controlId="validationFormik07" className={style.form_control_input}>
                                      <QuillEditor
                                          value={content}
                                          onChange={handleEditorChange}
                                          modules={quillModules}
                                          formats={quillFormats}
                                          className="w-full h-[70%] mt-10 bg-white"
                                      />
                                    </Form.Group>

                                  </div>
                                </Form>

                                <div className={style.dashboard_create_btn_box}>
                                  <button onClick={handleSaveButton} className={style.dashboard_create_article_btn_save}>
                                    Save
                                  </button>
                                </div>

                              </Row>
                            </Col>
                        )
                      }
                    </Formik>
                  </div>
                </div>
              </Container>
            </section>
        )
      }
    </>
  );
}

export default DashboardCreateAbout;