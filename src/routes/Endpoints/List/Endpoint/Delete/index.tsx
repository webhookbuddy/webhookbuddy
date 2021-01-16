import { MouseEvent, useState } from 'react';
import { ConfirmModal } from 'react-bootstrap4-modal';
import { Endpoint, EndpointsPayload } from 'schema/types';
import { gql, useMutation } from '@apollo/client';
import { toast } from 'react-toastify';
import { GET_ENDPOINTS } from 'schema/queries';

const DELETE_ENDPOINT = gql`
  mutation DeleteEndpoint($input: DeleteEndpointInput!) {
    deleteEndpoint(input: $input) {
      affectedRows
    }
  }
`;

const Delete = ({
  endpoint,
  iconStyle,
}: {
  endpoint: Endpoint;
  iconStyle: String;
}) => {
  const [deleteEndpoint] = useMutation(DELETE_ENDPOINT, {
    variables: {
      input: {
        id: endpoint.id,
      },
    },
    update: cache => {
      const data = cache.readQuery<EndpointsPayload>({
        query: GET_ENDPOINTS,
      });

      cache.writeQuery({
        query: GET_ENDPOINTS,
        data: {
          ...data,
          endpoints: data?.endpoints.filter(
            e => e.id !== endpoint.id,
          ),
        },
      });
    },
    optimisticResponse: {
      deleteEndpoint: {
        __typename: 'DeleteEndpointPayload',
        affectedRows: 1,
      },
    },
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleClick = (e: MouseEvent<HTMLElement>) =>
    setModalIsOpen(true);

  const handleCloseModal = () => setModalIsOpen(false);

  const handleOK = () =>
    deleteEndpoint().catch(error => toast.error(error.message));

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
