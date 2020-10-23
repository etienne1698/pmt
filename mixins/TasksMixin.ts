import User from "~/models/User";
import Task from "~/models/Task";

export default {
  data: () => {
    return {
      task: {} as Task,
    };
  },
  methods: {
    async userChange(user: User) {
      this.task.user = user;
      await this.$providers.tasks.put(this.task.id, {user: this.task.user.id});
      this.$buefy.toast.open({
        message: `Task "${this.task.name??''}" affected to "${user.getUsername()}"`,
        type: 'is-success'
      });
    },
    async dueDateChange(dueDate: Date) {
      this.task.dueDate = dueDate;
      await this.$providers.tasks.put(this.task.id, {dueDate});
      this.$buefy.toast.open({
        message: `Task "${this.task.name??''}" due date is now : ${this.task.getDueDateFormat()}`,
        type: 'is-success'
      });
    },
    async startDateChange(startDate: Date) {
      this.task.startDate = startDate;
      await this.$providers.tasks.put(this.task.id, {startDate});
      this.$buefy.toast.open({
        message: `Task "${this.task.name??''}" start date is now : ${this.task.getStartDateFormat()}`,
        type: 'is-success'
      });
    },
    async rename() {
      try {
        await this.$providers.tasks.put(this.task.id, {name: this.task.name});
        this.$buefy.toast.open({
          message: `Task name is now "${this.task.name??''}"`,
          type: 'is-success'
        });
      } catch (err) {

      }
    },
    async toggleDone() {
      try {
        await this.$providers.tasks.put(this.task.id, {done: this.task.done});
        this.$buefy.toast.open({
          message: `Task "${this.task.name??''}" ${this.task.done ? 'done !' : 'undo'}`,
          type: 'is-success'
        });
      } catch (err) {}
    },
    async deleteTask() {
      try {
        if (window.confirm(`Are you sure you want to delete task "${this.task.name ?? ''}" ?`)) {
          await this.$providers.tasks.delete(this.task.id);
          this.$buefy.toast.open({
            message: `Task "${this.task.name??''}" deleted.`,
            type: 'is-success'
          });
          this.$emit('deleted');
        }
      } catch (err) {

      }
    },
  }
}
