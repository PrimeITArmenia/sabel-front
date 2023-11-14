import Link from "next/link";
import { Container } from "react-bootstrap";
import style from "./exchange-password.module.scss";
import toast, { Toaster } from "react-hot-toast";
import { useState } from "react";
import {useRouter} from "next/router";
import {url} from '@/api'

function ExchangePassord({ token }) {
  const router = useRouter()
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      if (!password || !repeatPassword) {
        throw new Error('Password fields cannot be empty');
      }

      if (password !== repeatPassword) {
        throw new Error('Passwords do not match');
      }
      
      const response = await fetch(`${url}/password/reset`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword: password, token }),
      });
  
      if (!response.ok) {
        const errorResponse = await response.json();
        console.log('errorResponse', errorResponse)
        throw new Error(errorResponse.message || 'Network response was not ok');
      }
      setPassword('');
      setRepeatPassword('');
      const result = await response.json();
      toast.success(result.message);
      await router.push("/signin")
    } catch (error) {
      // console.error('Error:', error);
      toast.error(error.message);
    }
  }

  
  return (
    <>
      <Container className={`${style.container_sign_up} `}>
        <h1 className="display-1 text-center">Exchange Password</h1>

        <form className={style.section_email_password} onSubmit={handleSubmit}>
          <fieldset
            className={`border position-relative ${style.password_legend}`}
          >
            <legend>Password</legend>
            <input
              type="password"
              className="form-control shadow-none"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <label htmlFor="password" className="visually-hidden">
              Password
            </label>
          </fieldset>

          <fieldset
            className={`border position-relative ${style.password_legend}`}
          >
            <legend> Retype Password</legend>
            <input
              type="password"
              className="form-control shadow-none"
              id="repeatPassword"
              onChange={(e) => setRepeatPassword(e.target.value)}
              value={repeatPassword}
            />
            <label htmlFor="repeatPassword" className="visually-hidden">
              Retype Password
            </label>
          </fieldset>
          <button
            type="submit"
            className={`btn btn-primary rounded-0 mt-3 w-100 text-white text p-2 mb-5 ${style.sign_in_btn}`}
          >
            Exchange Password
          </button>
          <Toaster />
        </form>
      </Container>
      <p className={`text-secondary pt-4 ${style.privacy_police}`}>
        By signing up, you agree to our
        <a
          href="/terms-of-service"
          className="text-decoration-none px-1 text-primary"
          as={Link}
        >
          Terms of Service
        </a>
        and
        <a
          href="/privacy-policy"
          className="text-decoration-none px-1 text-primary"
          as={Link}
        >
          Privacy Policy.
        </a>
      </p>
    </>
  );
}

export default ExchangePassord;
