import { NavLink } from "react-router-dom";
//styles
import "./NavButton.css";
import Icon from "./assets/test.js";
import { useState } from "react";

const NavButton = ({ route, text, end, icon }) => {
  return (
    <div>
      <NavLink
        end={end && end}
        to={route}
        className={({ isActive }) =>
          isActive ? "navButton navButton--active" : "navButton"
        }
      >
        {text ? text : <Icon />}
      </NavLink>
    </div>
  );
};

export default NavButton;
