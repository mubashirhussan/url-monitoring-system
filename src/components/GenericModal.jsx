import React from "react";
import { Modal } from "antd";

// Generic Modal Component
const GenericModal = ({
  title,
  visible,
  setVisible,

  onCancel,
  children,
}) => {
  const handleCancel = () => {
    if (onCancel) onCancel();
    setVisible(false);
  };

  return (
    <Modal title={title} open={visible} footer={null} onCancel={handleCancel}>
      {children}
    </Modal>
  );
};
export default GenericModal;
