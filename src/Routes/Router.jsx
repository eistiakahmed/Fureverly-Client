import { createBrowserRouter } from 'react-router';
import MainLayouts from '../Layouts/MainLayouts';
import DashboardLayout from '../Layouts/DashboardLayout';
import Home from '../Pages/Home/Home';
import Login from '../Pages/Auth/Login';
import PetsAndSupplies from '../Pages/PetsAndSupplies/PetsAndSupplies';
import Register from '../Pages/Auth/Register';
import PrivateRoutes from '../Private/PrivateRoutes';
import AdminRoutes from '../Private/AdminRoutes';
import PetProductDetails from '../Pages/PetProductDetails/PetProductDetails';
import CategoryFilteredProduct from '../Pages/CategoryFilteredProduct/CategoryFilteredProduct';
import AddListingPage from '../Pages/AddListingPage/AddListingPage';
import MyListing from '../Pages/MyListing/MyListing';
import UpdateListing from '../Pages/UpdateListing/UpdateListing';
import MyOrders from '../Pages/MyOrders/MyOrders';
import ErrorPage from '../Pages/Error/ErrorPage';
import MyProfile from '../Pages/MyProfile/MyProfile';
import ProfileSettings from '../Pages/ProfileSettings/ProfileSettings';
import About from '../Pages/About/About';
import Contact from '../Pages/Contact/Contact';
import Unauthorized from '../Pages/Unauthorized/Unauthorized';
import DashboardHome from '../Pages/Dashboard/DashboardHome';
import AdminOverview from '../Pages/Dashboard/Admin/AdminOverview';
import ManageUsers from '../Pages/Dashboard/Admin/ManageUsers';
import ManageProducts from '../Pages/Dashboard/Admin/ManageProducts';

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
        path: '/about',
        element: <About />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/petsAndSupplies',
        loader: () => fetch('https://fureverly-server.vercel.app/product'),
        element: <PetsAndSupplies />,
      },
      {
        path: '/product/:id',
        loader: ({ params }) =>
          fetch(`https://fureverly-server.vercel.app/product/${params.id}`),
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
        path: '/myListings',
        element: (
          <PrivateRoutes>
            <MyListing />
          </PrivateRoutes>
        ),
      },
      {
        path: '/updateListing/:id',
        loader: ({ params }) =>
          fetch(`https://fureverly-server.vercel.app/product/${params.id}`),
        element: (
          <PrivateRoutes>
            <UpdateListing />
          </PrivateRoutes>
        ),
      },
      {
        path: '/myOrders',
        element: (
          <PrivateRoutes>
            <MyOrders />
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
      {
        path: '/myProfile',
        element: <MyProfile />
      },
      {
        path: '/profile-settings',
        element: (
          <PrivateRoutes>
            <ProfileSettings />
          </PrivateRoutes>
        )
      },
      {
        path: '/unauthorized',
        element: <Unauthorized />
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoutes>
        <DashboardLayout />
      </PrivateRoutes>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: 'profile',
        element: <MyProfile />,
      },
      {
        path: 'profile-settings',
        element: <ProfileSettings />,
      },
      {
        path: 'my-listings',
        element: <MyListing />,
      },
      {
        path: 'my-orders',
        element: <MyOrders />,
      },
      {
        path: 'add-listing',
        element: <AddListingPage />,
      },
      {
        path: 'admin',
        element: (
          <AdminRoutes>
            <AdminOverview />
          </AdminRoutes>
        ),
      },
      {
        path: 'admin/users',
        element: (
          <AdminRoutes>
            <ManageUsers />
          </AdminRoutes>
        ),
      },
      {
        path: 'admin/products',
        element: (
          <AdminRoutes>
            <ManageProducts />
          </AdminRoutes>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
