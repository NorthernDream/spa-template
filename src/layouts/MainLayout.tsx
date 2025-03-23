import { memo } from 'react';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <main>
      <Outlet />
    </main>
  );
};
// MainLayout.whyDidYouRender = true;
export default memo(MainLayout);
