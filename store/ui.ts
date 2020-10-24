import User from "~/models/User";

export const state = () => ({
  sideBarOpen: true,
})

export const mutations = {
  changeSideBar(state, val: boolean) {
    state.sideBarOpen = val;
  }
}
