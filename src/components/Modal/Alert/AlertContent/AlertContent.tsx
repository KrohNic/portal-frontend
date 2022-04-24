import React, { useCallback, useEffect } from 'react';

import type { AlertContentProps } from 'components/Modal/Alert/AlertContent/types.AlertContent';

import { PrimaryButton, CloseButton } from 'components/Buttons';

import styles from './AlertContent.module.scss';

const AlertContent = ({
  children,
  title,
  onOk = () => {},
  okButton,
}: AlertContentProps) => {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape' || event.code === 'Enter') {
        onOk();
        event.preventDefault();
      }
    },
    [onOk],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.alert}>
      <header className={styles.header}>
        <h3 className='page_title'>{title}</h3>

        <CloseButton onClick={onOk} />
      </header>

      {children}

      {okButton !== undefined ? (
        okButton
      ) : (
        <PrimaryButton
          onClick={onOk}
          className={styles.ok_button}
          title='Подтвердить (Enter)'
        >
          OK
        </PrimaryButton>
      )}
    </div>
  );
};

export default AlertContent;
