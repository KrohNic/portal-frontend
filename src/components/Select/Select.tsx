import React, { useCallback, useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import DropdownHandleSvg from 'components/icons/DropdownHandleSvg';
import { SelectAnimProps } from './constants.Select';

import type { SelectOption, SelectProps } from './types.Select';

import styles from './Select.module.scss';

function Select<T extends string | number>({
  className,
  options,
  onChange,
  initialValue,
  value = null,
  ...restProps
}: SelectProps<T>) {
  const [selectedOption, setSelectedOption] = useState(
    initialValue || { label: '' },
  );
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value === null) return undefined;

    const foundedOption = options.find((option) => option.value === value);

    if (foundedOption !== undefined) setSelectedOption(foundedOption);

    return undefined;
  }, [value, options]);

  const onDocumentKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.code !== 'Escape') return;

    setIsOpen(false);
    event.preventDefault();
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;

    document.addEventListener('keydown', onDocumentKeyDown);

    return () => document.removeEventListener('keydown', onDocumentKeyDown);
  }, [isOpen, onDocumentKeyDown]);

  const onSelectKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (isOpen) return;
    if (event.code !== 'Space' && event.code !== 'Enter') return;

    event.preventDefault();
    setIsOpen(true);
  };

  const onSelectOption = (option: SelectOption<T>) => {
    setSelectedOption(option);
    onChange(option.value);
  };

  const onSelectBlur = (event: React.FocusEvent<HTMLDivElement, Element>) => {
    const isChild = selectRef.current?.contains(event.relatedTarget);

    if (!isChild) setIsOpen(false);
  };

  return (
    <div
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
      role='combobox'
      aria-haspopup='listbox'
      aria-controls='rc_select_1_list'
      aria-expanded='false'
      tabIndex={0}
      className={cn(styles.select, className)}
      onClick={() => setIsOpen((currentValue) => !currentValue)}
      ref={selectRef}
      onBlur={onSelectBlur}
      onKeyDown={onSelectKeyDown}
      title={selectedOption.label}
    >
      <div className={styles.value_container}>{selectedOption.label}</div>
      <DropdownHandleSvg className={styles.dropdown_ico} />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={SelectAnimProps.initial}
            animate={SelectAnimProps.animate}
            exit={SelectAnimProps.exit}
            className={styles.dropdown}
            role='listbox'
          >
            {options.map((option) => (
              <button
                key={option.value}
                type='button'
                onClick={() => onSelectOption(option)}
                className={styles.option}
                title={option.label}
              >
                <span className={styles.option_label}>{option.label}</span>

                {option === selectedOption && <div className={styles.ico} />}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default React.memo(Select) as typeof Select;
