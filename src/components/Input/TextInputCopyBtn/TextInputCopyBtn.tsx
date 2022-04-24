import React from 'react';
import cn from 'classnames';

import CopySvg from 'components/icons/CopySvg';
import { useNotify } from 'core/notification/useNotify';
import BasicInput from 'components/Input/BasicInput';

import inputStyles from '../Input.module.scss';
import copyTextStyles from './TextInputCopyBtn.module.scss';

interface Props extends React.ComponentProps<typeof BasicInput> {
  onCopy?: () => void;
}

const TextInputCopyBtn = ({
  className,
  value = '',
  hasError = false,
  onCopy,
  disabled,
  ...restProps
}: Props) => {
  const { notifyTextCopy } = useNotify();

  const isCopyByClickOnInput = value !== '' && disabled;

  const onCopyBtnClick = () => {
    navigator.clipboard.writeText(String(value));
    (onCopy || notifyTextCopy)();
  };

  const onContainerClick = () => {
    if (isCopyByClickOnInput) onCopyBtnClick();
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={cn(copyTextStyles.container, className, {
        [copyTextStyles.cursor_pointer]: isCopyByClickOnInput,
        [copyTextStyles.container_disabled]: disabled,
      })}
      onClick={onContainerClick}
    >
      <BasicInput
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
        value={value}
        disabled={disabled}
        className={cn(inputStyles.input, copyTextStyles.input, className, {
          [inputStyles.error]: hasError,
        })}
      />

      {value !== '' && (
        <button
          type='button'
          title='Копировать'
          onClick={onCopyBtnClick}
          className={copyTextStyles.copy_btn}
        >
          <CopySvg className={copyTextStyles.copy_ico} />
          Копировать
        </button>
      )}
    </div>
  );
};

export default React.memo(TextInputCopyBtn);
