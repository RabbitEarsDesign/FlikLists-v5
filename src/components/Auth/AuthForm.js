import React, { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store/auth-context";
// HOOKS
import useInput from "../../hooks/use-input";
import useHttp from "../../hooks/use-http";
// CLASSES
import classes from "./AuthForm.module.css";

function AuthForm() {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPassword,
  } = useInput((value) => value.trim().length >= 6);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((state) => !state);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // Http req
    let url;
    if (isLogin) {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${authContext.APIKEY}`;
    } else {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${authContext.APIKEY}`;
    }

    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((err) => {
            throw new Error(err.error.message);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authContext.login(data.idToken, expirationTime.toISOString());
        history.replace("/home");
      })
      .catch((err) => alert(err.message));
  };

  const emailClasses = emailHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  const passwordClasses = passwordHasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={submitHandler}>
        <div className={emailClasses}>
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onBlur={emailBlurHandler}
            onChange={emailChangeHandler}
            required
          />
          {emailHasError && (
            <p className={classes["error-text"]}>Email must be valid</p>
          )}
        </div>
        <div className={passwordClasses}>
          <label htmlFor="email">Your Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onBlur={passwordBlurHandler}
            onChange={passwordChangeHandler}
            required
          />
          {passwordHasError && (
            <p className={classes["error-text"]}>
              Password must be 6 or more characters
            </p>
          )}
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? "Login" : "Create Account"}</button>
          )}
          {isLoading && <button>Loading...</button>}
          <button
            onClick={switchAuthModeHandler}
            className={classes.toggle}
            type="button"
          >
            {" "}
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default AuthForm;
