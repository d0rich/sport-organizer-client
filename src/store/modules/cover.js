export default {
  state: {
    side_panel_links: [
      { name: 'Profile', text: 'Профиль', icon: 'mdi-account', loggedIn: true, trainer: null, badge: false, badgeKey: 'Login' },
      { name: 'News', text: 'Мои новости', icon: 'mdi-newspaper-variant', loggedIn: true, trainer: null, badge: false, badgeKey: 'Sections' },
      { name: 'Sections', text: 'Мои секции', icon: 'mdi-ballot', loggedIn: true, trainer: true, badge: true, badgeKey: 'Sections' },
      { name: 'Groups', text: 'Мои группы', icon: 'mdi-account-group', loggedIn: true, trainer: true, badge: true, badgeKey: 'TrainerIn' },
      { name: 'Groups', text: 'Мои группы', icon: 'mdi-account-group', loggedIn: true, trainer: false, badge: true, badgeKey: 'TraineeIn' },
      { name: 'Events', text: 'Мои события', icon: 'mdi-calendar', loggedIn: true, trainer: null, badge: false, badgeKey: '' },
      { name: 'Login', text: 'Войти', icon: 'mdi-login', loggedIn: false, trainer: null, badge: false },
      { name: 'Register', text: 'Регистрация', icon: 'mdi-account-plus', loggedIn: false, trainer: null, badge: false }
    ]
  },
  getters: {
    SideNavs(state, getters, rootState, rootGetters) {
      return state.side_panel_links
        .filter(nav => { return nav.loggedIn === rootGetters.auth_status })
        .filter(nav => { return nav.trainer !== !rootState.trainerMode })
    }
  }
}
