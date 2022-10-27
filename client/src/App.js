import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [text, setText] = useState("");

  useEffect(() => {
    fetch("/hello-world")
      .then((res) => res.json())
      .then((data) => setText(data));
  });

  return (
    <div className="App">
      <h1> {text} </h1>
      <button
        onClick={async () => {
          const result = await fetch("/api/v1");
          const text = await result.json();
          console.log(text);
        }}
      >
        hallo
      </button>
    </div>
  );
}

export default App;
