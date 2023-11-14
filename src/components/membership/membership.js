import { Container } from "react-bootstrap";
import style from "./membership.module.scss";

function Membership() {
  return (
    <section className={style.membership_sabel}>
      <Container className={`${style.membership_container}`}>

        <h1 className="text-center display-1">Membership</h1>

        <p className={`text-center text-md-start pt-2 ${style.membership_text}`}>
          Our newsletter is intended to be a source of inspiration, education,
          and connection. You'll receive the latest news and trends in
          sustainability, ethical fashion, and conscious living, as well as tips
          and tricks for living a more sustainable lifestyle. Through our
          membership we want to take it one step further: it is a way for you to
          take action
          <br />
          <br /> You'll be the first to know about exclusive offers, events, and
          opportunities to get involved in sustainability and ethical fashion.
          <br />
          <br />
          You'll also have access to resources, a vast area of projects you may
          want to support and tools to help you make a positive impact on the
          world. <br />
          <br />
          Becoming a member will empower you to make a difference, whether it's
          by making small changes in your daily life or by supporting
          sustainable fashion brands and initiatives. <br />
          <br />
          You'll also have the opportunity to connect with like-minded
          individuals and share your own ideas and experiences.
        </p>

        <div className={`${style.membership_image} text-center`}></div>
      </Container>
    </section>
  );
}

export default Membership;
