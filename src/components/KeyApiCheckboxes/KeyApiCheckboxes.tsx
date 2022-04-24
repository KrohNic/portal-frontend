import React from 'react';

import type {
  DetailedKeyApiKeys,
  DetailedKeyApiAttributes,
  DetailedKeyApiType,
} from 'pages/DetailedKey/types.DetailedKey';

import { KeyDetailedApiNames } from 'pages/DetailedKey/KeySettings/KeyForm/constants.KeyForm';
import KeyApiCheckboxItem from './KeyApiCheckboxItem';

interface Props {
  values: DetailedKeyApiType;
  onKeyApiChange: (
    event: React.ChangeEvent<HTMLInputElement>,
    name: string,
  ) => void;
}

const KeyApiCheckboxes = ({ values, onKeyApiChange }: Props) => (
  <>
    {(
      Object.entries(KeyDetailedApiNames) as [
        DetailedKeyApiKeys,
        DetailedKeyApiAttributes,
      ][]
    ).map(([keyApiName, { label }]) => (
      <KeyApiCheckboxItem
        key={keyApiName}
        keyApiName={keyApiName}
        value={values[keyApiName]}
        label={label}
        onKeyApiChange={onKeyApiChange}
      />
    ))}
  </>
);

export default React.memo(KeyApiCheckboxes);
