//react
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import BrotHaende from "../components/assets/BrotHaende.jpg";
//Styles
import "./Home.css";
//

function Home() {
  const { data, isPending } = useFetch("/api/v1");

  return (
    <div className="home">
      <img alt="different Breads" src={BrotHaende} className="ScrollImage2" />
      <div className="welcome">
        <p>Design your own</p>
        <span className="welcome-highlight">Bread</span>
        <p>with the ingredients</p> <p>you want</p>
      </div>
    </div>
  );
}

export default Home;
