//styles
import "./NavBar.css";
//components
import NavButton from "./NavButton";
//assets

const NavBar = ({ data }) => {
  return (
    <div className="navBar">
      <ul>
        <li>
          <NavButton route="/" icon end />
        </li>
        <li>
          {data && data.items.length > 0 && (
            <NavButton route="/recipes" text="all" end />
          )}
        </li>
        <li>
          <NavButton route="/create" text="new" />
        </li>
      </ul>
    </div>
  );
};

export default NavBar;
