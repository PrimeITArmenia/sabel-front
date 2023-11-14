"use client";

import style from "./pasion.module.scss";
import { Container } from "react-bootstrap";
import CardsList from "../cards-list";
import FilterComponent from "../filter/filter";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import { useState, useEffect } from "react";
import Loading from '../loading/index'

function CategoryComponents({category, description, articles}) {
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);
  // const [isLoading, setIsLoading] = useState(false)


  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  // useEffect(() => {
  //   if(category && description || articles) {
  //     setIsLoading(true)
  //   }
  // }, [category, description, articles]);


  return (
    <>

      <section className={style.pasion_section}>
        <Container fluid className="px-5">

                  <h1 className="text-center display-1">{category}</h1>
                  <p className={style.categories_description}>
                    {description}
                  </p>

                  <div className={` pt-3 ${style.passion_container} `}>
                    <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>

                      <Modal.Header closeButton>
                        <Modal.Title> Filter Search </Modal.Title>
                      </Modal.Header>

                      <div className="p-4">
                        <FilterComponent />
                      </div>

                    </Modal>

                    <Row>
                      <Col lg={12} className="">
                        <CardsList data={articles} equal={true} onFavoriteClick={false} />
                      </Col>
                    </Row>

                  </div>
        </Container>
      </section>

    </>
  );
}

export default CategoryComponents;
