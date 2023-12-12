import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import Register from '../Pages/RegisterPage';
import Login from '../Pages/LoginPage';
import Logout from '../Logout/Logout';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/register': Register,
  '/login': Login,
  '/logout': Logout,
};

export default routes;
