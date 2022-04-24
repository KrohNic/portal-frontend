import React from 'react';

import type { ISettingsData } from 'pages/Settings/types.Settings';

import SettingsPage from './SettingsPage/SettingsPage';

const Settings = () => {
  const settingsData: ISettingsData = {
    client: {
      clientID: 'rgrgg',
      clientSecret: '345',
    },
    keys: [
      {
        id: '1',
        isActive: true,
        name: `Key_n`,
        value: '1234',
        keyApis: {
          trackNum: false,
          status: false,
          track: false,
        },
      },
      {
        id: '2',
        name: 'key_2',
        isActive: false,
        value: '1234',
        keyApis: {
          trackNum: true,
          status: false,
          track: false,
        },
      },
    ],
  };

  return <SettingsPage settingsData={settingsData} />;
};

export default Settings;
