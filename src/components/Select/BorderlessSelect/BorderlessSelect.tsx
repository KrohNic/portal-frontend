import React from 'react';
import cn from 'classnames';

import Select from 'components/Select/Select';

import type { SelectProps } from 'components/Select/types.Select';

import styles from './BorderlessSelect.module.scss';

const BorderlessSelect = <T extends string | number>({
  className,
  ...restProps
}: SelectProps<T>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Select {...restProps} className={cn(styles.borderless, className)} />
);

export default BorderlessSelect;
