import User from "~/models/User";

export const state = () => ({
  users: [] as Array<User>
})

export const mutations = {
  setUsers(state: any, users) {
    state.users = users;
  }
}
