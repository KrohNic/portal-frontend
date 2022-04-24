import React from 'react';
import { useLocation } from 'react-router-dom';

import type { LocationFromState } from 'types/LocationFromState';

import { PrimaryButtonLink } from 'components/Buttons';
import { ROUTES } from 'constants/routes';

import styles from './NotFound.module.scss';

const NotFound = () => {
  const { state } = useLocation();
  const from = (state as LocationFromState)?.from;

  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>404</h1>

      <h5 className={styles.subtitle}>Страница не найдена</h5>

      {from ? (
        <p className={styles.text}>
          Страница <code>&quot;{from}&quot;</code> не существует.
        </p>
      ) : (
        <p className={styles.text}>Страница, которую вы ищете не существует.</p>
      )}

      <PrimaryButtonLink className={styles.go_root_btn} to={ROUTES.root}>
        Перейти на главную страницу
      </PrimaryButtonLink>
    </div>
  );
};

export default NotFound;
