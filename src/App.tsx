import React from 'react';
import './App.css';
import { TestA } from "./components/TestA";
import { TestB } from "./components/TestB";
import { TestC } from "./components/TestC";

function App() {
  console.log('App render')

  return (
    <div>
      <h1>Hello World API</h1>

      <TestA />
      <TestB />
      <TestC />
    </div>
  );
}

export default App;
