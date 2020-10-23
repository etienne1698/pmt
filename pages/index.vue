<template>
  <section class="content">
    <ProjectsCardList />
  </section>
</template>

<script lang="ts">


import ProjectsCardList from "~/components/projects/ProjectsCardList.vue";
export default {
  name: 'HomePage',
  async mounted() {
    if (!this.$store.state.auth.jwt) {
      await this.$router.push('/login');
    }
  },

  data: () => {
    return {

    }
  },
  components: {
    ProjectsCardList
  },
  computed: {

  },
}
</script>
