import PageNotFoundView from '@/components/common/PageNotFoundView';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/pages/Home';
import TodoApp from '@/pages/TodoApp';
import { RouteObject } from 'react-router-dom';

const Routes: RouteObject[] = [];

const mainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    { path: '*', element: <PageNotFoundView /> },
    { path: '/', element: <Home /> },
    { path: '/todo', element: <TodoApp /> },
    { path: '404', element: <PageNotFoundView /> },
  ],
};
Routes.push(mainRoutes);

export default Routes;
