import React from "react";
import { usePersonStore } from "../store/person"
import { shallow } from 'zustand/shallow';
import { useShallow } from 'zustand/react/shallow';


export const RenderOptimization: React.FC = () => {
  const { firstName } = usePersonStore(useShallow(state => ({ firstName: state.firstName })))

  console.log('Zustand Render Optimization render')


  return <div>
    <h1>Zustand Render Optimization</h1>
    <div>firstName: {firstName}</div>
  </div>;
}
export const RenderOptimizationMemo = React.memo(RenderOptimization)

export const NoRenderOptimization: React.FC = () => {
  const { lastName } = usePersonStore()

  console.log('No Zustand Render Optimization render')


  return <div>
    <h1>No Zustand Render Optimization</h1>
    <div>lastName: {lastName}</div>
  </div>;
}
export const NoRenderOptimizationMemo = React.memo(NoRenderOptimization)