import React, { useCallback, useMemo, useState } from 'react';

import type { ISettingsData } from 'pages/Settings/types.Settings';
import type { IDetailedKey } from 'pages/DetailedKey/types.DetailedKey';

import { PrimaryButton } from 'components/Buttons';
import KeyCard from 'pages/Settings/SettingsPage/KeyCard/KeyCard';
import { useNotify } from 'core/notification/useNotify';
import FormItem from 'components/FormItem/FormItem';
import { TextInputCopyBtn } from 'components/Input';
import useAbortController from 'core/useAbortController/useAbortController';
import { MAX_NUMBER_KEYS } from './constants.SettingsPage';
import AddKeyModal from './AddKeyModal/AddKeyModal';

import styles from './SettingsPage.module.scss';

interface Props {
  settingsData: ISettingsData;
}

const SettingsPage = ({ settingsData }: Props) => {
  const { notify } = useNotify();
  const abortController = useAbortController();

  const [isAddKeyModal, setIsAddKeyModal] = useState(false);
  const [keys, setKeys] = useState<IDetailedKey[]>(settingsData.keys);

  const isMaxKeysNumber = keys.length === MAX_NUMBER_KEYS;

  const keysInUse = useMemo(() => {
    return keys.filter((item) => item.isActive === true).length;
  }, [keys]);

  const showAddKeyModal = useCallback(() => setIsAddKeyModal(true), []);

  const hideAddKeyModal = useCallback(() => setIsAddKeyModal(false), []);

  const onKeyActivationToggle = useCallback(
    async (keyId: string) => {
      if (abortController.signal.aborted) return;

      setKeys((prevKeys) =>
        prevKeys.map((key) => {
          if (key.id !== keyId) return key;

          const isActive = !key.isActive;

          notify(`Ключ "${key.name}" ${isActive ? '' : 'де'}активирован`);

          return {
            ...key,
            isActive,
          };
        }),
      );
    },
    [abortController.signal.aborted, notify],
  );

  return (
    <>
      <div className={styles.settings_container}>
        <div className={styles.settings_without_key_cards}>
          <h1 className='page_title'>Данные</h1>

          <form className={styles.form}>
            <FormItem
              name='Client ID'
              label='Client ID'
              InputComponent={TextInputCopyBtn}
              value={settingsData.client.clientID}
              placeholder='Нет данных'
              disabled
            />

            <FormItem
              name='Client Secret'
              label='Client Secret'
              InputComponent={TextInputCopyBtn}
              value={settingsData.client.clientSecret}
              placeholder='Нет данных'
              disabled
            />
          </form>

          <div className={styles.container_title_button}>
            <h1 className='page_title'>Ключи</h1>

            <div className={styles.add_key_btn_container}>
              <PrimaryButton
                className={styles.button}
                type='button'
                onClick={showAddKeyModal}
                disabled={isMaxKeysNumber}
              >
                Создать новый ключ
              </PrimaryButton>

              {isMaxKeysNumber && (
                <span className={styles.tooltip}>
                  Уже создано максимальное количество ключей
                </span>
              )}
            </div>
          </div>

          <div className={styles.number_keys_used}>
            {`Используется ${keysInUse} из 10`}
          </div>
        </div>

        {keys.length > 0 ? (
          keys.map((item) => (
            <KeyCard
              key={item.id}
              keyActivationToggleHandler={onKeyActivationToggle}
              item={item}
            />
          ))
        ) : (
          <div className={styles.container_without_keys}>Ключей пока нет</div>
        )}
      </div>

      <AddKeyModal visible={isAddKeyModal} onClose={hideAddKeyModal} />
    </>
  );
};

export default SettingsPage;
