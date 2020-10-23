<template>
  <section class="content">
    <section id="project">
      <header>
        <div>
        <span class="project-name" :style="{color: project.color}">
            {{ project.name }}
          </span>

          <ProjectEdit :value="project">
            <b-button type="is-white" class="transparent-button">
              <b-icon icon="pen" size="is-small"/>
            </b-button>
          </ProjectEdit>

        </div>
        <div>
          <b-button @click="hideDoneTasks = !hideDoneTasks"
                    v-if="hideDoneTasks"
                    icon-left="checkbox-marked-circle">
            Display done tasks
          </b-button>
          <b-button @click="hideDoneTasks = !hideDoneTasks"
                    v-else
                    icon-left="checkbox-marked-circle-outline">
            Hide done tasks
          </b-button>
        </div>
      </header>
      <div id="kanban">
        <draggable
          :forceFallback="true"
          :fallbackClass="'drag'"
          ghost-class="ghost"
          class="draggable-section"
          v-model="sections"
          group="sections"
          @change="dndSection($event)">
          <section class="task-section" v-for="(section, index) of sections" :key="section.id">
            <div class="task-section-header">
              <b-input class="task-section-name hidden-input" @change.native="updateSectionName($event, section.id)"
                       v-model="section.name"></b-input>
              <div class="task-section-actions">
                <b-icon icon="plus" @click.native="addTask(section.id, index)"/>
                <b-dropdown aria-role="list" position="is-bottom-left">
                  <b-icon icon="dots-horizontal" slot="trigger"/>

                  <b-dropdown-item aria-role="listitem">
                    <b-button type="is-danger" @click="deleteSection(section)">
                      Delete
                    </b-button>
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
            <div class="task-card-content">
              <draggable
                class="task-drop-zone"
                v-model="section.tasks"
                group="tasks"
                @change="dndTask($event, section.id)"
                :forceFallback="true"
                :fallbackClass="'drag'"
                ghost-class="ghost">
                <TaskCard
                  v-for="task of section.tasks"
                  :key="task.id"
                  @deleted="deleteTask(task, section)"
                  :value="task"
                  v-show="!hideDoneTasks || !task.done"
                />
              </draggable>
            </div>
          </section>
          <section class="task-section" slot="footer">
            <div class="task-section-header" id="add-section" @click="addSection()">
              <b-input readonly class="task-section-name  hidden-input" icon="plus" value="Add new section"></b-input>
            </div>
          </section>
        </draggable>
      </div>
    </section>
  </section>

</template>

<script lang="ts">
import TaskCard from "~/components/tasks/card/TaskCard.vue";
import draggable from 'vuedraggable';
import ProjectEdit from "~/components/projects/edit/ProjectEdit.vue";

export default {
  name: 'ProjectDetailPage',
  data: () => {
    return {
      sections: [],
      hideDoneTasks: true
    }
  },
  components: {
    ProjectEdit,
    TaskCard,
    draggable
  },
  computed: {
    project() {
      const project = this.$store.state.projects.projects.find(project => project.id == this.$route.params.id);
      return project && project !== -1 ? project : {name: ''};
    }
  },
  methods: {
    async dndTask(event, sectionId) {
      let section = this.sections.find(t => t.id === sectionId);
      if (event.added) {
        try {
          await this.$providers.tasks.put(event.added.element.id, {tasksection: sectionId});
        } catch (err) {
        }
      } else if (event.moved) {
        console.log(event);
        console.log(section);
      }
    },
    async dndSection(event) {
      if (event.moved) {
        try {
          let data = this.sections.map(t => t.id);
          await this.$axios.put(`tasksections`, data);
        } catch (err) {
        }
      }
    },
    deleteTask(task, section) {
      this.sections.find(s => s.id === section.id).tasks = this.sections
        .find(s => s.id === section.id).tasks.filter(t => t.id !== task.id);
    },
    async addTask(sectionId, sectionIndex) {
      try {
        const response = await this.$providers.tasks.post('', {tasksection: sectionId});
        this.sections[sectionIndex].tasks.push(response.data);
      } catch (err) {
      }
    },
    async addSection() {
      try {
        const response = await this.$providers.sections.post('', {project: this.$route.params.id})
        this.sections.push(response.data);
        this.$buefy.toast.open({
          message: `Section added !`,
          type: 'is-success'
        });
      } catch (err) {
      }
    },
    async updateSectionName(event, idSection) {
      const name = this.sections.find(section => section.id === idSection).name;
      await this.$providers.sections.put(idSection, {name});
      this.$buefy.toast.open({
        message: `Section is now named "${name}".`,
        type: 'is-success'
      });
      try {
      } catch (err) {
      }
    },
    async deleteSection(section) {
      if (window.confirm(`Delete "${section.name ?? ''}" ?`)) {
        try {
          this.$providers.sections.delete(section.id);
          this.sections = this.sections.filter(s => s.id !== section.id);
          this.$buefy.toast.open({
            message: `Section "${section.name ?? ''}" deleted.`,
            type: 'is-success'
          });
        } catch (err) {
        }
      }
    },
  },
  async mounted() {
    try {
      const response = await this.$providers.sections.get(`?_where[project]=${this.$route.params.id}`);
      this.sections = response.data;
    } catch (err) {
    }
  }
}
</script>

<style lang="scss">
@import "assets/styles/main";

#add-section {
  color: #6f7782;

  &:hover {
    * {
      color: $primary;
    }
  }

  input {
    box-shadow: none;
    border: none;
    background: transparent;
    cursor: pointer;
  }

  * {
    color: #d2d3d6;
  }
}

.project-name {
  color: $primary;
  font-size: 50px;

}

#project {
  height: 100%;
  overflow-y: hidden;
  header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    > * {
      display: flex;
      align-items: center;
    }
  }

  #kanban {
    display: flex;
    height: 100%;
    overflow-y: hidden;

    .draggable-section {
      display: flex;
      .task-drop-zone{
        height: 100%;
      }
    }

    .task-section {
      border-radius: 10px;
      width: 280px;
      margin-right: 8px;
      padding: 15px;
      cursor: grab;
      .task-card-content {
        height: 100%;
        border-radius: 10px;
      }
      .task-section-header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;

        .task-section-actions {
          display: flex;

          .icon {
            cursor: pointer;
            position: relative;
            top: 50%;
            transform: translateY(-50%);
            &:hover {
              color: $primary;
            }
          }
        }
      }
    }
  }
}


</style>
