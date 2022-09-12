import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";

function App() {
  const [count, setCount] = useState<number>(0);

  return (
    <div className='App'>
      {count}
      <button onClick={() => setCount(count + 1)}>+1</button>
    </div>
  );
}

export default App;
