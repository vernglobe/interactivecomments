import { ReactComponent as IconReply } from "../images/icons/icon-reply.svg";
import { ReactComponent as IconDelete } from "../images/icons/icon-delete.svg";
import { ReactComponent as IconEdit } from "../images/icons/icon-edit.svg";
import { CommentType, DeleteFlagFnType, EditFlagFnType, ReplyFnType } from  '../common/constants'

type CommentBtnType = {
  commentData: CommentType
  setReplying: ReplyFnType
  setDeleting: DeleteFlagFnType
  setEditing: EditFlagFnType
}
  
const CommentBtn = ({commentData, setReplying, setDeleting, setEditing} : CommentBtnType) => {

  let counter = false;
  const showAddComment = () => {
    counter ? setReplying(false) : setReplying(true);
    counter = true;
  };

  const showDeleteModal = () => {
    setDeleting(true);
  };

  const showEditComment = () => {
    setEditing(true);
  };

  return (
    <div className="comment--btn">
      {
        (!commentData.currentUser)? (
          <button data-testid="replybtn"
            className={`reply-btn`}
            onClick={showAddComment}
          >
            <IconReply /> Reply
          </button>
        ):""
      }
      { commentData.currentUser? (
        <>
          <button data-testid="deletebtn"
            className={`delete-btn ${
              commentData.currentUser ? "" : "display--none"
            }`}
            onClick={showDeleteModal}
          >
            <IconDelete /> Delete
          </button>
          <button data-testid="editbtn"
            className={`edit-btn ${commentData.currentUser ? "" : "display--none"}`}
            onClick={showEditComment}>
            <IconEdit /> Edit
          </button>
        </>
      ): ""
    }
    </div>
  );
};

export default CommentBtn;
 