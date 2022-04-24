import type { IDetailedKey } from 'pages/DetailedKey/types.DetailedKey';

export interface ISettingsData {
  client: {
    clientID: string;
    clientSecret: string;
  };
  keys: IDetailedKey[];
}
