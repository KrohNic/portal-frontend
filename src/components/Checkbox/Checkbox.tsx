/* eslint-disable css-modules/no-undef-class */
import React from 'react';

import type { CheckboxProps } from './types.Checkbox';

import styles from './Checkbox.module.scss';

const Checkbox = ({ value, onChange, ...restProps }: CheckboxProps) => (
  <div className={styles.container}>
    <input
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      type='checkbox'
      className={styles.hidden_checkbox}
      checked={value}
      onChange={onChange}
    />
    <div className={styles.visible_checkbox}>
      <svg viewBox='0 0 24 24' className={styles.icon}>
        <polyline points='20 6 9 17 4 12' />
      </svg>
    </div>
  </div>
);

export default React.memo(Checkbox);
