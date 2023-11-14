import { Container, Row, Col } from "react-bootstrap";
import style from "./payment.module.scss";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as formik from "formik";
import * as yup from "yup";
import { useState } from "react";
import Table from "react-bootstrap/Table";
import Link from "next/link";

function PaymentComponent() {
  const { Formik } = formik;
  const [articles, setArticles] = useState(false);
  const articlesButtonClick = () => {
    setArticles((prevIsOn) => !prevIsOn);
  };

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    city: yup.string().required(),
    united_states: yup.string().required(),
    zip: yup.string().required(),
    terms: yup.bool().required().oneOf([true], "Terms must be accepted"),
  });

  return (
    <section className={`${style.section_payment} `}>
      <Row
        className={`${style.payment_popup_section}  d-lg-flex flex-lg-row flex-column`}
      >
        <Col className={style.mobile_payment_section}>
          <div className={` d-flex justify-content-between `}>
            <div className="d-flex align-items-center ">
              <img
                src="assets/icons/arrow-left.svg"
                width={16}
                height={16}
                className=""
              />

              <img
                src="assets/icons/logo.svg"
                width={70}
                height={32}
                className="ms-3"
              />
            </div>
            <div>
              <button
                onClick={articlesButtonClick}
                className="border-0 bg-quaternary d-flex align-middle align-items-center justify-content-between"
              >
                {/* <span className={style.titele_list_title}>Articles</span> */}
                {articles ? (
                  <>
                    <span className={style.titele_list_title}>Close</span>
                    <img
                      src="assets/icons/colection_arrow_up.svg"
                      className="ms-3"
                    />
                  </>
                ) : (
                  <>
                    <span className={style.titele_list_title}>Details</span>
                    <img
                      src="assets/icons/colection_arrow_down.svg"
                      className="ms-3"
                    />
                  </>
                )}
              </button>
            </div>
          </div>

          <div className={`d-flex flex-column ${style.filter}`}>
            <div
              className={`${style.dropdown_box} ${articles ? style.show : ""}`}
            >
              <div className={style.filter_box}>
                <Row>
                  <Col className="text-end pt-3">
                    <Row className=" border-bottom">
                      <Col>Subtotal</Col>
                      <Col>€120</Col>
                    </Row>
                    <Row className=" border-bottom">
                      <Col className="text-gray">Sales tax (0%)</Col>
                      <Col className="text-gray">€0</Col>
                    </Row>
                    <Row className="">
                      <Col>Total Due</Col>
                      <Col>€120</Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          <Row className={style.membersihp_hader}>
            <h4 className="pt-5">Annual Membership </h4>
            <p className=" display-1">€120</p>
          </Row>
        </Col>

        <Col className={`${style.container_price_direction}`}>
          <Row className={style.price_direction_row}>
            <Row className={`${style.logo_and_back_row_box}`}>
              <div>
                <img
                  src="assets/icons/arrow-left.svg"
                  width={16}
                  height={16}
                  className=""
                />
              </div>
              <div>
                <img
                  src="assets/icons/logo.svg"
                  width={70}
                  height={32}
                  className=""
                />
              </div>
            </Row>
            <Row className={style.membersihp_hader}>
              <h4 className="pt-5 ">Annual Membership </h4>
              <p className=" display-1">€120</p>
            </Row>
            <Row className={style.membership_title}>
              <Row>
                <Col className={`display-3 ${style.text_decoration_prata}`}>
                  Annual Membership
                </Col>
                <Col
                  className={`text-end display-3 ${style.text_decoration_prata} `}
                >
                  €120
                </Col>
              </Row>
              <Row>
                <Col className="text-end pt-3">
                  <Row className="d-flex">
                    <Col>Subtotal</Col>
                    <Col>€120</Col>
                  </Row>
                  <Row>
                    <Col className="text-decoration-none text-secondary">
                      Sales tax (0%)
                    </Col>
                    <Col className="text-decoration-none text-secondary">
                      €0
                    </Col>
                  </Row>
                  <Row>
                    <Col>Total Due</Col>
                    <Col>€120</Col>
                  </Row>
                </Col>
              </Row>
            </Row>
          </Row>
          <Row className={style.price_direction_row}>
            <Col className="d-flex">
              <div className="pe-3">
                <p className="m-0 text-decoration-none text-secondary">
                  Powered by{""}
                  <img
                    src="assets/icons/logo-stripe.svg"
                    width={34}
                    height={14}
                    clas
                  />
                </p>
              </div>

              <div className={`${style.price_direction_row_footer} ps-3`}>
                <Link
                  href="/terms-of-service"
                  className="text-decoration-none text-secondary"
                >
                  Terms{" "}
                </Link>
                <Link
                  href="/privacy-policy"
                  className="text-decoration-none text-secondary"
                >
                  Privacy{" "}
                </Link>
              </div>
            </Col>
          </Row>
        </Col>

        <Col className={`${style.container_card_direction} `}>
          <Formik
            validationSchema={schema}
            onSubmit={console.log}
            initialValues={{
              firstName: "Mark",
              username: "",
              city: "",
              state: "",
              zip: "",
              terms: false,
            }}
          >
            {({ handleSubmit, handleChange, values, touched, errors }) => (
              <Form
                noValidate
                onSubmit={handleSubmit}
                className={style.form_setion}
              >
                <Col>
                  <button
                    className={`bg-quaternary border-0  rounded w-100 py-3 ${style.paypal_button}`}
                  >
                    <img
                      src="assets/icons/paypal.svg"
                      width={100}
                      height={28}
                    />
                  </button>
                </Col>
                <Col className={style.payment_column_or_line}>
                  <h6 className={`${style.or_line} `}>Or pay with card</h6>
                </Col>
                <Col className="">
                  <Form.Group as={Col} controlId="validationFormik01">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="Email"
                      value={values.email}
                      onChange={handleChange}
                      isValid={touched.email && !errors.email}
                      className={`form-control  ${style.form_control_email}`}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Row className={`p-0 `}>
                  <Col>
                    <Form.Group
                      as={Col}
                      controlId="validationFormik02"
                      className={style.card_form}
                    >
                      <Form.Label>Country or region</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="1234 1234 1234 1234"
                        name="card_numbers"
                        value={values.card_numbers}
                        onChange={handleChange}
                        isInvalid={!!errors.card_numbers}
                        className="form-control shadow-none rounded-top rounded-0 "
                      />
                      <div className={style.card_form_variations}>
                        <img
                          src="assets/icons/visa.svg"
                          width={24}
                          height={16}
                        />
                        <img
                          src="assets/icons/mastercard.svg"
                          width={24}
                          height={16}
                        />
                        <img
                          src="assets/icons/american-express.svg"
                          width={24}
                          height={16}
                        />
                        <img
                          src="assets/icons/dic-over.svg"
                          width={24}
                          height={16}
                        />
                      </div>

                      <Form.Control.Feedback type="invalid">
                        {errors.city}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  <Row className={`p-0`}>
                    <Col className={`pe-0 ps-4`}>
                      <Form.Group as={Col} controlId="validationFormik03">
                        <Form.Control
                          type="text"
                          placeholder="MM / YY"
                          name="city"
                          value={values.mounth_year}
                          onChange={handleChange}
                          isInvalid={!!errors.mounth_year}
                          className={`form-control rounded-start rounded-0 ${style.form_control_mounth_year}`}
                        />

                        <Form.Control.Feedback type="invalid">
                          {errors.mounth_year}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                    <Col className={`p-0`}>
                      <Form.Group
                        as={Col}
                        controlId="validationFormik04"
                        className={style.card_form}
                      >
                        <Form.Control
                          type="text"
                          placeholder="CVC"
                          name="city"
                          value={values.cvc}
                          onChange={handleChange}
                          isInvalid={!!errors.cvc}
                          className={`form-control rounded-end rounded-0 ${style.form_control_cvc} `}
                        />
                        <div className={style.cvc_card}>
                          <img
                            src="assets/icons/card-cvc.svg"
                            width={24}
                            height={16}
                          />
                        </div>
                        <Form.Control.Feedback type="invalid">
                          {errors.cvc}
                        </Form.Control.Feedback>
                      </Form.Group>
                    </Col>
                  </Row>
                </Row>

                <Col className="pt-4">
                  <Form.Group as={Col} controlId="validationFormik04">
                    <Form.Label>Name on card </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder=""
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      isInvalid={!!errors.state}
                      className={`form-control  ${style.form_control_state}`}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.state}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>

                <Row className="pt-4">
                  <Form.Group
                    as={Col}
                    controlId="validationFormik05"
                    className=""
                  >
                    <Form.Label>Country or region</Form.Label>
                    <Form.Select id="united_states" className="rounded-0">
                      <option className="display-5 ">United States</option>
                    </Form.Select>
                    <Form.Control
                      type="text"
                      placeholder="Zip"
                      name="zip"
                      value={values.zip}
                      onChange={handleChange}
                      isInvalid={!!errors.zip}
                      className={`form-control shadow-none border border-top-0 rounded-bottom rounded-0 ${style.form_control_zip}`}
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.zip}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                <Row className="pt-4">
                  <Button
                    type="submit"
                    className={`bg-gray border-0 text-gray-text`}
                  >
                    Pay €120
                  </Button>
                </Row>
              </Form>
            )}
          </Formik>
        </Col>

        <Col
          className={` ${style.price_mobile_footer} d-flex align0-items-center justify-content-center pt-3`}
        >
          <div className="pe-3">
            <p className="m-0 d-flex align-items-center">
              Powered by{""}
              <img
                src="assets/icons/logo-stripe.svg"
                width={34}
                height={14}
                className="ms-3"
              />
            </p>
          </div>

          <div className={`${style.price_direction_row_footer} ps-3`}>
            <Link
              href="/terms-of-service"
              className="text-decoration-none text-secondary"
            >
              Terms{" "}
            </Link>
            <Link
              href="/privacy-policy"
              className="text-decoration-none text-secondary"
            >
              Privacy{" "}
            </Link>
          </div>
        </Col>
      </Row>
    </section>
  );
}

export default PaymentComponent;
