import React, { useState } from 'react';
import cn from 'classnames';

import type { InputProps } from 'components/Input/types.Input';

import HideSvg from 'components/icons/HideSvg';
import ShowSvg from 'components/icons/ShowSvg';

import inputStyles from '../Input.module.scss';
import passwordStyles from './PasswordInput.module.scss';

const PasswordInputVisiblePassState = {
  isHidden: false,
  title: 'Скрыть ввод',
  type: 'text',
};
const PasswordInputHiddenPassState = {
  isHidden: true,
  title: 'Показать ввод',
  type: 'password',
};

type PasswordInputState =
  | typeof PasswordInputVisiblePassState
  | typeof PasswordInputHiddenPassState;

const PasswordInput = ({
  className,
  hasError = false,
  disabled = false,
  ...restProps
}: InputProps) => {
  const [state, setState] = useState<PasswordInputState>(
    PasswordInputHiddenPassState,
  );

  const onHideBtnClick = () => {
    if (state.isHidden) setState(PasswordInputVisiblePassState);
    else setState(PasswordInputHiddenPassState);
  };

  return (
    <div className={cn(passwordStyles.container, className)}>
      <input
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
        className={cn(inputStyles.input, passwordStyles.input, className, {
          [inputStyles.error]: hasError,
        })}
        disabled={disabled}
        type={disabled ? 'password' : state.type}
      />

      {!disabled && (
        <button
          type='button'
          title={state.title}
          onClick={onHideBtnClick}
          className={passwordStyles.hide_btn}
        >
          {state.isHidden ? <HideSvg /> : <ShowSvg />}
          {state.title}
        </button>
      )}
    </div>
  );
};

export default React.memo(PasswordInput);
