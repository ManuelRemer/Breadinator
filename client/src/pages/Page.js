//Components
import Header from "../components/Header";
import NavBar from "../components/NavBar";
//Styles
import "./Page.css";

const Page = ({ data, children, scheme, text }) => {
  return (
    <div className={scheme}>
      <div className="Pages">
        <Header text={text} />
        <div className="Pages__content">{children}</div>
        <NavBar data={data} />
      </div>
    </div>
  );
};

export default Page;
