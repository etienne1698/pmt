import ObjectModel from "~/models/ObjectModel";
import TaskSection from "~/models/TaskSection";
import {IDeserializable} from "~/models/interfaces/IDeserializable";

export default class Project extends ObjectModel implements IDeserializable {
  id?: number;
  name?: string;
  tasksections?: Array<TaskSection>;
  color?: string;


  deserialize(input: any): this {
    Object.assign(this, input);
    if (Array.isArray(this.tasksections)) {
      this.tasksections = this.tasksections.map(t => new TaskSection(t));
    }
    return this;
  }
};
