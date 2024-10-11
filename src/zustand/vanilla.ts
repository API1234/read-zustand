type SetStateInternal<T> = {
  _(
    partial: T | Partial<T> | { _(state: T): T | Partial<T> }["_"],
    replace?: false
  ): void;
  _(state: T | { _(state: T): T }["_"], replace: true): void;
}["_"];

export interface StoreApi<T> {
  setState: SetStateInternal<T>;
  getState: () => T;
  getInitialState: () => T;
  subscribe: (listener: () => void) => () => void;
}

type Get<T, K, F> = K extends keyof T ? T[K] : F;

export type Mutate<S, Ms> = number extends Ms["length" & keyof Ms]
  ? S
  : Ms extends []
  ? S
  : Ms extends [[infer Mi, infer Ma], ...infer Mrs]
  ? Mutate<StoreMutators<S, Ma>[Mi & StoreMutatorIdentifier], Mrs>
  : never;

export type StateCreator<
  T,
  Mis extends [StoreMutatorIdentifier, unknown][] = [],
  Mos extends [StoreMutatorIdentifier, unknown][] = [],
  U = T
> = ((
  setState: Get<Mutate<StoreApi<T>, Mis>, "setState", never>,
  getState: Get<Mutate<StoreApi<T>, Mis>, "getState", never>,
  store: Mutate<StoreApi<T>, Mis>
) => U) & { $$storeMutators?: Mos };

export interface StoreMutators<S, A> {}
export type StoreMutatorIdentifier = keyof StoreMutators<unknown, unknown>;

type CreateStore = {
  <T, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>
  ): Mutate<StoreApi<T>, Mos>;

  <T>(): <Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>
  ) => Mutate<StoreApi<T>, Mos>;
};

type CreateStoreImpl = <
  T,
  Mos extends [StoreMutatorIdentifier, unknown][] = []
>(
  initializer: StateCreator<T, [], Mos>
) => Mutate<StoreApi<T>, Mos>;

const createStoreImpl: CreateStoreImpl = (createState) => {
  // console.log("createStoreImpl", createState);
  type TState = ReturnType<typeof createState>;
  type Listener = () => void;
  let state: TState;
  const listeners: Set<Listener> = new Set();

  const setState: StoreApi<TState>["setState"] = (partial, replace) => {
    console.log("setState - args - partial", partial);
    // console.log("setState - args - replace", replace);
    // TODO: Remove type assertion once https://github.com/microsoft/TypeScript/issues/37663 is resolved
    // https://github.com/microsoft/TypeScript/issues/37663#issuecomment-759728342
    const nextState =
      typeof partial === "function"
        ? (partial as (state: TState) => TState)(state)
        : partial;
    if (!Object.is(nextState, state)) {
      const previousState = state;
      state =
        replace ?? (typeof nextState !== "object" || nextState === null)
          ? (nextState as TState)
          : Object.assign({}, state, nextState);
      console.log("setState - listeners", listeners);
      listeners.forEach((listener) => listener());
    }
  };

  const getState: StoreApi<TState>["getState"] = () => state;

  const getInitialState: StoreApi<TState>["getInitialState"] = () =>
    initialState;

  const subscribe: StoreApi<TState>["subscribe"] = (listener) => {
    listeners.add(listener);
    // Unsubscribe
    return () => listeners.delete(listener);
  };

  const api = { setState, getState, getInitialState, subscribe };
  const initialState = (state = createState(setState, getState, api));
  // console.log("api", api);
  // console.log("initialState", initialState);
  // console.log("listeners", listeners);
  // console.log("state", state);
  return api as any;
};

export const createStore = ((createState) =>
  createState ? createStoreImpl(createState) : createStoreImpl) as CreateStore;
