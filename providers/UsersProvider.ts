import ApplicationProvider from "~/providers/ApplicationProvider.ts";
import User from "~/models/User";

export default class UsersProvider extends ApplicationProvider {
  path = 'users/';

  getObject(data) {
    return new User(data);
  }
}
