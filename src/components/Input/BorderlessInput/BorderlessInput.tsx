import React from 'react';
import cn from 'classnames';

import type { TextInputProps } from 'components/Input/TextInput/types.TextInput';

import TextInput from 'components/Input/TextInput/TextInput';

import styles from './BorderlessInput.module.scss';

const BorderlessInput = ({ className, ...restProps }: TextInputProps) => (
  <TextInput
    // eslint-disable-next-line react/jsx-props-no-spreading
    {...restProps}
    className={cn(className, styles.container)}
  />
);

export default React.memo(BorderlessInput) as typeof BorderlessInput;
