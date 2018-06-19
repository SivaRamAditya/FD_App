export const SideMenuItems = {
  pages: [
    // { title: 'Tutorial', component: 'TutorialPage', default: false, visible: false },
     { title: 'Roles', component: 'RolesPage', permission: 'roles.view', default: false, visible: false },
    { title: 'Cards', component: 'CardsPage', permission: 'cards.view', default: false, visible: false },
    { title: 'Tabs', component: 'TabsPage', permission: 'tabs.view', default: false, visible: false },
    { title: 'Content', component: 'ContentPage', permission: 'content.view', default: false, visible: false },
    { title: 'Cards', component: 'CardsPage', permission: 'cards.view', default: false, visible: false },
    { title: 'Signup', component: 'SignupPage', permission: 'signup.view', default: false, visible: false },
    { title: 'Master Detail', component: 'ListMasterPage', permission: 'listmaster.view', default: true, visible: false },
    { title: 'Menu', component: 'MenuPage', permission: 'menu.view', default: false, visible: false },
    { title: 'Settings', component: 'SettingsPage', permission: 'settings.view', default: false, visible: false },
    { title: 'Search', component: 'SearchPage', permission: 'search.view', default: false, visible: false }
  ]
};
