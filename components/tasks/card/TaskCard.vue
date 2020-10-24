<template>
  <div>
    <div class="box task-card pt-2 pl-2 pr-2 pb-2" @click="dialogOpen = true">
        <div class="level mb-1 task-card-header">
          <div class="level-start">
            <b-checkbox class="level-item" @change.native="toggleDone" @click.native.stop v-model="task.done">
              <span> {{ task.name }} </span>
            </b-checkbox>
          </div>
        </div>

      <div @click.stop class="task-card-action mb-2" v-if="displayAction">
        <div class="mb-1">
          <UserPicker @change="userChange" :value="task.user"/>
        </div>
        <div>
          <DueDatePicker @change="dueDateChange" :value="task.dueDate"/>
        </div>
      </div>
    </div>
    <b-sidebar
      class="sidebar-task"
      v-model="dialogOpen"
      :right="true"
      :fullheight="true">
      <TaskEdit @deleted="$emit('deleted');" :value="task"/>
    </b-sidebar>
  </div>
</template>

<script lang="ts">
import TaskEdit from "~/components/tasks/edit/TaskEdit.vue";
import UserPicker from "~/components/tasks/UserPicker.vue";
import DueDatePicker from '~/components/tasks/DueDatePicker.vue';
import TasksMixin from "~/mixins/TasksMixin";

export default {
  name: 'TaskCard',
  props: ['value', 'displayAction'],
  components: {DueDatePicker, UserPicker, TaskEdit},
  mixins:[TasksMixin],
  data: () => {
    return {
      dialogOpen: false,
    };
  },
  mounted() {
    if (this.value) {
      this.task = this.value;
    }
  },
  watch: {
    value(value) {
      this.task = value;
    }
  },
}
</script>

<style lang="scss">
.task-card {
  cursor: grab;
  width: 100%;
  padding: 5px;
  margin-bottom: 5px;
  .task-card-header {
    .icon {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .task-card-action {
    max-width: 30%;
  }
}
</style>
