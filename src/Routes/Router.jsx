import { createBrowserRouter } from 'react-router';
import MainLayouts from '../Layouts/MainLayouts';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Auth/Login';
import PetsAndSupplies from '../Pages/PetsAndSupplies/PetsAndSupplies';
import Register from '../Pages/Auth/Register';
import PrivateRoutes from '../Private/PrivateRoutes';
import PetProductDetails from '../Pages/PetProductDetails/PetProductDetails';
import CategoryFilteredProduct from '../Pages/CategoryFilteredProduct/CategoryFilteredProduct';
import AddListingPage from '../Pages/AddListingPage/AddListingPage';

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
        loader: () => fetch('http://localhost:3000/product'),
        element: <PetsAndSupplies />,
      },
      {
        path: '/product/:id',
        loader: ({ params }) =>
          fetch(`http://localhost:3000/product/${params.id}`),
        element: (
          <PrivateRoutes>
            <PetProductDetails />
          </PrivateRoutes>
        ),
      },
      {
        path: '/category-filtered-product/:categoryName',
        element: <CategoryFilteredProduct />,
      },
      {
        path: '/addListing',
        element: (
          <PrivateRoutes>
            <AddListingPage />
          </PrivateRoutes>
        ),
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
]);
