import Vue from 'vue';
import ProjectsProvider from "~/providers/ProjectsProvider.ts";
import AuthProvider from "~/providers/AuthProvider";
import TasksProvider from "~/providers/TasksProvider";
import SectionsProvider from "~/providers/SectionsProvider";
import UsersProvider from "~/providers/UsersProvider";

export default ({$axios}) => {
  Vue.prototype.$providers = {
    projects: new ProjectsProvider($axios),
    tasks: new TasksProvider($axios),
    sections: new SectionsProvider($axios),
    auth: new AuthProvider($axios),
    users: new UsersProvider($axios),
  };

};
