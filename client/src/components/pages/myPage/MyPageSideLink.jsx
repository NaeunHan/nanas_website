import React from "react";
import classes from "./MyPageSideLink.module.css";
import { NavLink } from "react-router-dom";

const MyPageSideLink = ({ to, text, first, onClick }) => {
  return (
    <React.Fragment>
      <NavLink
        to={to}
        className={({ isActive }) => (isActive ? classes.active : "")}
        end={first && true}
        onClick={onClick}
      >
        {text}
      </NavLink>
    </React.Fragment>
  );
};

export default MyPageSideLink;
