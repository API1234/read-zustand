import React from 'react';
import './App.css';
import TestA from "./components/TestA";
import TestB from "./components/TestB";
import TestC from "./components/TestC";
import { ClassComponentCycleLife } from "./components/ClassComponentCycleLife";
import { RenderOptimizationMemo, NoRenderOptimization } from './components/ZustandRenderOptimization'
import { usePersonStore } from './store/person';

function App() {
  console.log('App render')

  const [count, setCount] = React.useState(10);
  const [count2, setCount2] = React.useState(10);

  const { updateFirstName, updateLastName, firstName, lastName } = usePersonStore()

  return (
    <div>
      <h1>Hello World API</h1>
      <label>First Name: </label>
      <input type="text" value={firstName} onChange={(e) => updateFirstName(e.target.value)} />
      <label>Last Name: </label>
      <input type="text" value={lastName} onChange={(e) => updateLastName(e.target.value)} />

      {/* <TestA />
      <TestB />
      <TestC />
      <ClassComponentCycleLife initialCount={count} />
      <button onClick={() => setCount(count + 1)}>父组件更新 initialCount</button>

      <div>{count2}</div>
      <button onClick={() => setCount2(count2 + 1)}>子组件更新 count2</button> */}

      <RenderOptimizationMemo />
      <NoRenderOptimization />
    </div>
  );
}

export default App;
