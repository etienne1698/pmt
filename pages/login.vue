<template>
  <div class="container">
    <div class="login-card card">
      <div class="card-content">
        <b-field label="Username">
          <b-input v-model="identifier"></b-input>
        </b-field>

        <b-field label="Password">
          <b-input type="password" v-model="password" password-reveal>
          </b-input>
        </b-field>

        <b-button @click="login" type="is-primary">Login</b-button>
      </div>
    </div>

  </div>
</template>

<script lang="ts">

export default {
  name: 'Login',
  data() {
    return {
      identifier: 'etienne1698',
      password: 'test1234',
    }
  },

  methods: {
    async login() {
      try {
        const response = await this.$providers.auth.login(this.identifier, this.password);
        this.$store.commit('auth/auth', response.data);
        await this.$router.push('/');
      } catch (err) {

      }
    },
  },

}
</script>

<style lang="scss">
.login-card {
  width: 50%;
  margin: 70px auto 0;
}
</style>
