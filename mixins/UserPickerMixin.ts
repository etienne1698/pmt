import User from "~/models/User";

export default {
  props: ['value'],
  async mounted() {
    this.userSelected = this.value;

    if(this.$store.state.users.users && this.$store.state.users.users.length) {
      this.users = this.$store.state.users.users;
    } else {
      const response = await this.$providers.users.get();
      this.users = response.data;
      this.$store.commit('users/setUsers', this.users);
    }

  },
  data: () => {
    return {
      userSelected: {} as User|number,
      users: [] as Array<User>,
    };
  },
  computed: {
    getUserSelected() {
      if (this.userSelected) {
        let user = this.users.find(user => user.id === this.userSelected || user.id === this.userSelected.id);
        if (user == -1) {
          return null;
        }
        return user;
      }
      return null;
    },
  },
  methods: {
    change(user) {
      this.$emit('change', user);
      this.userSelected = user;
    }
  },
}
