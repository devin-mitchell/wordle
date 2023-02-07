import { useEffect, useState } from "react";

import Wordle from "./components/Wordle";

function App() {
  const [solution, setSolution] = useState(null);

  useEffect(() => {
    fetch("https://random-word-api.herokuapp.com/word?length=5")
      .then((res) => res.json())
      .then((json) => {
        console.log("JSON: ", json[0]);
        const randomSolution = json[0];
        setSolution(randomSolution);
      });
  }, [setSolution]);

  return (
    <div className="App">{solution && <Wordle solution={solution} />}</div>
  );
}

export default App;
