import React from 'react';
import cn from 'classnames';

import type { IconButtonType } from 'components/Buttons/types.Buttons';

import Button from 'components/Buttons/Button';
import ArrowSvg from 'components/icons/ArrowSvg';

import styles from './BackButton.module.scss';

const BackButton = ({
  className,
  title = 'Назад',
  ...restProps
}: IconButtonType) => (
  <Button
    className={cn(styles.btn, className)}
    title={title}
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...restProps}
  >
    <ArrowSvg />
  </Button>
);

export default BackButton;
