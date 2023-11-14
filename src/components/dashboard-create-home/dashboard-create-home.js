"use client";

import style from "./dashboard-create-home.module.scss";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Formik } from "formik";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import React from "react";
import axios from 'axios'
import {useSession} from "next-auth/react";
import {url} from '@/api'

function DashboardCreateHome({ data }) {

  const router = useRouter()
  const session = useSession()
  const [ initialFormsValues, setInitialFormsValues ] = useState({
    headerTitle: "Header title",
    headerSubtitle: "Header subtitle",
    headerAuthor: "Header author",
    headerText: "Header text",
    headerImage: "Header image",
    footerTitle: "Footer title",
    footerAuthor: "Footer author",
    footerText: "Footer text",
    footerImage: "Footer image",
  })

////////////////////////////////////////////////////////////////////

 async function handleSaveButtonClick(values) {
    const formData = new FormData();
    const token = session?.data?.user?.token.accessToken

    const body = {...values, headerText : values?.exampleForm?.ControlTextarea1, footerText : values?.exampleForm?.ControlTextarea2 }

    delete body?.exampleForm
    const isEditPage = router.pathname.includes("/home-edit");

    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value);
    });
    if ( isEditPage ) {
      console.log('true', body)
     await axios.patch(`${url}/homepage`, {formData} ,{
        headers:{
          'Authorization' : `Bearer ${token}`
        }
      })
          .then((response)=>  console.log('response', response))
          .catch((err)=> console.log('error', err))

    }
  }

  // function handlePublishButtonClick() {
  //   const isEditPage = router.pathname.includes("/edit");
  //   const values = formik.values;
  //   const body = { ...values, content: displayedData, status: "published" };
  //
  //   if (isEditPage) {
  //     const id = router.query.id;
  //     fetcher
  //       .put(`api/articles/edit/${id}`, body, {
  //         baseURL: "http://localhost:3000",
  //       })
  //       .then((res) => {
  //         if (res.data.status === 200) {
  //           console.log(res);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   } else {
  //     fetcher
  //       .post("api/articles/create", body, {
  //         baseURL: "http://localhost:3000",
  //       })
  //       .then((res) => {
  //         if (res.data.status === 200) {
  //           console.log(res);
  //         }
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   }
  // }




  return (
    <section className="d-flex">
      <Container fluid className={`${style.container_dashboard_crete_article} bg-dashboard`}>
        <div className={`${style.container_main}`}>
          <div className={style.crete_article_form}>

            <Formik onSubmit={handleSaveButtonClick} initialValues={initialFormsValues}>
              {
                ({
                    handleSubmit, handleChange,
                    setFieldValue, values,  resetForm, touched,
                    errors }) => {
                  useEffect(() => {
                   async function foo(){
                      if (data) {
                          console.log('useEffect-in-component-for-edit',)
                      await setFieldValue('headerTitle',  data?.headerTitle);
                      await setFieldValue('headerSubtitle', data.headerSubtitle);
                      await setFieldValue('headerAuthor', data.headerAuthor);
                      await setFieldValue('headerText', data.headerText);
                      await setFieldValue('headerImage', data.headerImage);
                      await setFieldValue('footerTitle', data.headerTitle);
                      await setFieldValue('footerAuthor', data.footerAuthor);
                      await setFieldValue('footerText', data.footerText);
                      await setFieldValue('footerImage', data.footerImage);
                      }
                    }
                     foo()
                  }, [data]);
                  return (
                      <Col className={`"gap-5 "`}>
                        <Row>
                          <Form className={`"d-flex gap-5 ${style.article_create_form}`}>
                            <div className={style.tags_row_style}>

                              <Form.Group controlId="validationFormik01" className={style.form_control_input}>
                                <Form.Control
                                    type="text"
                                    name="Hader title"
                                    value={values.headerTitle}
                                    placeholder={"Header Title"}
                                    onChange={handleChange}
                                    isValid={touched.headerTitle && !errors.headerTitle}
                                    className={style.form_control_input}/>
                                <Form.Control.Feedback>
                                  Looks good!
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group controlId="validationFormik02" className={style.form_control_input}>
                                <Form.Control
                                    type="text"
                                    name="Header subtitle"
                                    value={values.headerSubtitle}
                                    placeholder="Header Subtitle"
                                    onChange={handleChange}
                                    isValid={touched.headerSubtitle && !errors.headerSubtitle}
                                    className={style.form_control_input}/>
                                <Form.Control.Feedback>
                                  Looks good!
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group controlId="validationFormik03" className={style.form_control_input}>
                                <Form.Control
                                    type="text"
                                    name="Header author"
                                    placeholder="Header Author"
                                    value={values.headerAuthor}
                                    onChange={handleChange}
                                    isValid={touched.headerAuthor && !errors.headerAuthor}
                                    className={style.form_control_input}/>
                                <Form.Control.Feedback>
                                  Looks good!
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group className={style.form_control_input} controlId="exampleForm.ControlTextarea1">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Header text"
                                    rows={1}
                                    className={style.form_control_input}
                                    value={values.headerText}
                                    onChange={handleChange}/>
                              </Form.Group>

                              <Form.Group controlId="validationFormik4" className={style.form_control_input} >
                                <Form.Control
                                    type="file"
                                    name="image"
                                    className={style.form_control_input}
                                    onChange={(event) => {
                                      const selectedFile = event.target.files[0];
                                      setFieldValue('headerImage', selectedFile)
                                    }}
                                />
                              </Form.Group>

                            </div>
                          </Form>
                        </Row>
                        <Row>
                          <Form className={`"d-flex gap-5 ${style.article_create_form}`}>
                            <div className={style.tags_row_style}>

                              <Form.Group controlId="validationFormik05" className={style.form_control_input}>
                                <Form.Control
                                    type="text"
                                    name="Footer title"
                                    placeholder="Footer Title"
                                    value={values.footerTitle}
                                    onChange={handleChange}
                                    isValid={touched.footerTitle && !errors.footerTitle}
                                    className={style.form_control_input}/>
                                <Form.Control.Feedback>
                                  Looks good!
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group controlId="validationFormik06" className={style.form_control_input}>
                                <Form.Control
                                    type="text"
                                    name="Footer Author"
                                    placeholder="Footer Author`"
                                    value={values.footerAuthor}
                                    onChange={handleChange}
                                    isValid={touched.footerAuthor && !errors.footerAuthor}
                                    className={style.form_control_input}/>
                                <Form.Control.Feedback>
                                  Looks good!
                                </Form.Control.Feedback>
                              </Form.Group>

                              <Form.Group className={style.form_control_input} controlId="exampleForm.ControlTextarea2">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Footer text"
                                    rows={1}
                                    value={values.footerText}
                                    onChange={handleChange}
                                    className={style.form_control_input}/>
                              </Form.Group>

                              <Form.Group controlId="validationFormik08" className={style.form_control_input}>
                                <Form.Control
                                    type="file"
                                    name="image"
                                    className={style.form_control_input}
                                    onChange={(event) => {
                                      const selectedFile = event.target.files[0];
                                      setFieldValue('footerImage', selectedFile)
                                    }}/>
                              </Form.Group>
                            </div>

                          </Form>
                        </Row>

                        <div className={style.dashboard_create_btn_box}>
                          <button onClick={handleSubmit} className={style.dashboard_create_article_btn_save}>
                            Save
                          </button>
                        </div>
                      </Col>

                  )
                }}
            </Formik>
          </div>


        </div>
      </Container>
    </section>
  );
}

export default DashboardCreateHome;
