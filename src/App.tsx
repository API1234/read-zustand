import React from 'react';
import './App.css';
import TestA from "./components/TestA";
import TestB from "./components/TestB";
import TestC from "./components/TestC";
import { ClassComponentCycleLife } from "./components/ClassComponentCycleLife";

function App() {
  console.log('App render')

  const [count, setCount] = React.useState(10);
  const [count2, setCount2] = React.useState(10);

  return (
    <div>
      <h1>Hello World API</h1>

      <TestA />
      <TestB />
      <TestC />
      <ClassComponentCycleLife initialCount={count} />
      <button onClick={() => setCount(count + 1)}>父组件更新 initialCount</button>

      <div>{count2}</div>
      <button onClick={() => setCount2(count2 + 1)}>子组件更新 count2</button>
    </div>
  );
}

export default App;
