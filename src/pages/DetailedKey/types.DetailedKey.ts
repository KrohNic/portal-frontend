export type DetailedKeyApiKeys = 'trackNum' | 'status' | 'track';

export type DetailedKeyApiAttributes = Record<'label' | 'color', string>;

export type DetailedKeyApiType = Record<DetailedKeyApiKeys, boolean>;

export const detailedKeyCommonErrorKey = 'common';

export enum DetailedKeyKeys {
  name = 'name',
  value = 'value',
  isActive = 'isActive',
  keyApis = 'keyApis',
}

export interface IDetailedKey {
  id: string;
  [DetailedKeyKeys.isActive]: boolean;
  [DetailedKeyKeys.name]: string;
  [DetailedKeyKeys.value]: string;
  [DetailedKeyKeys.keyApis]: DetailedKeyApiType;
}

export type KeyDetailedFormErrors = Partial<
  Record<keyof IDetailedKey | typeof detailedKeyCommonErrorKey, string>
>;
