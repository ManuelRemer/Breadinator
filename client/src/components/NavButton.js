import { NavLink } from "react-router-dom";
//styles
import "./NavButton.css";

const NavButton = ({ route, text }) => {
  return (
    <div>
      <NavLink
        to={route}
        className={({ isActive }) =>
          isActive ? "navButton navButton--active" : "navButton"
        }
      >
        <button> {text}</button>
      </NavLink>
    </div>
  );
};

export default NavButton;
