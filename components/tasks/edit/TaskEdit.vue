<template>
  <div class="pl-2 pr-2 pt-4">
    <div class="level mb-4">

      <div class="level-left">
        <b-checkbox @change.native="toggleDone" v-model="task.done" class="level-item"/>
        <b-input v-model="task.name" @change.native="rename" class="level-item"/>
      </div>
      <div class="level-right">
        <b-button type="is-danger" @click="deleteTask" class="level-item">Delete</b-button>
      </div>
    </div>


    <div>
      <b-field label="Due date">
        <b-datepicker
          :show-week-number="true"
          :locale="undefined"
          icon="calendar-today"
          trap-focus
          :value="task.dueDate"
          @input="dueDateChange">
        </b-datepicker>
      </b-field>
      <b-field label="User">
        <UserPickerField @change="userChange" :value="task.user" />
      </b-field>
    </div>
  </div>
</template>

<script lang="ts">

import TasksMixin from "~/mixins/TasksMixin";
import UserPickerField from "~/components/tasks/edit/UserPickerField.vue";

export default {
  name: 'TaskDetail',
  components: {UserPickerField},
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

</style>
