import { createStore } from "vuex";
import type { User } from "./types/index";

interface State {
  users: User[];
}

const state: State = {
  users: [
    {
      id: 1,
      name: "Someone Famous",
      phone: "0123456789",
      address: "urgench",
      tip: "Порыв",
      prioritet: "Высокий",
      lng: 39.70732721786235,
      lat: 47.23260132167479,
    },
    {
      id: 2,
      name: "APP",
      phone: "0123456789",
      address: "moscow",
      tip: "Закупорка",
      prioritet: "Незамедлительно",
      lng: 39.78732721786235,
      lat: 47.23260132167479,
    },
    {
      id: 3,
      name: "Toledo",
      phone: "0123456789",
      address: "rostov",
      tip: "Утечка",
      prioritet: "Низкий",
      lng: 39.72732721786235,
      lat: 47.27260132167479,
    },
  ],
};

export default createStore<State>({
  state,
  mutations: {
    addUser(state: State, user: User) {
      user.id = state.users.length + 1;
      state.users.push(user);
    },
    editUser(state: State, user: User) {
      state.users = state.users.map((u) => (u.id === user.id ? user : u));
    },
    deleteUser(state: State, id: number) {
      let updatedUsers: User[] = state.users.filter(
        (user: User) => user.id !== id
      );
      state.users = updatedUsers;
    },
  },
  actions: {},
  modules: {},
});
