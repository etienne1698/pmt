import ApplicationProvider from "~/providers/ApplicationProvider.ts";
import TaskSection from "~/models/TaskSection";

export default class SectionsProvider extends ApplicationProvider {

  path = 'tasksections/';

  getObject(data) {
    return new TaskSection(data);
  }
}
