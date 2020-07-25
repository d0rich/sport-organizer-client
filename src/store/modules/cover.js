export default {
    state: {
        side_panel_links: [
            { name: 'Home', text: 'Главная' },
            { name: 'Home', text: 'Главная' },
            { name: 'Home', text: 'Главная' }
        ]
    },
    getters: {
        SideNavs(state) {
            return state.side_panel_links
        }
    }
}