import React from 'react';
import { useParams } from 'react-router-dom';

import type { IDetailedKey } from 'pages/DetailedKey/types.DetailedKey';

import KeySettings from './KeySettings/KeySettings';

import styles from './DetailedKey.module.scss';

const DetailedKey = () => {
  const { id: keyId } = useParams();

  const keyData: IDetailedKey = {
    id: String(keyId),
    isActive: true,
    name: `Key_${keyId}`,
    value: '1234',
    keyApis: {
      trackNum: false,
      status: false,
      track: false,
    },
  };

  return (
    <div className={styles.container}>
      <KeySettings detailedKey={keyData} />
    </div>
  );
};

export default DetailedKey;
