"use client";
import style from "./dashboard-create-article.module.scss";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import {Formik } from "formik";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { WithContext as ReactTags } from "react-tag-input";
import axios from "axios"
import {useSession} from "next-auth/react";
import toast, {Toaster} from "react-hot-toast";
import {url} from '@/api'
import  Loading from '../loading/index'

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

function DashboardCreateArticle({ data }) {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [options, setOptions] = useState([]);
  const [content, setContent] = useState("");
  const [suggestions, setSuggestions]  = useState([])
  const [isEditPage, setIsEditPage] = useState(false)
  const ARTICLE = [
    "article1",
    "article2",
    "article3",
    "article4",
    "article5",
    "article6",
    "article7",
    "article8",
  ];
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
  const [initialFormValues, setInitialFormValues] = useState({
    name : "Name",
    description : "Description",
    category : "Category",
    tags : [],
    image : null,
    showHome : false,
    position :null,
    // featured : 'Featured'
  })
  const session =  useSession()
  const token = session?.data?.user?.token.accessToken
  const [isLoading, setIsLoading] = useState(false)
//////////////////////////////////////////////////////////////////////////////////////////////
// Editor content
  const handleEditorChange = (newContent) => { setContent(newContent) };

/////////////////////////////////////////////////////////////////////////////////////////////
 // fetch -- categories

  useEffect(() => {
    fetch(`${url}/categories`, )
        .then((response) => response.json())
        .then((categories_option) => {
          setCategories(categories_option); // Update the state with the fetched data
            setIsLoading(true)
        })
        .catch((error) => {
          console.error("Error:", error);
        });
  }, []);

/////////////////////////////////////////////////////////////////////////////////////////////
  // fetch -- tags react-tag

  useEffect(() => {
    fetch(`${url}/tags`)
      .then((response) => response.json())
      .then((tagOption) => {
        setOptions(tagOption);
        setIsLoading(true)
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  useEffect(()=> {
    const tagOptionList = options.tags;
     if( tagOptionList ){
       const filterTagOption = tagOptionList.map((tag) => ({
         id: tag._id,
         text: tag.name,
       }))
      setSuggestions(filterTagOption)
     }
  },[options, setOptions])

/////////////////////////////////////////////////////////////////////////////////////////////
  // setTags

  const handleDelete = ( i, values, setFieldValue, ) => {
    let filterTags = values.tags.filter((tag, index) => index !== i )
      setFieldValue('tags', filterTags);
  }
  const handleAddition = (tag, values, setFieldValue,  ) => {
    const filterTagsName =  suggestions.filter((item)=> item.text === tag.text)
      console.log('filter', filterTagsName)
    if( filterTagsName.length > 0 ){
      setFieldValue('tags', [...values.tags, ...filterTagsName]);
    }
  };
  const handleDrag = (tag, currPos, newPos, values, setFieldValue) => {
    const newTags = values.tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setFieldValue('tags', newTags);
  };
  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

/////////////////////////////////////////////////////////////////////////////////////////////
//   functions create &&&

 async function handlePublishButtonClick(event, values, status) {
   let payload ;
   const formData = new FormData()
   const tagsId = values.tags.map( (item) => item.id)

     if( status === 'draft'){
        payload = {
            ...values,
            tags: tagsId,
            content: content
        }
    } else if ( status === 'published'){
         payload = {
             ...values,
             tags: tagsId,
             status: "published",
             content: content
         }
    }

   Object.entries(payload).forEach(([key, value]) => {

       if (Array.isArray(value)) {
           value.forEach(val => formData.append(`${key}[]`, val));
       } else {
           formData.append(key, value);
       }
   })

   axios.post(`${url}/articles`, formData,{
               headers: {
                 'Authorization': `Bearer ${token}`
               }
   })
    .then((response)=>{
         if( response?.status === 201 ){
            toast.success('Article has added !')
             router.push('/admin/articles')
        }
    })
   .catch(err =>{
       toast.error(`${err?.response?.data?.message}`)
   })
 }

/////////////////////////////////////////////////////////////////////////////////////////////
//    function edit

const handleEditArticle = async( event, values, id ) => {
    const tagsId = values.tags.map((item) => item.id)
    let payload = {
        ...values,
        tags: tagsId,
        content: content
    } ;

    const formData = new FormData()
    Object.entries(payload).forEach(([key, value]) => {
        if (Array.isArray(value)) {
            value.forEach(val => formData.append(`${key}[]`, val));
        } else {
            formData.append(key, value);
        }
    })
    try{
        const response  = await axios.put(`${url}/articles/${id}`, formData,{
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log('response -edit ', response)
        if( response.status === 200 ){
            toast.success('Article has edit !',)
            await router.push('/admin/articles')
        }
    }catch (error){
        console.log('error__-', error)
    }
}

/////////////////////////////////////////////////////////////////////////////////////////////
// edit and change formik values

async function handleEditFormikInput( data, values, setFieldValue ){
   let filterTags =  data?.tags?.map(( item )=> (
        item = {
            id : item._id,
            text : item.name
        }
    ))
    setFieldValue('tags', filterTags)
    setFieldValue('name',  data.name);
    setFieldValue('description', data.description);
    setFieldValue('category', data.category);
    setFieldValue('image', data.image);
    setFieldValue('showHome', data.showHome);
    setContent(data.content)
    setIsEditPage(!isEditPage)
    setIsLoading(true)
}

/////////////////////////////////////////////////////////////////////////////////////////////



  return (
    <section className="d-flex">
      <Container fluid className={`${style.container_dashboard_crete_article} bg-dashboard`}>
        <Toaster/>
        <div className={`${style.container_main}`}>
          <div className={style.crete_article_form}>
              {
                  !isLoading ? (
                      <Loading/>
                  ) : (
                      <Formik initialValues={initialFormValues}
                              onSubmit={console.log}>
                          {
                              ({ handleSubmit, handleChange,
                                   setFieldValue, values, setValues, resetForm, touched,
                                   errors }) => {
                                  useEffect(() => {
                                      if(data){
                                          handleEditFormikInput(data, values , setFieldValue)
                                      }
                                  }, [data]);
                                  return (

                                      <Col className={`"gap-5 "`}>
                                          <Row>
                                              <Form className={`"d-flex gap-5 ${style.article_create_form}`}>
                                                  <div className={style.tags_row_style}>

                                                      <Form.Group
                                                          controlId="validationFormik01"
                                                          className={style.form_control_input}>
                                                          <Form.Control
                                                              type="text"
                                                              name="name"
                                                              value={values.name}
                                                              onChange={handleChange}
                                                              isValid={touched.name && !errors.name}
                                                              className={style.form_control_input}/>
                                                          <Form.Control.Feedback>
                                                              Looks good!
                                                          </Form.Control.Feedback>
                                                      </Form.Group>

                                                      <Form.Group
                                                          controlId="validationFormik02"
                                                          className={style.form_control_input}>
                                                          <Form.Select
                                                              defaultValue="Choose..."
                                                              className="text-capitalize"
                                                              name="category"
                                                              value={values.category}
                                                              onChange={handleChange}>
                                                              {
                                                                  categories.map((value, index) => (
                                                                      <option key={index} className="text-capitalize" value={value.id}>
                                                                          {value.name}
                                                                      </option>
                                                                  ))
                                                              }
                                                          </Form.Select>
                                                      </Form.Group>

                                                      <Form.Group
                                                          controlId="validationFormik06"
                                                          className={style.form_control_input}
                                                          placeholder="Featured">
                                                          <div className="d-flex flex-row justify-content-between align-items-center bg-quaternary p-1 rounded-2 border  m-0">
                                                              <h5 className={`${style.article_home_input}`}>
                                                                  Home Article
                                                              </h5>
                                                              <div className={style.toggle_rect_color}>
                                                                  <input
                                                                      type="checkbox"
                                                                      id="rect2"
                                                                      name="check"
                                                                      checked={values.showHome}
                                                                      onChange={ ()=> setFieldValue('showHome', !values.showHome)}
                                                                  />
                                                                  <label htmlFor="rect2"></label>
                                                              </div>
                                                          </div>
                                                      </Form.Group>

                                                  </div>
                                              </Form>
                                          </Row>
                                          <Row>
                                              <Form className={`"d-flex gap-5 ${style.article_create_form}`}>
                                                  <div className={style.tags_row_style}>

                                                      <Form.Group
                                                          controlId="validationFormik04"
                                                          className={style.form_control_input}>
                                                          <Form.Control
                                                              type="date"
                                                              name="date"
                                                              value={values.date}
                                                              onChange={handleChange}
                                                              isValid={touched.date && !errors.date}
                                                              className={style.form_control_input}/>
                                                          <Form.Control.Feedback>
                                                              Looks good!
                                                          </Form.Control.Feedback>
                                                      </Form.Group>

                                                      <Form.Group
                                                          controlId="validationFormik06"
                                                          className={style.form_control_input}
                                                          placeholder="Featured">

                                                          <Form.Select
                                                              defaultValue="Choose..."
                                                              className="text-capitalize"
                                                              name="position"
                                                              value={values.position}
                                                              onChange={handleChange}>
                                                              <option>
                                                                  Position
                                                              </option>
                                                              {
                                                                  ARTICLE.map((value, index) => (
                                                                      <option
                                                                          key={index}
                                                                          className="text-capitalize"
                                                                          value={value}>
                                                                          {value}
                                                                      </option>
                                                                  ))
                                                              }
                                                          </Form.Select>
                                                      </Form.Group>

                                                      <Form.Group
                                                          controlId="validationFormik07" // Use a unique ID for the file input
                                                          className={style.form_control_input}>
                                                          <Form.Control
                                                              type="file"
                                                              name="image"
                                                              className={style.form_control_input}
                                                              onChange={(event) => {
                                                                  const selectedFile = event.target.files[0];
                                                                  setFieldValue('image', selectedFile)
                                                              }}/>
                                                      </Form.Group>

                                                  </div>
                                              </Form>
                                          </Row>
                                          <Row>
                                              <Form className={`"d-flex gap-5 ${style.article_create_form}`}>
                                                  <div className={style.tags_row_style}>

                                                      <Form.Group
                                                          className={style.form_control_input}
                                                          controlId="exampleForm.ControlTextarea1">
                                                          <Form.Control
                                                              as="textarea"
                                                              name="description"
                                                              value={ values.description}
                                                              onChange={handleChange}
                                                              placeholder="Description"
                                                              rows={1}
                                                              className={style.form_control_input}/>
                                                      </Form.Group>

                                                      <Form.Group
                                                          controlId="validationFormik03"
                                                          className={style.form_control_input}>
                                                          <ReactTags
                                                              tags={values?.tags}
                                                              suggestions={suggestions}
                                                              handleDelete={ (i)=> handleDelete(i, values, setFieldValue)}
                                                              handleAddition={ (tag) => handleAddition(tag, values, setFieldValue)}
                                                              handleDrag={(tag, currPos, newPos) => handleDrag(tag, currPos, newPos, values, setFieldValue)}
                                                              // handleDrag={handleDrag}
                                                              handleTagClick={handleTagClick}
                                                              inputFieldPosition="bottom"
                                                              autocomplete
                                                          />
                                                      </Form.Group>

                                                  </div>
                                              </Form>
                                          </Row>

                                          <QuillEditor
                                              value={content}
                                              onChange={handleEditorChange}
                                              modules={quillModules}
                                              formats={quillFormats}
                                              className="w-full h-[70%] mt-10 bg-white"
                                          />
                                          {
                                              !isEditPage ? (
                                                  <div className={style.dashboard_create_btn_box}>
                                                      <button className={style.dashboard_create_article_btn_publish} type='button'
                                                              onClick={(event)=> handlePublishButtonClick(event, values, 'published')}>
                                                          Publish
                                                      </button>
                                                      <button className={style.dashboard_create_article_btn_save} type='button'
                                                              onClick={(event)=> handlePublishButtonClick(event, values, 'draft')}>
                                                          Save
                                                      </button>
                                                  </div>
                                              ) : (
                                                  <div className={style.dashboard_create_btn_box}>
                                                      <button className={style.dashboard_create_article_btn_save} type='button'
                                                              onClick={(event)=> handleEditArticle(event, values, data._id)}>
                                                          Edit Article
                                                      </button>
                                                  </div>
                                              )
                                          }
                                      </Col>
                                  )
                              }}
                      </Formik>
                  )
              }
          </div>
        </div>
      </Container>
    </section>
  );
}

export default DashboardCreateArticle;
