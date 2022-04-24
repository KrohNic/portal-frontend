import React from 'react';

import type { ModalProps } from 'components/Modal/types.Modal';
import type { AlertContentProps } from 'components/Modal/Alert/AlertContent/types.AlertContent';

import Modal from 'components/Modal/Modal';
import AlertContent from './AlertContent/AlertContent';

interface Props extends ModalProps, AlertContentProps {}

const Alert = ({ visible, onOk, ...restProps }: Props) => (
  <Modal visible={visible} onBackDropClick={onOk}>
    <AlertContent
      onOk={onOk}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  </Modal>
);

export default Alert;
