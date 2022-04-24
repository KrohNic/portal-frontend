import * as yup from 'yup';

import {
  detailedKeyCommonErrorKey,
  DetailedKeyApiKeys,
  IDetailedKey,
  DetailedKeyKeys,
  DetailedKeyApiType,
} from 'pages/DetailedKey/types.DetailedKey';
import { KeyDetailedApiNames } from 'pages/DetailedKey/KeySettings/KeyForm/constants.KeyForm';

const isAtLeastOneApiChecked = (values: DetailedKeyApiType) => {
  return (Object.keys(KeyDetailedApiNames) as DetailedKeyApiKeys[]).some(
    (key) => values[key],
  );
};

const atLeastOneApiCheckedKey = 'atLeastOneApiChecked';

yup.addMethod(
  yup.object,
  atLeastOneApiCheckedKey,
  function atLeastOneApiChecked(errorMessage) {
    return this.test(
      atLeastOneApiCheckedKey,
      errorMessage,
      function callback(values: unknown) {
        const { createError } = this;

        return (
          isAtLeastOneApiChecked(
            (values as IDetailedKey)[DetailedKeyKeys.keyApis],
          ) ||
          createError({
            path: detailedKeyCommonErrorKey,
            message: errorMessage,
          })
        );
      },
    );
  },
);

const keySettingsKeyNameSchema = yup.object().shape({
  [DetailedKeyKeys.name]: yup.string().required('Пожалуйста введите название'),
}) as unknown as {
  [atLeastOneApiCheckedKey]: (msg: string) => yup.AnySchema;
};

export const keySettingsFormSchema = keySettingsKeyNameSchema[
  atLeastOneApiCheckedKey
]('Выберите хотя бы один API');
