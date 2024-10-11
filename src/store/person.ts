import { create } from "../zustand/react";
// import { create } from "zustand-v4";
// import { create } from "zustand";

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
        return {
          lastName: lastName || state.lastName,
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
