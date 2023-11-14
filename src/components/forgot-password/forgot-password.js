import Link from "next/link";
import { Container } from "react-bootstrap";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import style from "./forgot-password.module.scss";
import {url} from '@/api'

function ForgotPassword() {
  const [email, setEmail] = useState('');

  async function handleFormSubmit(event) {
    event.preventDefault();

    if( email === "" ){
      toast.error('Field can not be empty ',)
      return
    }
    try {
      const response = await fetch(`${url}/password/forgot`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      console.log('Result:', result.message);
      toast.success(result.message,{
        autoClose : 3000,
      })
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message);
    }
  
  }

  return (
    <section className={style.forgotpassword_section}>
      <Toaster/>
      <Container className={` mt-5 ${style.container_forgotpassword}`}>
        <h1 className="display-1">Find your account</h1>
        <p className={`${style.text_wellcom}`}>
          Please enter your email to search for your account
        </p>
        <form className={style.section_email_password} onSubmit={handleFormSubmit}>
          <fieldset className="border ">
            <legend> Email Address</legend>
            <input
              type="email"
              className="form-control shadow-none"
              id="email"
              placeholder="ivanftw85@gmail.com"
              onChange={(event) => setEmail(event.target.value)}
            />
            <label htmlFor="email" className="visually-hidden">
              email
            </label>
          </fieldset>

          <button
            type="submit"
            className={`btn btn-primary rounded-0 mt-3 w-100 text-white text p-2 ${style.sign_in_btn}`}
          >
            Search
          </button>
        </form>
        <div
          className={`pt-4 ${style.google_facebook_buttons} d-flex flex-column`}
        >
          <div className={`${style.account_click_here}`}>
            <p className="text-center">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary text-decoration-none">
                Click Here
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default ForgotPassword;
