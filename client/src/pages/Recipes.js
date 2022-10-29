//Styles
import { Outlet } from "react-router-dom";
import "./Recipes.css";
//

const Recipes = () => {
  return (
    <div>
      <div>
        <Outlet />
      </div>
      Recipes
    </div>
  );
};

export default Recipes;
