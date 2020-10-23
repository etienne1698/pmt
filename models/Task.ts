import ObjectModel from "~/models/ObjectModel";
import {IDeserializable} from "~/models/interfaces/IDeserializable";
import User from "~/models/User";
import {formatDate} from "~/plugins/moment";

export default class Task extends ObjectModel implements IDeserializable {
  id?: number;
  name?: string;
  done?: boolean;
  description?: string;
  user?: number | User;
  dueDate?: string | Date;
  startDate?: string | Date;

  getDueDateFormat() {
    return formatDate(this.dueDate);
  }
  getStartDateFormat() {
    return formatDate(this.startDate);
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    if (this.user && Number.isNaN(this.user)) {
      this.user = new User(this.user);
    }
    this.dueDate = this.dueDate ? new Date(this.dueDate) : null;
    this.startDate = this.startDate ? new Date(this.startDate) : null;
    return this;
  }

};
