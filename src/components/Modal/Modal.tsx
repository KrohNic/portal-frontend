import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';

import cn from 'classnames';
import {
  BackdropAnimProps,
  defaultModalBackDropClick,
  ModalAnimProps,
} from './constants.Modal';

import type { ModalProps } from './types.Modal';

import styles from './Modal.module.scss';

const Modal: FC<ModalProps> = ({
  visible: visibleProp,
  children,
  onBackDropClick = defaultModalBackDropClick,
}) => {
  const [visible, setVisible] = useState(visibleProp);
  const mouseDownTargetRef = useRef<EventTarget | null>(null);
  const mouseUpTargetRef = useRef<EventTarget | null>(null);

  useEffect(() => {
    setVisible(visibleProp);
  }, [visibleProp]);

  useEffect(() => {
    if (!visible) return undefined;

    const body = document.querySelector('body');

    if (body === null) return undefined;

    const html = document.querySelector('html') as HTMLElement;
    const scrollbarWidth = window.innerWidth - html.getClientRects()[0].width;

    html.style.paddingRight = `${scrollbarWidth}px`;
    body.classList.add(styles.screen_no_overflow);

    return () => {
      body.classList.remove(styles.screen_no_overflow);
      html.style.paddingRight = '';
    };
  }, [visible]);

  const onClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      const { currentTarget, target } = event;

      if (mouseUpTargetRef.current !== mouseDownTargetRef.current) return;

      if (target !== currentTarget) return;

      onBackDropClick();
    },
    [onBackDropClick],
  );

  const onMouseDown = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      mouseDownTargetRef.current = event.target;
    },
    [],
  );

  const onMouseUp = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      mouseUpTargetRef.current = event.target;
    },
    [],
  );

  return createPortal(
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={BackdropAnimProps.initial}
            animate={BackdropAnimProps.animate}
            exit={BackdropAnimProps.exit}
            className={styles.backdrop}
          />
          <motion.div
            initial={ModalAnimProps.initial}
            animate={ModalAnimProps.animate}
            exit={ModalAnimProps.exit}
            className={cn(styles.modal, {
              [styles.cursor_pointer]:
                onBackDropClick !== defaultModalBackDropClick,
            })}
            onClick={onClick}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.getElementById('root') as Element,
  );
};

export default React.memo(Modal) as typeof Modal;
