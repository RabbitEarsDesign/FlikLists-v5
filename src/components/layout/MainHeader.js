import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../../store/auth-context";
// COMPONENTS
import Button from "../ui/Button";
// CLASSES & IMG
import classes from "./MainHeader.module.css";
import img from "../../../src/logo.png";

function MainHeader() {
  const authContext = useContext(AuthContext);

  const logoutHandler = () => {
    authContext.logout();
  };

  return (
    <header className={classes.header}>
      <nav className={classes.nav}>
        <ul className={classes.flex}>
          {authContext.isLoggedIn && (
            <li>
              <NavLink activeClassName={classes.active} to="/mylist">
                My List
              </NavLink>
            </li>
          )}
          <li>
            <NavLink activeClassName={classes.active} to="/home">
              Find Movies
            </NavLink>
          </li>
        </ul>
        <div className={classes.flex}>
          <div className={classes.img}>
            <img src={img} alt="" />
          </div>
        </div>
        <ul className={classes.flex}>
          <li>
            <NavLink activeClassName={classes.active} to="/user">
              User
            </NavLink>
          </li>

          {authContext.isLoggedIn && (
            <Button onClick={logoutHandler}>Logout</Button>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
