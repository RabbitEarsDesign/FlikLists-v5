import AuthContext from "./auth-context";
import { useState, useEffect, useCallback } from "react";
import { useHistory } from "react-router-dom";

let logoutTimer;

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingTime = adjExpirationTime - currentTime;

  return remainingTime;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 0) {
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("token");
    return null;
  }

  return { token: storedToken, duration: remainingTime };
};

const AuthProvider = (props) => {
  const history = useHistory();

  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    setToken(null);
    history.replace("/auth");

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    console.log("LOGOUT");
  }, []);

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(logoutHandler, remainingTime);

    console.log("LOGIN");
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const initialContext = {
    APIKEY: "AIzaSyBuqxeJyN3SQa5OKoTen5TUPNbSSGl2eRk",
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={initialContext}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
