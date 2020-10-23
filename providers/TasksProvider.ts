import ApplicationProvider from "~/providers/ApplicationProvider.ts";
import Task from "~/models/Task";

export default class TasksProvider extends ApplicationProvider {
  path = 'tasks/';

  getObject(data) {
    return new Task(data);
  }
}
