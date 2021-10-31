import React, { useContext } from "react";
import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
// COMPONENTS
import useInput from "../../hooks/use-input";
import Button from "../ui/Button";
import Card from "../ui/Card";
// HOOKS
import useHttp from "../../hooks/use-http";
// CSS
import classes from "./ChangePasswordForm.module.css";

function ChangePasswordForm() {
  const history = useHistory();
  const authContext = useContext(AuthContext);

  const {
    value,
    isValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (isValid) {
    formIsValid = true;
  }

  const { sendRequest, isLoading, error } = useHttp();

  const submitHandler = async (e) => {
    e.preventDefault();

    sendRequest(
      {
        url: `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${authContext.APIKEY}`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          idToken: authContext.token,
          password: value,
          returnSecureToken: true,
        },
      },
      authContext.login()
    );
    // http hook (need to figure out the applyData func )

    // below is the code from the auth lectures ... for now
    // fetch(
    //   `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${authContext.APIKEY}`,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     method: "POST",
    //     body: JSON.stringify({
    //       idToken: authContext.token,
    //       password: value,
    //       returnSecureToken: false,
    //     }),
    //   }
    // )
    //   .then((res) => {
    //     res.json().then((data) => {
    //       authContext.login(data.idToken);
    //
    //     });
    //   })
    //   .catch();
    //
    history.replace("/");
    reset();
  };

  const changePasswordClasses = hasError
    ? `${classes.control} ${classes.invalid}`
    : `${classes.control}`;

  return (
    <Card>
      <form onSubmit={submitHandler}>
        <div className={changePasswordClasses}>
          <label htmlFor="">New Password</label>
          <input
            type="password"
            onChange={valueChangeHandler}
            onBlur={inputBlurHandler}
            value={value}
          />
          {hasError && <p>Password cannot be empty</p>}
        </div>
        <div className={classes.action}>
          <Button disabled={!formIsValid}>
            {!isLoading ? "Change Password" : "Sending..."}
          </Button>
        </div>
        {error && <p>{error}</p>}
      </form>
    </Card>
  );
}

export default ChangePasswordForm;
