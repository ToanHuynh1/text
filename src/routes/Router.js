// Layouts

// Pages
import { ConfigRouter } from '~/config';
import Home from '~/pages/Home';
import Login from '~/pages/Login';
import Chat from '~/pages/Chat';
import Signup from '~/pages/Signup';
import Resetpass from '~/pages/Resetpass';
// Public routes
const publicRoutes = [
    { path: ConfigRouter.Home, component: Home },
    { path: ConfigRouter.Login, component: Login, layout: null },
    { path: ConfigRouter.Chat, component: Chat, layout: null },
    { path: ConfigRouter.Signup, component: Signup, layout: null },
    { path: ConfigRouter.Resetpass, component: Resetpass, layout: null },
];
const privateRoutes = [];

export { publicRoutes, privateRoutes };
