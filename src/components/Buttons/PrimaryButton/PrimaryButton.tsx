import React, { FC } from 'react';
import cn from 'classnames';

import type { BasicButtonType } from 'components/Buttons/types.Buttons';

import Button from 'components/Buttons/Button';

import styles from './PrimaryButton.module.scss';

const PrimaryButton: FC<BasicButtonType> = ({ className, ...restProps }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Button {...restProps} className={cn(styles.button, className)} />
);

export default PrimaryButton;
