import React, { useCallback, useEffect } from 'react';

import { TextButton, PrimaryButton, CloseButton } from 'components/Buttons';

import type { ConfirmContentProps } from './types.ConfirmContent';

import styles from './ConfirmContent.module.scss';

const ConfirmContent = ({
  children,
  title,
  onOk = () => {},
  okButton,
  onCancel = () => {},
  cancelButton,
}: ConfirmContentProps) => {
  const handleOk = useCallback(() => {
    onCancel();
    onOk();
  }, [onCancel, onOk]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape') {
        onCancel();
      } else if (event.code === 'Enter') {
        handleOk();
      } else {
        return;
      }

      event.preventDefault();
    },
    [handleOk, onCancel],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className={styles.confirm}>
      <header className={styles.header}>
        <h3 className='page_title'>{title}</h3>

        <CloseButton onClick={onCancel} />
      </header>

      {children}

      <div className={styles.buttons}>
        {cancelButton !== undefined ? (
          cancelButton
        ) : (
          <TextButton
            onClick={onCancel}
            className={styles.cancel_btn}
            title='Закрыть (Esc)'
          >
            Отмена
          </TextButton>
        )}
        {okButton !== undefined ? (
          okButton
        ) : (
          <PrimaryButton
            onClick={handleOk}
            className={styles.cancel_btn}
            title='Подтвердить (Enter)'
          >
            OK
          </PrimaryButton>
        )}
      </div>
    </div>
  );
};

export default React.memo(ConfirmContent);
