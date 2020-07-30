export default {
  state: {
    side_panel_links: [
      { name: 'Profile', text: 'Профиль', icon: 'mdi-account', loggedIn: true },
      { name: 'Login', text: 'Войти', icon: 'mdi-login', loggedIn: false },
      { name: 'Register', text: 'Регистрация', icon: 'mdi-account-plus', loggedIn: false }
    ]
  },
  getters: {
    SideNavs(state, getters, rootState, rootGetters) {
      return state.side_panel_links
        .filter(nav => { return nav.loggedIn == rootGetters.auth_status })
    }
  }
}