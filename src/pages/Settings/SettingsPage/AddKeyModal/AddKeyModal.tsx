import React from 'react';

import type { IAddKeyModalContentProps } from 'pages/Settings/SettingsPage/AddKeyModal/AddKeyModalContent/types.AddKeyModalContent';

import Modal from 'components/Modal/Modal';
import AddKeyModalContent from './AddKeyModalContent/AddKeyModalContent';

interface Props extends IAddKeyModalContentProps {
  visible: boolean;
}

const AddKeyModal = ({ visible, onClose }: Props) => (
  <Modal visible={visible}>
    <AddKeyModalContent onClose={onClose} />
  </Modal>
);

export default AddKeyModal;
