<template>
  <b-dropdown position="is-bottom-right" append-to-body>

    <div v-if="!dateSelected" slot="trigger" class="picker">
      <b-icon icon="calendar" size="is-small"/>
    </div>

    <span v-else slot="trigger" class="picker">
      {{ dateSelected | formatDate }}
    </span>

    <b-dropdown-item class="pl-2 pt-2 pb-2 pr-2" custom>
      <b-datepicker
        :show-week-number="true"
        :locale="undefined"
        inline
        :value="dateSelected"
        @input="change">
      </b-datepicker>
    </b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">


export default {
  name: "UserPicker",
  props: ['value'],
  data: () => {
    return {
      dateSelected: null,
    };
  },

  methods: {
    change(date) {
      this.$emit('change', date);
    }
  },
  watch: {
    value(value) {
      this.dateSelected = value;
    }
  },
  async mounted() {
    this.dateSelected = this.value;
  },


}
</script>

<style lang="scss">
div.picker {
  border-radius: 50%;
  text-align: center;
  background: white;
  height: 1.7rem;
  width: 1.7rem;
  align-items: center;
  padding: 0;
  border: #dbdbdb dashed 1px;

  &:focus, &:hover {
    border-radius: 50%;
    background: #dbdbdb;
    color: gray;
    border: gray solid 1px;
  }
}

.picker {

  color: #dbdbdb;

  &:hover {
    color: gray;
    cursor: pointer;
  }
}
</style>
