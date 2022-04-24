import cn from 'classnames';
import React, { FC } from 'react';
import { Link, LinkProps } from 'react-router-dom';

import styles from './PrimaryButton.module.scss';

interface ButtonLinkProps extends LinkProps {
  className?: string;
}

const PrimaryButtonLink: FC<ButtonLinkProps> = ({
  className,
  ...restProps
}) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link className={cn(styles.button, className)} {...restProps} />
);

export default PrimaryButtonLink;
