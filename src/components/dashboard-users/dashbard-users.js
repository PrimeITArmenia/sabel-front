import style from "./dashbard-users.module.scss";
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

function DashboardUsers() {
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });
  return (
    <Container fluid className={`${style.container_dashboard_users}`}>
      <div className={`${style.container_main}`}>
        <div className={style.users_form}></div>
        <ArticleBox type="user"/>
      </div>
    </Container>
  );
}

export default DashboardUsers;
