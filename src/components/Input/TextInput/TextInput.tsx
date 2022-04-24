import React, { useCallback, useRef } from 'react';
import cn from 'classnames';

import type { TextInputProps } from 'components/Input/TextInput/types.TextInput';

import BasicInput from 'components/Input/BasicInput';
import { CloseButton } from 'components/Buttons';

import inputStyles from '../Input.module.scss';
import styles from './TextInput.module.scss';

const TextInput = ({
  className,
  hasError = false,
  clearable = false,
  onChange,
  ...restProps
}: TextInputProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClear = useCallback(() => {
    if (inputRef.current === null) return;

    const changeEvent = new InputEvent('change', {
      bubbles: true,
      cancelable: true,
    });
    const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
      window.HTMLInputElement.prototype,
      'value',
    )?.set;

    nativeInputValueSetter?.call(inputRef.current, '');
    inputRef.current.dispatchEvent(changeEvent);
  }, []);

  return (
    <div
      className={cn(
        styles.container,
        { [styles.clearable_container]: clearable },
        className,
      )}
    >
      <BasicInput
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
        ref={inputRef}
        onChange={onChange}
        className={cn(inputStyles.input, styles.input, {
          [inputStyles.error]: hasError,
        })}
      />

      {clearable && (
        <CloseButton
          onClick={onClear}
          className={styles.clear_btn}
          title='Очистить'
        />
      )}
    </div>
  );
};

export default React.memo(TextInput) as typeof TextInput;
