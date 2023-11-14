import style from "./footer.module.scss";
import Link from "next/link";

function Footer() {
  return (
    <section className={` text-center  ${style.footer_section}`}>
      <div className="pt-5">
        <img src="assets/icons/typewriter-logo-icon.svg" alt="" />
      </div>
      <h6 className="pt-4 text-secondary">
        Sign up now and let's make sustainable fashion the new black!
      </h6>
      <h2 className={`fs-1 pt-3 mx-auto  ${style.decoration}`}>
        Join our sustainable style squad and never miss a beat on the latest
        sustainable fashion and trends!
      </h2>

      <div className={`${style.email_form} border-bottom border-black `}>
        <form
          className={`d-flex w-100 border-0 text-black ${style.footer_input_email}`}
        >
          <label
            htmlFor="exampleInputEmail1"
            className={`form-label  border-0 text-black ${style.footer_input_email}`}
          ></label>
          <input
            type="email"
            className={`form-control border-0 text-black shadow-none ${style.footer_input_email}`}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter your email address"
          />

          <button type="submit" className="btn">
            <img
              src="/assets/images/arrow-left.webp"
              width={26}
              height={26}
              alt=""
            />
          </button>
        </form>
      </div>
      {/*  */}

      <div className="pb-5">
        <p className={`text-secondary pt-4 ${style.footer_text_privacypolicy}`}>
          By subscribing to the Sabel's newsletter, you agree to our
          <Link
            href="/termsofservice"
            className="text-decoration-none px-1 text-black"
          >
            Terms of Service
          </Link>
          and
          <Link
            href="/privacypolicy"
            className=" text-decoration-none px-1 text-black"
          >
            Privacy Policy.
          </Link>
        </p>
      </div>
    </section>
  );
}

export default Footer;
