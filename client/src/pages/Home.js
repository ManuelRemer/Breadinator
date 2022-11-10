//react
//Assets
import BrotHaende from "../components/assets/BrotHaende.jpg";
//Styles
import "./Home.css";
//Components
import Page from "./Page";

function Home({ data }) {
  return (
    <Page data={data} scheme="Home" text="Breadinator">
      <img alt="different Breads" src={BrotHaende} />
      <div className="Home__welcomeText">
        <p>Design your own</p>
        <span className="welcome-highlight">Bread</span>
        <p>with the ingredients</p> <p>you want</p>
      </div>
    </Page>
  );
}

export default Home;
