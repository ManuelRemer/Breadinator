import "./App.css";
import "./var.css";
//packages
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
//react
import { useEffect, useState } from "react";
//components
import Home from "./pages/Home.js";
import Create from "./pages/Create.js";
import Recipes from "./pages/Recipes";
import SingleRecipe from "./pages/SingleRecipe.js";
import Header from "./components/Header";
//custom hooks
import useFetch from "./hooks/useFetch";
import NavBar from "./components/NavBar";

function App() {
  const { data, isPending } = useFetch("/api/v1");

  return (
    <div className="App">
      <div className="Pages">
        <BrowserRouter>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element=<Home /> />
              <Route path="create" element=<Create /> />
              <Route path="recipes" element=<Recipes />>
                <Route path=":idv" element=<SingleRecipe /> />
              </Route>
            </Routes>
            <NavBar data={data} />
          </div>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
