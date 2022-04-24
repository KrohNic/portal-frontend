import React, { useCallback, useEffect, useState } from 'react';
import isEqual from 'lodash.isequal';

import type {
  IAddKeyModalContentProps,
  INewKey,
} from 'pages/Settings/SettingsPage/AddKeyModal/AddKeyModalContent/types.AddKeyModalContent';
import type { KeyDetailedFormErrors } from 'pages/DetailedKey/types.DetailedKey';

import {
  detailedKeyCommonErrorKey,
  DetailedKeyKeys,
} from 'pages/DetailedKey/types.DetailedKey';
import { CloseButton, PrimaryButton } from 'components/Buttons';
import FormItem from 'components/FormItem/FormItem';
import { TextInput } from 'components/Input';
import ValidationMsg from 'components/ValidationMsg/ValidationMsg';
import KeyApiCheckboxes from 'components/KeyApiCheckboxes/KeyApiCheckboxes';
import { getCheckboxValue } from 'components/Checkbox/utils.Checkbox';
import { validate } from 'utils/validation';
import { keySettingsFormSchema } from 'pages/DetailedKey/KeySettings/KeyForm/schema.KeyForm';
import { useChangesIsNotSavedAlert } from 'core/NavigationBlocker/useChangesIsNotSavedAlert';
import { changesIsNotSavedLabel } from 'constants/labels';
import { initialModalKeyValues } from './constants.AddKeyModalContent';

import styles from './AddKeyModalContent.module.scss';

const AddKeyModalContent = ({ onClose }: IAddKeyModalContentProps) => {
  const [values, setValues] = useState<INewKey>(initialModalKeyValues);
  const [formErrors, setFormErrors] = useState<KeyDetailedFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);

  useChangesIsNotSavedAlert(isFormTouched);

  useEffect(() => {
    if (isEqual(initialModalKeyValues, values)) {
      setIsFormTouched(false);
    } else if (!isFormTouched) {
      setIsFormTouched(true);
    }
  }, [values, isFormTouched]);

  const onKeyNameChange = useCallback((value: string) => {
    setValues((prevValues) => ({
      ...prevValues,
      [DetailedKeyKeys.name]: value,
    }));

    setFormErrors((errors) => ({ ...errors, [DetailedKeyKeys.name]: '' }));
  }, []);

  const onKeyApiChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, name: string) => {
      setValues((currentValues) => ({
        ...currentValues,

        [DetailedKeyKeys.keyApis]: {
          ...currentValues[DetailedKeyKeys.keyApis],
          [name]: getCheckboxValue(event),
        },
      }));

      setFormErrors((errors) => ({
        ...errors,
        [detailedKeyCommonErrorKey]: '',
      }));
    },
    [],
  );

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validate(keySettingsFormSchema, values);

    if (validationErrors !== null) {
      setFormErrors(validationErrors);
      setIsSubmitting(false);
      setIsFormTouched(false);
    }

    setIsSubmitting(false);
    onClose();
  };

  const onCloseBtnClick = useCallback(() => {
    if (!isFormTouched) {
      onClose();
      return;
    }

    // eslint-disable-next-line no-alert
    const answer = window.confirm(changesIsNotSavedLabel);

    if (answer) onClose();
  }, [isFormTouched, onClose]);

  return (
    <div className={styles.modal}>
      <header className={styles.header}>
        <h3 className='page_title'>Новый ключ</h3>

        <CloseButton onClick={onCloseBtnClick} />
      </header>

      <form onSubmit={onSubmit}>
        <FormItem
          name='name'
          label='Название'
          InputComponent={TextInput}
          value={values[DetailedKeyKeys.name]}
          onChange={onKeyNameChange}
          errorMsg={formErrors[DetailedKeyKeys.name]}
          placeholder='Введите название'
        />

        <div className={styles.checkbox_container}>
          <KeyApiCheckboxes
            values={values[DetailedKeyKeys.keyApis]}
            onKeyApiChange={onKeyApiChange}
          />
        </div>

        <PrimaryButton
          disabled={isSubmitting || !isFormTouched}
          className={styles.modal_button}
          type='submit'
        >
          Создать ключ
        </PrimaryButton>

        <ValidationMsg message={formErrors[detailedKeyCommonErrorKey]} />
      </form>
    </div>
  );
};

export default AddKeyModalContent;
