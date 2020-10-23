<template>
  <b-dropdown position="is-bottom-right" class="user-dropdown" aria-role="list">

    <b-input icon="account" :value="getUserSelected ? getUserSelected.getUsername() : ''" slot="trigger" readonly />

    <b-dropdown-item class="pl-2 pt-2 pb-2 pr-2" v-for="user of users" :key="user.id" @click="change(user)">
      {{ user.getUsername() }}
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import UserPickerMixin from "~/mixins/UserPickerMixin";

export default {
  name: "UserPickerField",
  mixins: [UserPickerMixin],
  watch: {
    value(value) {
      this.userSelected = value;
    }
  },
}
</script>

<style lang="scss">
.user-dropdown.dropdown {
    width: 100%;
    .dropdown-trigger{
      width: 100%;
    }
  }

</style>
