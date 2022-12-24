import CommentBtn from "./CommentBtn";
import {CommentGroupType, DeleteFlagFnType, EditFlagFnType, ReplyFnType, UserType } from "../common/Constants";

type CommentHeaderType = {
  commentData: CommentGroupType, 
  setReplying: ReplyFnType, 
  setDeleting: DeleteFlagFnType
  setEditing: EditFlagFnType, 
  time: string
}

const CommentHeader = ({commentData, setReplying, setDeleting, setEditing, time} : CommentHeaderType) => {
  return (
    <div className="comment--header">
      <img alt={commentData.user?.username} src={commentData.user?.image?.png} width="50px" height="50px"/>
      <div className="username">{commentData.username}</div>
      {commentData.currentUser ? <div className="you-tag">YOU</div> : ""}
      <div className="comment-posted-time">{`${time} ago`}</div>
      <CommentBtn
        commentData={commentData}
        setReplying={setReplying}
        setDeleting={setDeleting}
        setEditing={setEditing}
      />
    </div>
  );
};

export default CommentHeader;
