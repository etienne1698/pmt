export default abstract class ApplicationProvider {
  private axios;
  protected path: string = '';

  constructor(axios) {
    this.axios = axios;
  }

  private getPath(path: string) {
    return this.path + path;
  }

  private getData(data) {
    return Array.isArray(data) ? data.map(d => this.getObject(d)) : this.getObject(data);
  }

  private getResponse(response) {
    return {...response, data: this.getData(response.data)};
  }

  abstract getObject(data);

  async get(path = '') {
    const response = await this.axios.get(this.getPath(path));
    return this.getResponse(response);
  }

  async post(path = '', body: {}|[]) {
    const response = await this.axios.post(this.getPath(path), body);
    return this.getResponse(response);
  }

  async put(path = '', body: {}|[]) {
    const response = await this.axios.put(this.getPath(path), body);
    return this.getResponse(response);
  }

  async delete(path = '') {
    const response = await this.axios.delete(this.getPath(path));
    return this.getResponse(response);
  }
}
