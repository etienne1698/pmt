export default function ({$axios, redirect, store}) {
  $axios.onRequest(config => {
    const jwt = store.state.auth.jwt;
    if (jwt) {
      config.headers.Authorization = `Bearer ${jwt}`;
    }
  });

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 403 || code === 401) {
      store.commit('auth/auth', {user: {}, jwt: ''});
      redirect('/login');
    }
  });
}
