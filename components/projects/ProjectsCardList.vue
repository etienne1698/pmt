<template>
  <div>
    <b-collapse :open="false" aria-id="contentIdForA11y1" v-model="displayProjects">
      <span
        style="text-align: center"
        slot="trigger"
        aria-controls="contentIdForA11y1">
        <div>
          <b-icon size="is-small" :icon="displayProjects ? 'chevron-down' : 'chevron-right'" />
          Recent projects
        </div>
        <div class="divider"></div>
      </span>
      <div style="display: flex; justify-content: center;">
        <ProjectCardLink v-for="project in projects"
                         :key="project.id"
                         @click="goToProject(project)"
                         :name="project.name"
                         icon="view-dashboard-outline"
                         :color="project.color"
        />
        <ProjectEdit>
          <div class="project-card-link">
            <div class="project-card-link-card card-new-project">
              <b-icon icon="plus" size="is-medium"/>
            </div>
            <span class="project-card-link-name">New project</span>

          </div>
        </ProjectEdit>

      </div>
    </b-collapse>

  </div>
</template>

<script lang="ts">
import ProjectCardLink from "~/components/projects/ProjectCardLink.vue";
import ProjectEdit from "~/components/projects/edit/ProjectEdit.vue";

export default {
  name: 'ProjectsCardList',
  components: {
    ProjectCardLink,
    ProjectEdit
  },
  computed: {
    projects() {
      return this.$store.state.projects.projects;
    }
  },
  data: () => {
    return {
      displayProjects: true,
    }
  },
  async mounted() {
    try {
      const response = await this.$providers.projects.get();
      this.$store.commit('projects/setProjects', response.data);
    } catch (err) {

    }
  },
  methods: {
    async goToProject(project) {
      await this.$router.push(`/projects/${project.id}`);
    },
  }
}
</script>

<style lang="scss">
</style>
