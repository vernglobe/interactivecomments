import { DeleteFlagFnType, DeleteFnType, MIN_WINDOW_WIDTH } from  '../common/Constants'
import { Button, Modal } from 'react-bootstrap'
import { useWindowSize } from '../hooks/useWindowSize'

type DeleteModalType = {
  id?: number
  isShowDeleteModal?:boolean
  setDeleting: DeleteFlagFnType
  deleteComment: DeleteFnType
}

const DeleteModal = ({id, isShowDeleteModal, setDeleting, deleteComment } : DeleteModalType) => {
  const windowSize = useWindowSize()
  const cancelDelete = () => {
    setDeleting(false);
  };

  const initDelete = () => {
    deleteComment();
  };

  return (
    <Modal show={isShowDeleteModal}
      size={windowSize.width >= MIN_WINDOW_WIDTH?"lg": "sm"}
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header className='border-0 fs-5'>Delete comment</Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this comment? This will remove the
          comment and can't be undone.
        </Modal.Body>
        <Modal.Footer className='border-0 d-block text-center'>
          <Button variant='secondary' onClick={cancelDelete}>
            NO, CANCEL
          </Button>
          <Button variant='danger' onClick={initDelete}>
            YES, DELETE
          </Button>
        </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
