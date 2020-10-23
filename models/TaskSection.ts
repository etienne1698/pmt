import ObjectModel from "~/models/ObjectModel";
import Task from "~/models/Task";
import {IDeserializable} from "~/models/interfaces/IDeserializable";

export default class TaskSection extends ObjectModel implements IDeserializable {
  id?: number;
  name?: string;
  tasks?: Array<Task>;


  deserialize(input: any): this {
    Object.assign(this, input);
    if (Array.isArray(this.tasks)) {
      this.tasks = this.tasks.map(t => new Task(t));
    }
    return this;
  }

};
