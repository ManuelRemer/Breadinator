//Styles
import "./App.css";
import "./var.css";
//packages
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
//react

//components
import Home from "./pages/Home.js";
import Create from "./pages/Create.js";
import Recipes from "./pages/Recipes";
import SingleRecipe from "./pages/SingleRecipe.js";
//custom hooks
import useFetch from "./hooks/useFetch";

function App() {
  const { data, isPending } = useFetch("/api/v1");

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element=<Home data={data} /> />
          <Route path="create" element=<Create data={data} /> />
          <Route path="recipes" element=<Recipes data={data} />>
            <Route path=":idv" element=<SingleRecipe /> />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
