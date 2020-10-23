import ApplicationProvider from "~/providers/ApplicationProvider.ts";
import User from "~/models/User.ts";

export default class AuthProvider extends ApplicationProvider {
  path = 'auth/';

  getObject(data) {
    return {...data, user: new User(data.user)};
  }

  login(identifier: string, password: string) {
    return this.post('local', {identifier, password});
  }
}
