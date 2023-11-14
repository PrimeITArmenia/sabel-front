import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import { fetcher } from "../../utils";
import style from "./sign-up.module.scss";
import axios from "axios";
import { Exception } from "sass";
import toast, { Toaster } from "react-hot-toast";
import NoSSR from "react-no-ssr";
import {url} from '@/api'

function SignUp() {


  const router = useRouter();
  const notify = () => toast("Confirm password field doesn't match", {
      duration: 2000,
      position: "top-center",
      icon: "🚫",
      iconTheme: {
        primary: "#000",
        secondary: "#ff7c65",
      },
    });

  const { values,
    touched, errors,
    handleChange, handleSubmit,
    } = useFormik({
      initialValues: {
        email: "",
        name: "",
        password: "",
        repeatPassword: "",
      },
    onSubmit: async ({ email, name, password, repeatPassword }) => {
      if (password === repeatPassword) {
        try{
          const response = await fetcher.post("/auth/signup", { email, name, password }, {
            baseURL: `${url}`,
          })
          if (response.status === 201) {
              console.log("singup___,",response)
              toast.success('Register has successfully ! ',{
                autoClose: 3000,
              })
              await router.push("/signin");
          }
        }catch (error){
          console.log('error-singup', error)
          throw new Exception(error, "something went wrong...")
        }
      }
    }
  });


  return (
    <>
      <Container className={`${style.container_sign_up}`}>
        <h1 className="display-1 ">Sign Up</h1>
        <p className={`${style.text_wellcom} `}>
          Welcome, please create your account
        </p>
        <form className={style.section_email_password} onSubmit={handleSubmit}>

          <fieldset className="border ">
            <legend> Email Address</legend>
            <input
              type="email"
              className="form-control shadow-none"
              id="email"
              onChange={handleChange}
              value={values.email}
            />
            <label htmlFor="email" className="visually-hidden">
              email
            </label>
          </fieldset>

          <fieldset className={`border ${style.name_surname}`}>
            <legend> Full Name</legend>
            <input
              type="name"
              className="form-control shadow-none"
              id="name"
              onChange={handleChange}
              value={values.name}
            />
            <label htmlFor="name" className="visually-hidden">
              email
            </label>
          </fieldset>

          <fieldset className={`border position-relative ${style.password_legend}`}>
            <legend>Password</legend>
            <input
              type="password"
              className="form-control shadow-none"
              id="password"
              onChange={handleChange}
              value={values.password}
            />
            <label htmlFor="password" className="visually-hidden">
              Password
            </label>
          </fieldset>

          <fieldset className={`border position-relative ${style.password_legend}`}>
            <legend> Retype Password</legend>
            <input
              type="password"
              className="form-control shadow-none"
              id="repeatPassword"
              onChange={handleChange}
              value={values.repeatPassword}
            />
            <label htmlFor="repeatPassword" className="visually-hidden">
              Retype Password
            </label>
          </fieldset>

          <button  onClick={notify} type="submit" className={`btn btn-primary rounded-0 mt-3 w-100 text-white text p-2 ${style.sign_in_btn}`}>
            SIGN UP
          </button>
          <Toaster />

        </form>

        <div className={`pt-4 ${style.google_facebook_buttons} d-flex flex-column`}>

          <h6 className={style.or_line}>OR</h6>

          <button onClick={() => "google"} className={`d-flex p-1 text-center w-100 bg-white border-forty border align-items-center ${style.countinue_google}`}>
            <img className="me-3 m-2"
              src="assets/icons/google-icon.svg"
              alt="" width={20} height={20}/>
            <div className="text-uppercase">Continue with Google</div>
          </button>

          <button onClick={() => signIn("facebook")} className={`d-flex p-1 text-center w-100 bg-white border-forty border align-items-center ${style.countinue_facebook}`}>
            <img className="me-3 m-2"
              src="assets/icons/facebook-icon.svg"
              alt="" width={20} height={20}/>
            <div className="text-uppercase"> Continue with Facebook</div>
          </button>

          <div className={`${style.account_click_here}`}>

            <p className="text-center">
              Already have an account?{" "}
              <Link href="/signin" className="text-primary text-decoration-none">
                Click Here
              </Link>
            </p>

          </div>
        </div>
      </Container>

      <p className={`text-secondary pt-4 ${style.privacy_police}`}>
        By signing up, you agree to our
        <a href="/terms-of-service" className="text-decoration-none px-1 text-primary" as={Link}>
          Terms of Service
        </a>
        and
        <a href="/privacy-policy" className="text-decoration-none px-1 text-primary" as={Link}>
          Privacy Policy.
        </a>
      </p>

    </>
  );
}

export default SignUp;
