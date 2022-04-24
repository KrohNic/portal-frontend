import React from 'react';
import cn from 'classnames';

import type { IconButtonType } from 'components/Buttons/types.Buttons';

import Button from 'components/Buttons/Button';
import CrossSvg from 'components/icons/CrossSvg';

import styles from './CloseButton.module.scss';

const CloseButton = ({
  onClick,
  title = 'Закрыть',
  className,
  ...restProps
}: IconButtonType) => (
  <Button
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...restProps}
    className={cn(styles.btn, className)}
    title={title}
    onClick={onClick}
  >
    <CrossSvg />
  </Button>
);

export default CloseButton;
