import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';

import Loader from 'components/Loader/Loader';
import { ROUTES } from 'constants/routes';
import HelmetWrapper from 'components/HelmetWrapper/HelmetWrapper';
import { PageTitles } from 'constants/pageTitles';

const NotFound = lazy(() => import('pages/NotFound/NotFound'));
const MainLayout = lazy(() => import('core/MainLayout/MainLayout'));

const Router = () => (
  <Suspense fallback={<Loader />}>
    <Routes>
      <Route
        path={ROUTES.notFound}
        element={
          <HelmetWrapper helmetTitle={PageTitles.NOT_FOUND}>
            <NotFound />
          </HelmetWrapper>
        }
      />
      <Route path='*' element={<MainLayout />} />
    </Routes>
  </Suspense>
);

export default Router;
