//React + Router
import { NavLink } from "react-router-dom";
//Styles
import "./NavButton.css";
//Assets
import Icon from "./assets/HomeIcon.js";

const NavButton = ({ route, text, end }) => {
  return (
    <div>
      <NavLink
        end={end && end}
        to={route}
        className={({ isActive }) => (isActive ? "navButton--active" : "")}
      >
        {text ? text : <Icon />}
      </NavLink>
    </div>
  );
};

export default NavButton;
