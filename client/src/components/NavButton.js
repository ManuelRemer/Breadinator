import { NavLink } from "react-router-dom";
//styles
import "./NavButton.css";

const NavButton = ({ route, text, end }) => {
  return (
    <div>
      <NavLink
        end={end && end}
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
