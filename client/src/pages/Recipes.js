//Styles
import { Outlet } from "react-router-dom";
import "./Recipes.css";
//

const Recipes = () => {
  return (
    <div>
      Recipes
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Recipes;
