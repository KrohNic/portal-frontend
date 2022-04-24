import React from 'react';

import Settings from 'assets/img/settings.svg';
import Statistics from 'assets/img/statistics.svg';

import { ROUTES } from 'constants/routes';
import { TextButton } from 'components/Buttons';
import ProtectedRoutes from 'core/Routers/ProtectedRoutes';
import CustomLink from './CustomLink/CustomLink';

import styles from './MainLayout.module.scss';

const MainLayout = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={styles.logo}>
          <span className={styles.text}>Портал</span>
        </div>

        <TextButton className={styles.button_exit}>Выйти</TextButton>
      </header>

      <div className={styles.page_container}>
        <nav className={styles.sider}>
          <CustomLink src={Settings} to={ROUTES.settings}>
            Настройки
          </CustomLink>

          <CustomLink src={Statistics} to={ROUTES.statistics}>
            Статистика
          </CustomLink>
        </nav>

        <main className={styles.main_container}>
          <ProtectedRoutes />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
