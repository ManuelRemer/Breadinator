//Components
import Page from "./Page";
//Styles
import "./Recipes.css";

const Recipes = ({ data }) => {
  return (
    <Page data={data} scheme="Recipes" text="Your Recipes">
      Recipes
    </Page>
  );
};

export default Recipes;
