<template>
  <div class="pl-2 pr-2 pt-4">
    <div class="task-header is-flex mb-4">
      <div style="width: 5%">
        <b-checkbox @change.native="toggleDone" v-model="task.done" class="level-item"/>
      </div>
      <b-input style="width: 77%" v-model="task.name" @change.native="rename" class="level-item"/>
      <b-button style="width: 15%;" type="is-danger" @click="deleteTask" class="level-item">Delete</b-button>
    </div>


    <div>
      <b-field label="Dates">
        <DueDatePicker style="width: 50%" @change="startDateChange" :value="task.startDate" :input="true"/>
        <div style="width: 1%"></div>
        <DueDatePicker style="width: 49%" @change="dueDateChange" :value="task.dueDate" :input="true"/>
      </b-field>
      <b-field label="User">
        <UserPickerField @change="userChange" :value="task.user"/>
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">

import TasksMixin from "~/mixins/TasksMixin";
import UserPickerField from "~/components/tasks/UserPickerField.vue";
import DueDatePicker from "~/components/tasks/DueDatePicker.vue";

export default {
  name: 'TaskDetail',
  components: {UserPickerField, DueDatePicker},
  props: ['value'],
  mixins: [TasksMixin],
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
.task-header {
  justify-content: space-between;
  align-items: center;
}
</style>
