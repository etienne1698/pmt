import User from "~/models/User";

export const state = () => ({
  user: {} as User,
  jwt: ''
})

export const mutations = {
  auth(state: any, {user, jwt}) {
    state.user = user;
    state.jwt = jwt;
  }
}
