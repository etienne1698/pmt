<template>
  <section class="content">
    <vc-calendar
      is-expanded
      :attributes="attributes">
      <template v-slot:day-content="{ day, attributes }">
        <div class="day-box">
          <span>{{ day.day }}</span>
          <div v-for="attr in attributes" :style="{background: attr.customData.color}" class="box mb-1">
            {{ attr.customData.title }}
          </div>
        </div>
      </template>
    </vc-calendar>
  </section>
</template>

<script lang="ts">
export default {
  name: "calendar",
  async mounted() {
    try {
      console.log(await this.$providers.tasks.get());
    } catch (err) {}
  },
  data: () => {
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
    return {
      attributes: [
        {
          key: 1,
          customData: {
            title: 'Test',
            color: 'red'
          },
          dates: new Date(year, month, 1),
        },
        {
          key: 2,
          customData: {
            title: 'Test 2',
            color: 'blue'
          },
          dates: new Date(year, month, 6),
        },
        {
          key: 3,
          customData: {
            title: 'Test 3',
            color: 'orange'
          },
          dates: new Date(year, month, 6),
        },
      ],
    };
  }
}
</script>

<style lang="scss">
.vc-grid-container {
  padding: 0!important;
}
.day-box {
  min-height: 5rem;
  height: 100%;
  border: #d2d3d6 1px solid;
  padding:  .1rem .5rem;
}
</style>
