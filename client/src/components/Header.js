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
      <h1>Breadinator</h1>
    </div>
  );
};

export default Header;
