import Project from "~/models/Project";

export default {
  methods: {
    async deleteProject(project: Project) {
      if (window.confirm(`Are you sure you want to delete project "${project.name}"`)) {
        try {
          await this.$providers.projects.delete(project.id);
          this.$store.commit('projects/setProjects', this.projects.filter(p => p.id !== project.id));
          this.$buefy.toast.open({
            message: `Project "${project.name}" deleted.`,
            type: 'is-success'
          });
        } catch (err) {}
      }
    }
  }
}
