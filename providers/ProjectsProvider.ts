import ApplicationProvider from "~/providers/ApplicationProvider.ts";
import Project from "~/models/Project.ts";

export default class ProjectsProvider extends ApplicationProvider {

  path = 'projects/';

  getObject(data) {
    return new Project(data);
  }
}
