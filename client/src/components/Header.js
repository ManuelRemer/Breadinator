//styles
import "./Header.css";

const Header = ({ text = "Breadinator" }) => {
  return (
    <div className="Header">
      <h1>{text}</h1>
    </div>
  );
};

export default Header;
