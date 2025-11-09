import { createBrowserRouter } from 'react-router';
import MainLayouts from '../Layouts/MainLayouts';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Auth/Login';
import PetsAndSupplies from '../Pages/PetsAndSupplies/PetsAndSupplies';
import Register from '../Pages/Auth/Register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayouts />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/petsAndSupplies',
        element: <PetsAndSupplies />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />
      },
    ],
  },
]);
