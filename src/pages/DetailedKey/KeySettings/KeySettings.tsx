import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import {
  IDetailedKey,
  DetailedKeyKeys,
} from 'pages/DetailedKey/types.DetailedKey';

import { ROUTES } from 'constants/routes';
import { BackButton } from 'components/Buttons';
import Switch from 'components/Switch/Switch';
import { useNotify } from 'core/notification/useNotify';
import useAbortController from 'core/useAbortController/useAbortController';
import KeyForm from './KeyForm/KeyForm';

import styles from './KeySettings.module.scss';

interface Props {
  detailedKey: IDetailedKey;
}

const KeySettings = ({ detailedKey }: Props) => {
  const { notify } = useNotify();
  const navigate = useNavigate();
  const abortController = useAbortController();

  const [title, setTitle] = useState(detailedKey[DetailedKeyKeys.name]);
  const [isKeyActivationChanging, setIsKeyActivationChanging] = useState(false);

  const handleGoToSettings = useCallback(
    () => navigate(ROUTES.settings),
    [navigate],
  );

  const onKeyActivationChange = useCallback(
    async (isClicked: boolean) => {
      setIsKeyActivationChanging(true);

      if (abortController.signal.aborted) return;

      setIsKeyActivationChanging(false);

      if (isClicked) notify('Ключ активирован');
      else notify('Ключ деактивирован');
    },
    [abortController, notify],
  );

  return (
    <div className={styles.column}>
      <header className={styles.header}>
        <BackButton className={styles.back_btn} onClick={handleGoToSettings} />

        <h2 className={cn('page_title', styles.title)}>{title}</h2>

        <div className={styles.switcher_container}>
          <Switch
            onChange={onKeyActivationChange}
            disabled={isKeyActivationChanging}
          />
        </div>
      </header>

      <KeyForm
        detailedKey={detailedKey}
        handleGoToSettings={handleGoToSettings}
        setTitle={setTitle}
      />
    </div>
  );
};

export default KeySettings;
