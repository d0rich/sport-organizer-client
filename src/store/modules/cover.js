export default {
  state: {
    side_panel_links: [
      { name: 'Home', text: 'Главная', icon: 'mdi-home' },
      { name: 'Home', text: 'Главная', icon: 'mdi-home' },
      { name: 'Home', text: 'Регистрация', icon: 'mdi-account-plus' }
    ]
  },
  getters: {
    SideNavs(state) {
      return state.side_panel_links
    }
  }
}