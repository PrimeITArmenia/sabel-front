import style from "./dashbard-tags.module.scss";
import SideBarDashboard from "./../dashboard-side-bar";
import DashboardHeaderComponent from "./../dashboard-header";
import ArticleBox from "./../article-box";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import axios from "axios";
import {useState} from "react";
import {url} from '@/api'

function DashboardTags() {
  const { Formik } = formik;
  const session = useSession();
  const token = session.data?.user.token.accessToken;
  const [changeTags, setChangeTags] = useState(false)
  const [changeTagsValue, setChangeTagsValue] = useState(null)
  const [update, setUpdate] = useState(false)


  const schema = yup.object().shape({
    name: yup.string().required(),
    description: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  const handleUpdateTagInput = async(item)=>{
    const response = await axios.get(`${url}/tags/${item._id}`)
    const getItem = { name : response.data[0]?.name, description : response.data[0]?.description,  _id: response.data[0]?._id}
    if( getItem ){
      setChangeTagsValue(getItem)
      setChangeTags(true)
    }
  }

  const handleEditTags = async (event, { resetForm }) =>{
    let response = await axios.put(`${url}/tags/${changeTagsValue._id}`,
        {
          name : changeTagsValue.name,
          description : changeTagsValue.description,
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
    if( response.status === 200 ){
      console.log('edit-response  ===  ', response.status)
      setUpdate(!update)
      setChangeTags(false)
      resetForm({ name: 'Name', description: 'Description' });
    }

  }

 async function handleCreate(values, { resetForm }) {
   try{
     let response = await axios.post(`${url}/tags`, {
         name : values.name,
         description : values.description,
         },
         {
             headers: {
                 'Content-Type': 'application/json',
                 'Authorization': `Bearer ${token}`,
             }
        })
       console.log('tag-response', response)
     setUpdate(!update)
     resetForm({ name: 'Name', description: 'Description' });
   }catch (err){
      console.log('error-create', err)
   }
  }

  const customHandleChange = (event, handleChange)=> {
    handleChange(event);
  }

  return (
    <Container fluid className={`${style.container_dashboard_tags}`}>
      <div className={`${style.container_main}`}>
        <div className={style.tags_form}>
          <Formik
            initialValues={{
              name: "Name",
              description: "Description",
            }}
            onSubmit={handleCreate}
          >
            {({ handleSubmit, handleChange, values,resetForm, touched, errors }) => (
              <Form className="d-flex gap-5">
                <div className={style.tags_row_style}>
                  <Form.Group controlId="validationFormik01">
                    <Form.Control
                      type="text"
                      name="name"
                      isValid={touched.firstName && !errors.firstName}
                      className={style.form_control_input}
                      value={ !changeTags ? values.name : changeTagsValue.name}
                      onChange={(e) => {
                        customHandleChange(e, handleChange)
                        if(changeTags){
                        setChangeTagsValue({...changeTagsValue, name:e.target.value})
                      }}}/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                  <img
                    width={9}
                    height={17}
                    alt={'image'}
                    src="./../assets/icons/green-arrow-left.svg"/>
                  <Form.Group controlId="validationFormik02">
                    <Form.Control
                      type="text"
                      name="description"
                      isValid={touched.lastName && !errors.lastName}
                      className={style.form_control_input}
                      value={ !changeTags ? values.description : changeTagsValue.description }
                      onChange={(e) => {
                        customHandleChange(e, handleChange)
                        if(changeTags){
                          setChangeTagsValue({...changeTagsValue, description:e.target.value})
                        }}}

                    />
                  </Form.Group>
                </div>
                {
                  !changeTags ? (
                      <Button type="button" className={style.tags_button} onClick={handleSubmit}>
                        Add
                      </Button>
                  ) : (
                      <Button type="button" className={style.tags_button} onClick={(event)=>handleEditTags(event, {resetForm})}>
                        Edit
                      </Button>
                  )
                }
              </Form>
            )}
          </Formik>
        </div>
        <ArticleBox type='tag' forOnChangeTypeButton={true} onChange={handleUpdateTagInput} update={update} setUpdate={setUpdate}/>
      </div>
    </Container>
  );
}

export default DashboardTags;
