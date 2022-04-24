import React from 'react';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import type { INotification } from 'core/notification/types.notification';

import { NotificationAnimProps } from 'core/notification/constants.notification';

import styles from './NotificationWrapper.module.scss';

interface Props {
  notifications: INotification[];
}

const NotificationWrapper = ({ notifications }: Props) => {
  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {notifications.map(({ msg, id }) => (
          <motion.div
            key={id}
            className={cn(styles.notification, 'label_text')}
            initial={NotificationAnimProps.initial}
            animate={NotificationAnimProps.animate}
            exit={NotificationAnimProps.exit}
          >
            {msg}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationWrapper;
