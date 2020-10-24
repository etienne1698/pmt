<template>
  <section>
    <Header>
      <span slot="start">
        Home
      </span>
    </Header>
    <div class="content">
      <ProjectsCardList />
    </div>
  </section>
</template>

<script lang="ts">


import ProjectsCardList from "~/components/projects/ProjectsCardList.vue";
import Header from "~/components/Header.vue";
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
    Header,
    ProjectsCardList
  },
  computed: {

  },
}
</script>
