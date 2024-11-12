"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";

const UploadModal = () => {
  // useUploadModal hook
  const uploadModal = useUploadModal();

  // create custom on change
  const onChange = (open: boolean) => {
    if (!open) {
      // Reset the form
      uploadModal.onClose(); 
    }
  };

  return (
    // we have to make this dynamic , don't try to hard code it
    <Modal
      title="Upload modal title"
      description="Upload modal description"
      isOpen={uploadModal.isOpen}
      OnChange={onChange}
    >
      Upload Content
    </Modal>
  );
};

export default UploadModal;
