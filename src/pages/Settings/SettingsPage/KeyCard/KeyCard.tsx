import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';

import type { IDetailedKey } from 'pages/DetailedKey/types.DetailedKey';

import Switch from 'components/Switch/Switch';
import { TextInputCopyBtn } from 'components/Input';
import useAbortController from 'core/useAbortController/useAbortController';

import styles from './KeyCard.module.scss';

const onCardClick = (
  event: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
) => {
  const { target, currentTarget } = event;

  const isTitle = (target as HTMLElement).classList.contains(styles.title);
  const isHeader = (target as HTMLElement).classList.contains(styles.header);
  const isTargetTheLinkItself = target === currentTarget;

  const isInWhiteList = !isTargetTheLinkItself && !isTitle && !isHeader;

  if (isInWhiteList) event.preventDefault();
};

interface KeyCardProps {
  keyActivationToggleHandler: (id: string) => Promise<void>;
  item: IDetailedKey;
}

const KeyCard = ({ keyActivationToggleHandler, item }: KeyCardProps) => {
  const abortController = useAbortController();
  const [isKeyActivationChanging, setIsKeyActivationChanging] = useState(false);

  const onKeyActivationToggle = useCallback(async () => {
    setIsKeyActivationChanging(true);
    await keyActivationToggleHandler(item.id);

    if (!abortController.signal.aborted) setIsKeyActivationChanging(false);
  }, [abortController.signal.aborted, keyActivationToggleHandler, item.id]);

  return (
    <Link className={styles.key_container} to={item.id} onClick={onCardClick}>
      <div className={styles.header}>
        <h5 className={styles.title}>{item.name}</h5>

        <Switch
          onChange={onKeyActivationToggle}
          value={item.isActive}
          disabled={isKeyActivationChanging}
        />
      </div>

      <TextInputCopyBtn name={item.name} value={item.value} disabled />
    </Link>
  );
};

export default KeyCard;
