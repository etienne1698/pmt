import Project from "~/models/Project";

export const state = () => ({
  projects: [] as Array<Project>
})

export const mutations = {
  setProjects(state: any, projects: []) {
    state.projects = projects;
  },
  addProject(state: any, project: {}) {
    state.projects.push(project);
  },

}
