import style from "./dashboard-create-page.module.scss";
import SideBarDashboard from "./../dashboard-side-bar";
import DashboardHeaderComponent from "./../dashboard-header";
import ArticleBox from "./../article-box";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import * as formik from "formik";
import * as yup from "yup";
import Editor from "@/components/Editor/Editor";

function DashboardCreatePage() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    category: yup.string().required(),
    tags: yup.string().required(),
    date: yup.string().required(),
    time: yup.string().required(),
    featured: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });
  return (
    <section className="d-flex">
      <Container
        fluid
        className={`${style.container_dashboard_crete_page} bg-dashboard`}
      >
        <div className={`${style.container_main}`}>
          <div className={style.crete_page_form}>
            <Formik
              initialValues={{
                firstName: "Name",
                category: "Category",
                tags: "Tags",
              }}
            >
              {({ handleSubmit, handleChange, values, touched, errors }) => (
                <Col className={`"gap-5 "`}>
                  <Row>
                    <Form className={`"d-flex gap-5 ${style.page_create_form}`}>
                      <div className={style.tags_row_style}>
                        <Form.Group
                          controlId="validationFormik01"
                          className={style.form_control_input}
                        >
                          <Form.Control
                            type="text"
                            name="firstName"
                            value={values.firstName}
                            onChange={handleChange}
                            isValid={touched.firstName && !errors.firstName}
                            className={style.form_control_input}
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group
                          controlId="validationFormik02"
                          className={style.form_control_input}
                        >
                          <Form.Control
                            type="text"
                            name="category"
                            value={values.category}
                            onChange={handleChange}
                            isValid={touched.category && !errors.category}
                            className={style.form_control_input}
                          />
                        </Form.Group>
                        <Form.Group
                          controlId="validationFormik03"
                          className={style.form_control_input}
                        >
                          <Form.Control
                            type="tags"
                            name="tags"
                            value={values.tags}
                            onChange={handleChange}
                            isValid={touched.tags && !errors.tags}
                            className={style.form_control_input}
                          />
                        </Form.Group>
                      </div>
                    </Form>
                  </Row>
                </Col>
              )}
            </Formik>
          </div>
          {/* <ArticleBox /> */}

          <Editor placeholder="Type your text here..." />

          <div className={style.dashboard_create_btn_box}>
            <button className={style.dashboard_create_page_btn_publish}>
              Publish
            </button>
            <button className={style.dashboard_create_page_btn_save}>
              Save
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default DashboardCreatePage;
