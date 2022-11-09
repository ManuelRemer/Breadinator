import { NavLink } from "react-router-dom";
//custom hooks
import useFetch from "../hooks/useFetch";
// components
import NavButton from "./NavButton";
//styles
import "./Header.css";

const Header = () => {
  const { data, isPending } = useFetch("/api/v1");
  return (
    <div className="Header">
      <ul>
        <li>
          <h1>Breadinator</h1>
        </li>
        <li>
          <NavButton route="/" text="home" end />
          {data && data.items.length > 0 && (
            <NavButton route="/recipes" text="all" />
          )}
          <NavButton route="/create" text="new" />
        </li>
      </ul>
    </div>
  );
};

export default Header;
