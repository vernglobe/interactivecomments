import { AddReplyFnType, CommentGroupType, CommentPostedTimeFnType, CommentType, DeleteFnType, EditCommentFnType, UpdateScoreFnType, UserType } from "../common/Constants";
import Reply from "./Reply";

type ReplyContainerType = {
  currentUser: UserType
  commentData: Array<CommentGroupType>
  updateScore: UpdateScoreFnType
  commentPostedTime: CommentPostedTimeFnType
  addReply: AddReplyFnType,
  editComment: EditCommentFnType,
  deleteComment: DeleteFnType
}

const ReplyContainer = ({
  currentUser,
  commentData,
  updateScore,
  commentPostedTime,
  addReply,
  editComment,
  deleteComment
} : ReplyContainerType) => {
  return (
    <div className="reply-container">
      {commentData.map((data: CommentType) => (
        <Reply
          key={data.id}
          currentUser={currentUser}
          commentData={data}
          updateScore={updateScore}
          commentPostedTime={commentPostedTime}
          addNewReply={addReply}
          editComment={editComment}
          deleteComment={deleteComment}
        />
      ))}
    </div>
  );
};

export default ReplyContainer;
