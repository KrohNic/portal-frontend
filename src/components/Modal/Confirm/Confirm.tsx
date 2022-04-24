import React from 'react';

import type { ModalProps } from 'components/Modal/types.Modal';
import type { ConfirmContentProps } from 'components/Modal/Confirm/ConfirmContent/types.ConfirmContent';

import Modal from 'components/Modal/Modal';
import ConfirmContent from './ConfirmContent/ConfirmContent';

interface Props extends ModalProps, ConfirmContentProps {}

const Confirm = ({ visible, ...restProps }: Props) => (
  <Modal visible={visible}>
    <ConfirmContent
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  </Modal>
);

export default Confirm;
