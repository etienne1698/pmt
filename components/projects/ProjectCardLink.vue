<template>
 <div class="project-card-link">
   <div class="project-card-link-card" :style="{ background: color }" @click="$emit('click')">
     <b-icon :icon="icon" size="is-medium" />
   </div>
   <span class="project-card-link-name">{{ name }}</span>
 </div>

</template>

<script lang="ts">

export default {
  name: 'ProjectCardLink',
  props: ['name', 'icon', 'color'],

}
</script>
