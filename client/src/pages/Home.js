//react
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
//Styles
import "./Home.css";
//

function Home() {
  const { data, isPending } = useFetch("/hello-world", "GET");
  useEffect(() => {
    console.log(data);
  }, [isPending, data]);
  return (
    <div className="Pages">
      <h1> Breadinator </h1>
      <p>{data}</p>
      {/* <button
        onClick={async () => {
          const result = await fetch("/api/v1");
          const text = await result.json();
          console.log(text);
        }}
      >
        hallo
      </button> */}
    </div>
  );
}

export default Home;
