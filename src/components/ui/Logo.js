import React from "react";

// CLASSES & IMG
import img from "../../../src/logo.png";
import classes from "./Logo.module.css";
function Logo() {
  return (
    <>
      <div className={classes.img}>
        <img src={img} alt="" />
      </div>
      <h1>FlikLists</h1>
    </>
  );
}

export default Logo;
