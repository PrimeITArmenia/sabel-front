import { Container } from "react-bootstrap";
import style from "./ciao-jhon.module.scss";
import CardsList from "./../cards-list";

function CiaoJhon() {
  const array = [
    {
      hasBg: "assets/images/ciao-image-item.webp",
      title: "Wanderlust chronicles",
    },
    {
      hasBg: "assets/images/ciao-image-item2.webp",
      title: "Cozy corner",
    },
  ];
  return (
    <section className={style.ciao_section}>
      <Container className="px-5 mt-5 d-flex justify-content-center flex-column">
        <h1 className="text-center display-1 pb-5">Ciao John Mayer</h1>
        <p className={style.text_ciao}>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. Lorem Ipsum is simply dummy
          text of the printing and typesetting industry. Lorem Ipsum has been
          the industry's standard dummy text ever since the 1500s, when an
          unknown printer took a galley of type and scrambled it to make a type
          specimen book.
        </p>
        <div className={style.ciao_cards}>
          {" "}
          <CardsList array={array} equal={true} className={`${style.ciao_cards}  `} />
        </div>
      </Container>
    </section>
  );
}

export default CiaoJhon;
