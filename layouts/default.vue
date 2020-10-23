<template>
  <section class="sidebar-layout">
    <b-sidebar
      fullheight
      position="static"
      type="is-light"
      open
      v-if="isAuthenticated"
    >
      <div class="p-1">
        <router-link to="/">
          PMT
        </router-link>

      </div>
      <ul class="menu-list">
        <li
          v-for="(item, key) of items"
          :key="key"
        >
          <nuxt-link
            :to="item.to"
            exact-active-class="is-active"
          >
            <b-icon :icon="item.icon"/>
            <span class="menu-item-title">{{ item.title }}</span>
          </nuxt-link>
        </li>
      </ul>

      <div class="divider"></div>

      <ul class="menu-list">
        <li
          v-for="(project, key) of projects"
          :key="key"
        >
          <nuxt-link
            :to="{name: `projects-id`, params: {id: project.id}}"
            exact-active-class="is-active"
          >
            <b-icon icon="checkbox-blank" :style="{color: project.color}"></b-icon>
            <span class="menu-item-title">{{ project.name }}</span>

            <b-dropdown position="is-bottom-left" class="project-actions" append-to-body>
              <b-icon icon="dots-horizontal" slot="trigger"/>

              <b-dropdown-item paddingless>
                <b-button type="is-danger" @click="deleteProject(project)">
                  Delete
                </b-button>
              </b-dropdown-item>
              <b-dropdown-item paddingless custom>
                <ProjectEdit :value="project">
                  <b-button type="is-info">
                    Edit
                  </b-button>
                </ProjectEdit>
              </b-dropdown-item>
            </b-dropdown>


          </nuxt-link>
        </li>
      </ul>

    </b-sidebar>
    <nuxt/>

  </section>
</template>

<script>
import ProjectEdit from '~/components/projects/edit/ProjectEdit.vue';
import ProjectMixin from "~/mixins/ProjectMixin";

export default {
  components: {
    ProjectEdit
  },
  mixins: [ProjectMixin],
  computed: {
    isAuthenticated() {
      return this.$store.state.auth.jwt;
    },
    projects() {
      return this.$store.state.projects.projects;
    }
  },
  data() {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: {name: 'index'}
        },
        {
          title: 'Calendar',
          icon: 'calendar',
          to: {name: 'calendar'}
        },
      ]
    }
  }
}
</script>

<style lang="scss">
.sidebar-layout {
  display: flex;
  flex-direction: row;
  min-height: 100%;
  min-height: 100vh;
}

.menu-list {
  .icon {
    /*
     todo : find how to place correctly
    */
    transform: translateY(10%);
  }

  .project-actions {
    float: right;
    border-radius: 5px;

    &:hover {
      background: rgba(255, 255, 255, .12);
    }
  }
}

</style>
