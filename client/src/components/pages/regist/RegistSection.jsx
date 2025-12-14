import React from "react";

import classes from "./RegistSection.module.css";

const RegistSection = (props) => {
  return (
    <section className={classes.registSection}>
      <h3 className={classes["registSection-title"]}>{props.title}</h3>
      {props.children}
    </section>
  );
};

export default RegistSection;
