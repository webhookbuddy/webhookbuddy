import useDeleteDocument from 'hooks/useDeleteDocument';
import { MouseEvent, useState } from 'react';
import { ConfirmModal } from 'react-bootstrap4-modal';
import { Endpoint } from 'types/Endpoint';

const Delete = ({
  endpoint,
  iconStyle,
}: {
  endpoint: Endpoint;
  iconStyle: String;
}) => {
  const { deleteDocument } = useDeleteDocument('endpoints');
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLElement>) =>
    setModalIsOpen(true);

  const handleCloseModal = () => setModalIsOpen(false);

  const handleOK = () => {
    deleteDocument(endpoint.id);
  };

  return (
    <>
      <i
        onClick={handleClick}
        className={`fa fa-trash pointer ${iconStyle}`}
      ></i>
      {/*
      // @ts-ignore: Legacy JSX error in ConfirmModal */}
      <ConfirmModal
        okText="Delete"
        onOK={handleOK}
        onCancel={handleCloseModal}
        onClickBackdrop={handleCloseModal}
        visible={modalIsOpen}
      >
        Are you sure you want to delete{' '}
        <strong>{endpoint.name}</strong>?
      </ConfirmModal>
    </>
  );
};

export default Delete;
