import React from "react";
import { usePersonStore } from "../store/person"

export const TestC: React.FC = () => {
  const { userInfo, updateUserInfo } = usePersonStore()
  // const updateLastName = usePersonStore((state) => state.updateLastName)

  console.log('TestC render')


  return <div>
    <h1>TestC</h1>
    <div>userInfo: {userInfo.name}</div>
    <div>userInfo: {userInfo.age}</div>
    <button onClick={() => updateUserInfo({ name: 'Pishiheng', age: 28 })}>Update User Info</button>
  </div>;
}

export default React.memo(TestC)