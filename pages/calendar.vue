<template>
  <section>
    <Header>
      <span slot="start">
        Calendar
      </span>
    </Header>
    <div class="content">
      <vc-calendar
        is-expanded
        :attributes="attributes">
        <template v-slot:day-content="{ day, attributes }">
          <div class="day-box">
            <span>{{ day.day }}</span>
            <TaskCard
              v-for="attr in attributes"
              :key="attr.key"
              @deleted=""
              :value="attr.customData.task"
            />

          </div>
        </template>
      </vc-calendar>
    </div>
  </section>
</template>

<script lang="ts">
import Task from "~/models/Task";
import TaskCard from "~/components/tasks/TaskCard.vue";
export default {
  name: "calendar",
  components: {TaskCard},
  async mounted() {
    try {
      const response = await this.$providers.tasks.get();
      this.tasks = response.data;
    } catch (err) {}
  },
  computed: {
    attributes() {
      console.log(this.tasks)
      return !this.tasks || !this.tasks.length ? [] : this.tasks.map(task => {
        return {
          key: task.id,
          dates: [/*task.startDate,*/ task.dueDate],
          customData: {task}
        };
      });
    }
  },
  data: () => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      tasks: [] as Array<Task>
    };
  }
}
</script>

<style lang="scss">
.vc-grid-container {
  padding: .5rem 1rem;
}
.day-box {
  min-height: 5rem;
  height: 100%;
  border: #d2d3d6 1px solid;
  padding:  .1rem .5rem;
  margin-left: -1px;
}
</style>
