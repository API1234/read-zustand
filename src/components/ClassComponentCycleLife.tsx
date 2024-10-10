import React from 'react';

interface IProps {
  initialCount?: number;
}

interface IState {
  count: number;
}

export class ClassComponentCycleLife extends React.PureComponent<IProps, IState> {
  /**
   * Q：父组件 rerender 的时候，为什么 子组件（类组件）不会重新执行 constructor 阶段
   * 
   * A：
   * 1. **生命周期的顺序**：
   *    - 在类组件的生命周期中，`constructor` 是在组件实例化时调用的。这意味着 `constructor` 只在组件第一次创建时执行，而不是每次更新时。
   *
   * 2. **React 的更新机制**：
   *    - 当父组件重新渲染时，React 会对其子组件进行重新渲染，但子组件的 `constructor` 不会被调用，原因在于 React 只会更新已存在的组件实例。组件的 `render` 方法会被调用，但 `constructor` 只在组件实例化时执行一次。
   *
   * 3. **优化**：
   *    - 这种机制是为了优化性能，避免在组件更新时重复执行不必要的初始化操作。组件的 `state` 和 `props` 更新时，会触发 `render` 方法的调用，而不需要重新实例化组件。
   *
   * 4. **状态和属性更新**：
   *    - 当父组件更新时，如果子组件的 `props` 发生变化，React 会调用子组件的 `render` 方法，进行更新。这也就意味着子组件的内部状态（如 `state`）依然保留，而不是重新构建组件实例。
   *
   * 5. **手动控制更新**：
   *    - 如果需要手动控制子组件的更新逻辑，可以实现 `shouldComponentUpdate` 方法，来决定子组件是否需要重新渲染。
   */
  constructor(props: IProps) {
    console.log('constructor');

    super(props);
    this.state = {
      count: props.initialCount || 0,
    };
  }

  // 根据新的 props 更新 state（挂载和更新阶段都会调用）
  static getDerivedStateFromProps(nextProps: IProps, prevState: IState): Partial<IState> | null {
    console.log('getDerivedStateFromProps', nextProps, prevState);

    // 这里可以根据 props 来更新 state
    return null;
  }

  // 组件首次渲染后调用，可以在这里执行副作用操作
  componentDidMount() {
    console.log('componentDidMount');
  }

  /**
   * 是否重新渲染组件，返回 false 可以阻止更新
   * 
   * - React.PureComponent 自动浅比较 props 和 state，从而避免不必要的渲染，适合纯数据组件（props 和 state 没有深层嵌套的对象）。
   * - React.Component 需要开发者手动优化，适合那些需要更灵活控制渲染逻辑的场景。
   */
  // shouldComponentUpdate(nextProps: IProps, nextState: IState): boolean {
  //   console.log('shouldComponentUpdate');
  //   return true;
  // }

  // 在 DOM 更新前调用，可以获取快照值
  getSnapshotBeforeUpdate(prevProps: IProps, prevState: IState): any {
    console.log('getSnapshotBeforeUpdate', prevProps, prevState);
    if (prevProps.initialCount !== this.props.initialCount) {
      this.setState({ count: this.props.initialCount || 0 });
    }

    return null; // 可以返回一些信息并传递给 componentDidUpdate
  }

  // DOM 更新后调用，可以进行副作用操作
  componentDidUpdate(prevProps: IProps, prevState: IState, snapshot: any) {
    console.log('componentDidUpdate');
  }

  // 组件卸载前调用，执行清理操作
  componentWillUnmount() {
    console.log('componentWillUnmount');
  }

  // 渲染方法，返回 JSX
  render() {
    console.log('render');
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>Increase</button>
      </div>
    );
  }
}

export default ClassComponentCycleLife;