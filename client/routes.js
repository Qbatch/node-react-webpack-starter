import AppRoot from './Approot';

import Layout from "./components/Layout"
import Profile from "./components/Profile"
import NotFound from "./components/NotFound"

const routes = [
  {
    component: AppRoot,
    routes: [
      { path: '/',
        exact: true,
        component: Layout
      },
      { path: '/home',
        exact: true,
        component: Layout
      },
      { path: '/profile/:id',
        exact: true,
        component: Profile
      },
      { path: '*',
        component: NotFound
      }
    ]
  }
];

export default routes;
