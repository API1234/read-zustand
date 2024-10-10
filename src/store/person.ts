import { create } from "../zustand/react";

type State = {
  firstName: string;
  lastName: string;
  userInfo: {
    name: string;
    age: number;
  };
};

type Action = {
  updateFirstName: (firstName: State["firstName"]) => void;
  updateLastName: (lastName: State["lastName"]) => void;
  updateUserInfo: (userInfo: State["userInfo"]) => void;
};

// Create your store, which includes both state and (optionally) actions
export const usePersonStore = create<State & Action>()((set) => {
  console.log("Creating person store");

  return {
    firstName: "init first name",
    lastName: "init last name",
    userInfo: {
      name: "init name",
      age: 0,
    },
    updateFirstName: (firstName) => set(() => ({ firstName: firstName })),
    updateLastName: (lastName) =>
      set((state) => {
        console.log("updating last name", state);
        return {
          lastName: lastName,
        };
      }),
    updateUserInfo: (userInfo) => {
      const data = "test";
      set((state) => ({
        userInfo: { ...state.userInfo, name: data },
      }));
    },
  };
});
