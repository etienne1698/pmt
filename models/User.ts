import ObjectModel from "~/models/ObjectModel";
import {IDeserializable} from "~/models/interfaces/IDeserializable";
import Task from "~/models/Task";

export default class User extends ObjectModel implements IDeserializable {
  id?: number;
  name?: string;
  username?: string;
  email?: string;
  password?: string;

  tasks: Array<Task>;


  deserialize(input: any): this {
    Object.assign(this, input);
    if (this.tasks && Array.isArray(this.tasks)) {
      this.tasks = this.tasks.map(t => new Task(t));
    }
    return this;
  }

  getUsername() {
    return `@${this.username}`;
  }

};
