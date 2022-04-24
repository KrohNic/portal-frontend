import React, { useCallback, useEffect, useRef, useState } from 'react';
import isEqual from 'lodash.isequal';

import {
  IDetailedKey,
  KeyDetailedFormErrors,
  DetailedKeyKeys,
  detailedKeyCommonErrorKey,
} from 'pages/DetailedKey/types.DetailedKey';

import { PrimaryButton, TextButton } from 'components/Buttons';
import Confirm from 'components/Modal/Confirm/Confirm';
import { TextInputCopyBtn } from 'components/Input';
import FormItem from 'components/FormItem/FormItem';
import ValidationMsg from 'components/ValidationMsg/ValidationMsg';
import KeyApiCheckboxes from 'components/KeyApiCheckboxes/KeyApiCheckboxes';

import { getCheckboxValue } from 'components/Checkbox/utils.Checkbox';
import { useChangesIsNotSavedAlert } from 'core/NavigationBlocker/useChangesIsNotSavedAlert';
import { useNotify } from 'core/notification/useNotify';
import { validate } from 'utils/validation';
import { keySettingsFormSchema } from './schema.KeyForm';

import styles from './KeyForm.module.scss';

interface Props {
  detailedKey: IDetailedKey;
  handleGoToSettings: () => void;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const KeyForm = ({ detailedKey, handleGoToSettings, setTitle }: Props) => {
  const { notify } = useNotify();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isKeyDeleting] = useState(false);
  const [isKeyDeleteModal, setIsKeyDeleteModal] = useState(false);
  const [isFormTouched, setIsFormTouched] = useState(false);
  const [values, setValues] = useState<IDetailedKey>(detailedKey);
  const [formErrors, setFormErrors] = useState<KeyDetailedFormErrors>({});

  const initialValuesRef = useRef(detailedKey);

  useChangesIsNotSavedAlert(isFormTouched);

  useEffect(() => {
    if (isEqual(initialValuesRef.current, values)) {
      setIsFormTouched(false);
    } else if (!isFormTouched) {
      setIsFormTouched(true);
    }
  }, [values, isFormTouched]);

  const openKeyDeleteModal = useCallback(() => setIsKeyDeleteModal(true), []);
  const closeKeyDeleteModal = useCallback(() => setIsKeyDeleteModal(false), []);

  const onDeleteKey = useCallback(async () => {
    setIsKeyDeleteModal(false);
    notify(`Ключ "${values[DetailedKeyKeys.name]}" удален`);
    handleGoToSettings();
  }, [notify, values, handleGoToSettings]);

  const handleKeySave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setFormErrors({});

    const validationErrors = validate(keySettingsFormSchema, values);

    if (validationErrors !== null) {
      setFormErrors(validationErrors);
      setIsSubmitting(false);
      setIsFormTouched(false);

      return;
    }

    setTitle(values[DetailedKeyKeys.name]);
    notify(`Ключ "${values[DetailedKeyKeys.name]}" сохранен`);

    initialValuesRef.current = values;

    setIsFormTouched(false);
    setIsSubmitting(false);
  };

  const onFormItemChange = useCallback(function onFormItemChange<T>(
    value: T,
    formItemName: string,
  ) {
    setFormErrors((errors) => ({ ...errors, [formItemName]: '' }));
    setValues((currentValues) => ({
      ...currentValues,
      [formItemName]: value,
    }));
  },
  []);

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

  return (
    <>
      <form onSubmit={handleKeySave}>
        <FormItem
          name={DetailedKeyKeys.name}
          label='Название'
          InputComponent={TextInputCopyBtn}
          value={values[DetailedKeyKeys.name]}
          onChange={onFormItemChange}
          errorMsg={formErrors[DetailedKeyKeys.name]}
        />

        <FormItem
          name={DetailedKeyKeys.value}
          label='Ключ'
          InputComponent={TextInputCopyBtn}
          value={values[DetailedKeyKeys.value]}
          disabled
        />

        <div className={styles.checkboxes}>
          <KeyApiCheckboxes
            values={values[DetailedKeyKeys.keyApis]}
            onKeyApiChange={onKeyApiChange}
          />
        </div>

        <div className={styles.buttons}>
          <TextButton onClick={openKeyDeleteModal} disabled={isKeyDeleting}>
            Удалить ключ
          </TextButton>

          <PrimaryButton
            className={styles.save_btn}
            type='submit'
            disabled={isSubmitting || !isFormTouched}
          >
            Сохранить
          </PrimaryButton>
        </div>

        <ValidationMsg
          message={formErrors[detailedKeyCommonErrorKey]}
          className={styles.common_error}
        />
      </form>

      <Confirm
        title='Удалить ключ?'
        visible={isKeyDeleteModal}
        onCancel={closeKeyDeleteModal}
        okButton={
          <PrimaryButton
            className={styles.delete_btn}
            onClick={onDeleteKey}
            disabled={isKeyDeleting}
          >
            Удалить
          </PrimaryButton>
        }
      />
    </>
  );
};

export default KeyForm;
