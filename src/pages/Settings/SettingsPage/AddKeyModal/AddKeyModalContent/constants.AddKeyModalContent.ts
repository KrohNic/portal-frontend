import type { INewKey } from 'pages/Settings/SettingsPage/AddKeyModal/AddKeyModalContent/types.AddKeyModalContent';

import { KeyDetailedApiNames } from 'pages/DetailedKey/KeySettings/KeyForm/constants.KeyForm';
import { DetailedKeyKeys } from 'pages/DetailedKey/types.DetailedKey';

export const initialModalKeyValues: INewKey = {
  name: '',
  keyApis: Object.keys(KeyDetailedApiNames).reduce(
    (acc, keyApiKey) => ({ ...acc, [keyApiKey]: false }),
    {},
  ) as INewKey[DetailedKeyKeys.keyApis],
};

Object.freeze(initialModalKeyValues);
