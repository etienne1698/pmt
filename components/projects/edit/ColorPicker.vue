<template>
  <div class="color-picker">
    <div class="colors" v-for="section of colors">
      <div v-for="color of section" @click="changeColor(color)">
        <b-icon
          :icon="getColor === color ? 'checkbox-marked' : 'checkbox-blank'"
          class="color"
          :style="{color: color}"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'ColorPicker',
  props: ['value'],
  data: () => {
    return {
      colorSelected: '',
      colors: [
        ['#f6f8f9', '#e8384f', '#fd612c', '#fd9a00', '#eec300', '#a4cf30', '#62d26f', '#37c5ab'],
        ['#20aaea', '#4186e0', '#7a6ff0', '#aa62e3', '#e362e3', '#ea4e9d', '#fc91ad', '#8da3a6']
      ]
    }
  },
  computed: {
    getColor() {
      return this.colorSelected.length ? this.colorSelected : (this.value && this.value.length ? this.value : '#f6f8f9')
    }
  },
  methods: {
    changeColor(color) {
      this.colorSelected = color;
      this.$emit('changeColor', this.colorSelected);
    }
  }
}
</script>

<style lang="scss">
.color-picker {
  font-size: initial;
  font-weight: initial;
  margin-bottom: 8px;
  .colors {
    display: flex;
    justify-content: space-between;
    margin-bottom: 3px;

    .color {
      cursor: pointer;
    }
  }
}
</style>
