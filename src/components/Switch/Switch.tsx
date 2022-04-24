import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import type { SwitchProps } from './types.Switch';

import styles from './Switch.module.scss';

const Switch = ({
  className,
  value: propsValue = false,
  onChange = () => {},
  ...restProps
}: SwitchProps) => {
  const [value, setValue] = useState(propsValue);

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  const onClick = () => {
    onChange(!value);
    setValue(!value);
  };

  return (
    <button
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      type='button'
      role='switch'
      aria-checked='true'
      onClick={onClick}
      className={cn(styles.switch, className, { [styles.checked]: value })}
    >
      <div className={styles.circle} />
    </button>
  );
};

export default React.memo(Switch);
