//react
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
//Styles
import "./Home.css";
//

function Home() {
  const { data, isPending } = useFetch("/api/v1");

  return <div>home</div>;
}

export default Home;
