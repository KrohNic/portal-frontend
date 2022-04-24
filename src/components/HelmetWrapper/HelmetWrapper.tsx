import React, { FC } from 'react';
import { Helmet } from 'react-helmet-async';

import { PageTitles } from 'constants/pageTitles';

interface HelmetWrapperProps {
  helmetTitle: string;
}

const HelmetWrapper: FC<HelmetWrapperProps> = ({ children, helmetTitle }) => (
  <>
    <Helmet>
      <title>
        {PageTitles.APP_TITLE} | {helmetTitle}
      </title>
    </Helmet>
    {children}
  </>
);

export default HelmetWrapper;
