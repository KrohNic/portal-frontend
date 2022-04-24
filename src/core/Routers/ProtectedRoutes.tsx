import React, { lazy, Suspense } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import Loader from 'components/Loader/Loader';
import { ROUTES } from 'constants/routes';
import HelmetWrapper from 'components/HelmetWrapper/HelmetWrapper';
import { PageTitles } from 'constants/pageTitles';
import NavigateToNotFound from 'components/NavigateToNotFound/NavigateToNotFound';

const DetailedKey = lazy(() => import('pages/DetailedKey/DetailedKey'));
const Settings = lazy(() => import('pages/Settings/Settings'));
const Statistics = lazy(() => import('pages/Statistics/Statistics'));

const ProtectedRoutes = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route index element={<Navigate replace to={ROUTES.settings} />} />

        <Route
          path={`${ROUTES.settings}/:id`}
          element={
            <HelmetWrapper helmetTitle={PageTitles.KEY}>
              <DetailedKey />
            </HelmetWrapper>
          }
        />

        <Route
          path={ROUTES.settings}
          element={
            <HelmetWrapper helmetTitle={PageTitles.SETTINGS}>
              <Settings />
            </HelmetWrapper>
          }
        />

        <Route
          path={ROUTES.statistics}
          element={
            <HelmetWrapper helmetTitle={PageTitles.STATISTICS}>
              <Statistics />
            </HelmetWrapper>
          }
        />

        <Route path='*' element={<NavigateToNotFound />} />
      </Routes>
    </Suspense>
  );
};

export default ProtectedRoutes;
