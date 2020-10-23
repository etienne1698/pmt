<template>
  <span>
    <div @click="isModalActive = true">
      <slot></slot>
    </div>
    <b-modal
      v-model="isModalActive"
      has-modal-card
      trap-focus
      :destroy-on-hide="true"
      aria-role="dialog"
      aria-modal>
      <div class="card is-rounded">
        <div class="card-content">
          <b-field label="Name">
            <b-input v-model="project.name"></b-input>
          </b-field>
          <ColorPicker @changeColor="(color) => {project.color = color}" :value="project.color"/>
          <b-button type="is-primary" @click="updateProject" v-if="isUpdateMode">
            Save
          </b-button>
          <b-button type="is-primary" @click="createProject" v-else>
            Create
          </b-button>
        </div>
      </div>
    </b-modal>
  </span>
</template>

<script lang="ts">
import ColorPicker from "~/components/projects/edit/ColorPicker.vue";
import Project from "~/models/Project";
import ProjectMixin from "~/mixins/ProjectMixin";

export default {
  name: 'ProjectEdit',
  components: {
    ColorPicker
  },
  props: ['value'],
  data() {
    return {
      isModalActive: false,
      project: new Project({
        name: '',
        color: ''
      })
    }
  },
  mounted() {
    if (this.value && this.value.id) {
      // clone object to not mutate vuex, to review...
      this.project = new Project(Object.assign({},this.value));
    }
  },
  watch: {
    value(value) {
      if (this.value && this.value.id) {
        // clone object to not mutate vuex, to review...
        this.project = new Project(Object.assign({},this.value));
      }
    }
  },
  computed: {
    isUpdateMode() {
      return this.project.id;
    }
  },
  mixins: [ProjectMixin],
  methods: {
    async updateProject() {
      try {
        this.isModalActive = false;
        await this.$providers.projects.put(this.project.id, this.project);
        this.$buefy.toast.open({
          message: `Project "${this.project.name}" updated successfully`,
          type: 'is-success'
        });
        this.$store.commit('projects/setProjects', this.$store.state.projects.projects.map(p => p.id === this.project.id ? this.project : p));
        // clone object to not mutate vuex, to review...
        this.project = new Project(Object.assign({},this.project));
      } catch (err) {
        this.$buefy.toast.open({
          message: `Error while update the project "${this.project.name}"`,
          type: 'is-danger'
        })
      }
    },
    async createProject() {
      try {
        this.isModalActive = false;
        const response = await this.$providers.projects.post('', this.project);
        this.project = response.data;
        this.$buefy.toast.open({
          message: `Project "${this.project.name}" created successfully`,
          type: 'is-success'
        })
        this.$store.commit('projects/addProject', this.project);
        this.project = new Project({name: '', color: ''});
      } catch (err) {
        this.$buefy.toast.open({
          message: `Error while create the project "${this.project.name}"`,
          type: 'is-danger'
        })
      }
    },
    watchValue() {

    }
  }
}
</script>

<style lang="scss">
.card-new-project {
  border: dotted 2px grey;
}
</style>
