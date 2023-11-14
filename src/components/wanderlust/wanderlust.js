import { Container } from "react-bootstrap";
import style from "./wanderlust.module.scss";
import CardsList from "./../cards-list";
import FilterComponent from "../filter/filter";
import { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function WanderlustLeyout() {
  const array = [
    {
      hasBg: "assets/images/wanderlust-image3.webp",
      title: "Title goes here",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: true,
    },
    {
      hasBg: "assets/images/wanderlust-image2.webp",
      title: "Title goes here",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: false,
    },
    {
      hasBg: "assets/images/wanderlust-image1.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: true,
    },
    {
      hasBg: "assets/images/wanderlust-image1.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: true,
    },
    {
      hasBg: "assets/images/wanderlust-image2.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: true,
    },
    {
      hasBg: "assets/images/wanderlust-image1.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: false,
    },
    {
      hasBg: "assets/images/wanderlust-image1.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: false,
    },
    {
      hasBg: "assets/images/wanderlust-image1.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: false,
    },
    {
      hasBg: "assets/images/wanderlust-image1.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: false,
    },
    {
      hasBg: "assets/images/wanderlust-image1.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: false,
    },
    {
      hasBg: "assets/images/wanderlust-image1.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: false,
    },
    {
      hasBg: "assets/images/wanderlust-image1.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: false,
    },
    {
      hasBg: "assets/images/wanderlust-image1.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: false,
    },
    {
      hasBg: "assets/images/wanderlust-image1.webp",
      title: "Title",
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since ...",
      onFavoriteClick: true,
      isFavorite: false,
    },
  ];
  // const [show, setShowState] = useState(false);
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  return (
    <section className={style.wanderlust_section}>
      <Container fluid className="px-5 pb-5">
        <h1 className="text-center display-1">Wanderlust chronicles</h1>
        <div className={` pt-3 ${style.wanderlust_container} `}>
          {values.map((v, idx) => (
            <Button
              key={idx}
              className={`border-0 bg-primary text-quaternary ${style.button_filter} my-3`}
              onClick={() => handleShow(v)}
            >
              <img src="assets/icons/filter.svg" />
              <span>Filter</span>
              {typeof v === "string" && `below ${v.split("-")[0]}`}
            </Button>
          ))}
          <Modal
            show={show}
            fullscreen={fullscreen}
            onHide={() => setShow(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Filter Search</Modal.Title>
            </Modal.Header>
            <div className="p-4">
              <FilterComponent />
            </div>
          </Modal>

          <Row className={style.wanderlust_body}>
            <Col lg={3}>
              <div className={`${style.filter_component} `}>
                <FilterComponent />
              </div>
            </Col>
            <Col lg={9}>
              <CardsList equal={true} array={array} />
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
}

export default WanderlustLeyout;
