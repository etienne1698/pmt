import {IDeserializable} from "~/models/interfaces/IDeserializable";

export default class ObjectModel implements IDeserializable{
  constructor(input: {}) {
    return this.deserialize(input);
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
