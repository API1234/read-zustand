import React from "react";
import { usePersonStore } from "../store/person"

export const TestA: React.FC = () => {
  // const { firstName,lastName } = usePersonStore()
  const firstName = usePersonStore((state) => state.firstName)
  const lastName = usePersonStore((state) => state.lastName)


  console.log('TestA render')

  return <div>
    <h1>TestA</h1>
    <div>firstName: {firstName}</div>
    <div>lastName: {lastName}</div>
  </div>;
}