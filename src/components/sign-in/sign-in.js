import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Container } from "react-bootstrap";
import style from "./sign-in.module.scss";
import toast, { Toaster } from "react-hot-toast";
import NoSSR from "react-no-ssr";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function SignIn() {

  const router = useRouter();
  const notify = () =>
    toast("Please Enter an email and password", {
      duration: 300,
      position: "top-center",
      icon: "🚫",
      iconTheme: {
        primary: "#000",
        secondary: "#ff7c65",
      },
    });

  async function handleSignIn(values){
     let response = await signIn("credentials", {
                  redirect: false,
                  email: values.email,
                  password: values.password,
                  callbackUrl: "/ ",
              })
      if(response.status !== 200) {
          toast.error('Invalid email or password!')
          return
      }
     toast.success('Sign In Successful!')
     await router.push('/')
  }

  const {values, handleChange, handleSubmit, touched, errors,} = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit:(values)=>{
        handleSignIn(values)
    }

  });

  return (
    <Container className={`${style.container_sign_in}`}>
      <h1 className="display-1">Sign In</h1>
      <p className={`${style.text_wellcom} `}>
        Welcome Back, please login below{" "}
      </p>

      <form className={style.section_email_password} onSubmit={handleSubmit}>

        <fieldset className="border ">
          <legend> Email Address</legend>
          <input
            type="email"
            name="email"
            className="form-control shadow-none"
            id="email"
            onChange={handleChange}
            value={values.email}/>
          <label htmlFor="email" className="visually-hidden">
            email
          </label>
        </fieldset>

        <fieldset className={`border position-relative ${style.password_legend}`}>
          <legend>Password</legend>
          <input
            type="password"
            name="password"
            className="form-control shadow-none"
            id="password"
            onChange={handleChange}
            value={values.password}/>
          <label htmlFor="password" className="visually-hidden">
            Password
          </label>

          <Link href="/forgot" className={`text-black text-decoration-none position-absolute top-0  ${style.forgot_password}`}>
            Forgot Password ?
          </Link>

        </fieldset>
        <NoSSR>

          <button type="submit" className={`btn btn-primary rounded-0  w-100 text-white text p-2 ${style.sign_in_btn}`}>
            SIGN IN
          </button>
          <Toaster/>

        </NoSSR>
      </form>
      
      <div className={`pt-4 ${style.google_facebook_buttons} d-flex flex-column`}>
        <h6 className={style.or_line}>OR</h6>

        <button onClick={() => signIn("google", { callbackUrl: "/home" })}
          className={`d-flex p-1 text-center w-100 bg-white border-forty border align-items-center ${style.countinue_google}`}>
          <img
            className="me-3 m-2"
            src="/assets/icons/google-icon.svg"
            alt=""
            width={20}
            height={20}/>
          <div className="text-uppercase">Continue with Google</div>
        </button>

        <button
          className={`d-flex p-1 text-center w-100 bg-white border-forty border align-items-center ${style.countinue_facebook}`}
          onClick={() => signIn("facebook")}>
          <img
            className="me-3 m-2"
            src="/assets/icons/facebook-icon.svg"
            alt=""
            width={20}
            height={20}/>
          <div className="text-uppercase"> Continue with Facebook</div>
        </button>

        <div className={`${style.account_click_here}`}>
          <p className="text-center ">
            Don't have an account ? {" "}
            <Link href="/signup" className="text-primary text-decoration-none">
              Click Here
            </Link>
          </p>
        </div>

      </div>

    </Container>
  );
}

export default SignIn;
