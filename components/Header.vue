<template>
  <header class="content">
    <div class="stat name">
      <b-button type="is-white"
                class="transparent-button"
                v-if="!$store.state.ui.sideBarOpen"
                @click="$store.commit('ui/changeSideBar', true)">
        <b-icon icon="menu"/>
      </b-button>
      <slot name="start"></slot>
    </div>
    <div class="end pr-1">
      <slot name="end"></slot>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  name: 'Header',
}
</script>

<style lang="scss" scoped>
header {
  margin-bottom: 0!important;
  min-height: 4.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .name {
    font-size: 30px;
    font-weight: 200;
  }
  div {
    display: flex;
    align-items: center;
  }
}
</style>
