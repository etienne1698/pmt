<template>
  <b-dropdown position="is-bottom-right" append-to-body>

    <div v-if="!getUserSelected" slot="trigger" class="user-picker">
      <b-icon  icon="account" size="is-small"/>
    </div>

    <span v-else slot="trigger" class="user-picker">
      {{getUserSelected.getUsername()}}
    </span>

    <b-dropdown-item class="pl-2 pt-2 pb-2 pr-2" v-for="user of users" :key="user.id" @click="change(user)">
      {{ user.getUsername() }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import UserPickerMixin from "~/mixins/UserPickerMixin";

export default {
  name: "UserPicker",
  mixins: [UserPickerMixin],
  watch: {
    value(value) {
      this.userSelected = value;
    }
  },
}
</script>

<style lang="scss">
div.user-picker{
  border-radius: 50%;
  text-align: center;
  background: white;
  height: 1.7rem;
  width: 1.7rem;
  align-items: center;
  padding: 0;
  border: #dbdbdb dashed 1px;
  &:focus, &:hover{
    border-radius: 50%;
    background: #dbdbdb;
    color: gray;
    border: gray solid 1px;
  }
}
.user-picker {

  color: #dbdbdb;
  &:hover {
    color: gray;
    cursor: pointer;
  }
}
</style>
