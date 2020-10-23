<template>
  <vc-date-picker mode="dateTime" :popover="{ visibility: 'click' }" v-model="dateSelected" @input="change">
    <template v-slot="{ inputValue, inputEvents }" >
      <div :value="inputValue" v-on="inputEvents">
        <div class="picker" v-if="!dateSelected && !input">
          <b-icon icon="calendar" size="is-small"/>
        </div>

        <span v-if="dateSelected && !input" :value="inputValue" v-on="inputEvents" class="picker">
          {{ dateSelected | formatDate }}
        </span>

        <b-input v-if="input" icon="calendar" readonly :value="dateSelected | formatDate" />
      </div>
    </template>
  </vc-date-picker>
</template>

<script lang="ts">


export default {
  name: "DueDatePicker",
  props: ['value', 'input'],
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
