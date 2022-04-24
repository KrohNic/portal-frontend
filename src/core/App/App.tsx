import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import { ErrorBoundary } from 'core/ErrorBoundary/ErrorBoundary';
import { NotificationProvider } from 'core/notification/notificationProvider';
import Router from 'core/Routers/Router';

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <BrowserRouter>
        <NotificationProvider>
          <Router />
        </NotificationProvider>
      </BrowserRouter>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
