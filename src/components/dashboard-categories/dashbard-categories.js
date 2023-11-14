import style from "./dashbard-categories.module.scss";
import ArticleBox from "./../article-box";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import * as yup from "yup";
import { useSession } from "next-auth/react";
import {  useState} from "react";
import axios from 'axios'
import {url} from '@/api'
import toast, {Toaster} from "react-hot-toast";

function DashboardCategories() {
  const session = useSession();
  const token = session.data?.user.token.accessToken;
  const { Formik } = formik;
  const [changeCategories, setChangeCategories] = useState(false)
  const [changeCategoriesValue, setChangeCategoriesValue] = useState(null)
  const [update, setUpdate] = useState(false)
/////////////////////////////////////////////////////////////////////////////////////

  const schema = yup.object().shape({

    name: yup.string().required(),
    description: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

/////////////////////////////////////////////////////////////////////////////////////
  async function handleCreate(values, { resetForm }) {
    await fetch(`${url}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if( response.status === 201 ){
            toast.success('Category has added !')
            resetForm({ name: 'Name', description: 'Description' });
            setUpdate(!update)
        }
      })
        .catch((err)=> console.log('err', err))
  }

/////////////////////////////////////////////////////////////////////////////////////

  const handleUpdateCategoriesInput = async (item) =>{
    const response = await axios.get(`${url}/categories/${item.id}`)
    const getItem = { name : response.data.name, description : response.data.description, _id: response.data._id}
    if( getItem ){
      setChangeCategoriesValue(getItem)
      setChangeCategories(true)
    }
  }

/////////////////////////////////////////////////////////////////////////////////////
  const handleEditCategory = async (event,{ resetForm }) =>{
        let response = await axios.put(`${url}/categories/${changeCategoriesValue._id}`,
          {
              name : changeCategoriesValue.name,
              description : changeCategoriesValue.description,
        }, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              }
        })
        if(response.status === 200){
          setUpdate(!update)
          resetForm({ name: 'Name', description: 'Description' });
          setChangeCategories(false)
            toast.success('Category has successfully changed !')
        }
  }

/////////////////////////////////////////////////////////////////////////////////////
  const customHandleChange = (event, handleChange)=> {
    handleChange(event);
  }

/////////////////////////////////////////////////////////////////////////////////////

  return (
    <Container fluid className={`${style.container_dashboard_categoriess}`}>
        <Toaster/>
      <div className={`${style.container_main}`}>
        <div className={style.categories_form}>
          <Formik
            initialValues={{
              name: "Name",
              description: "Description",
            }}
            onSubmit={handleCreate}>
            {
              ({ handleSubmit, handleChange, values,resetForm, touched, errors }) => (
              <Form className="d-flex gap-5">
                <div className={style.categories_row_style}>

                  <Form.Group controlId="validationFormik01">
                    <Form.Control
                      type="text"
                      name="name"
                      className={style.form_control_input}
                      isValid={touched.name && !errors.firstName}

                      value={ !changeCategories ? values.name : changeCategoriesValue.name }
                      onChange={(e) => {
                        customHandleChange(e, handleChange)
                        if(changeCategories){
                          setChangeCategoriesValue({...changeCategoriesValue, name:e.target.value})
                      }}}/>
                  </Form.Group>

                  <img alt={'photo'} width={9} height={17}
                    src="./../assets/icons/green-arrow-left.svg"/>

                  <Form.Group controlId="validationFormik02">
                    <Form.Control
                      type="text"
                      name="description"
                      className={style.form_control_input}
                      isValid={touched.description && !errors.lastName}

                      value={ !changeCategories ? values.description : changeCategoriesValue.description }
                      onChange={(e) =>{
                        customHandleChange(e, handleChange)
                        if(changeCategories){
                          setChangeCategoriesValue({...changeCategoriesValue, description:e.target.value})
                      }}}/>
                  </Form.Group>

                </div>
                {
                    !changeCategories ? (
                        <Button type='button' className={style.categories_button} onClick={handleSubmit}>
                          Create Category
                        </Button>
                    ) : (
                        <Button type='button' className={style.categories_button} onClick={(event)=>handleEditCategory(event, {resetForm})}>
                          Edit Category
                        </Button>
                    )
                }
              </Form>
              )
            }
          </Formik>
        </div>
          <ArticleBox type='category' onChange={handleUpdateCategoriesInput} update={update} setUpdate={setUpdate} forOnChangeTypeButton={true}/>
      </div>
    </Container>
  );
}

export default DashboardCategories;