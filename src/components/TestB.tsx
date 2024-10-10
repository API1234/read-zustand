import React from "react";
import { usePersonStore } from "../store/person"

export const TestB: React.FC = () => {
  const { firstName, lastName, updateLastName } = usePersonStore()
  // const updateLastName = usePersonStore((state) => state.updateLastName)

  console.log('TestB render')


  return <div>
    <h1>TestB</h1>
    <div>firstName: {firstName}</div>
    <div>lastName: {lastName}</div>

    <div onClick={() => updateLastName('TestB' + Math.random())}> updateLastName</div >
  </div>;
}