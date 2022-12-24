import { useEffect, useState } from "react";

import "./Styles/Comment.scss";

import AddComment from "./AddComment";
import ReplyContainer from "./ReplyContainer";
import DeleteModal from "./DeleteModal";
import CommentVotes from "./CommentVotes";
import CommentHeader from "./CommentHeader";
import CommentFooter from "./CommentFooter";

import { commentPostedTime } from "../utils";
import { CommentGroupType, UpdateScoreFnType, EditCommentFnType, UpdateRepliesFnType, CommentDeleteFnType, UserType} from "../common/Constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

type CommentType = {
  key: number
  id: number
  currentUser: UserType
  commentData: CommentGroupType
  updateScore: UpdateScoreFnType
  updateReplies: UpdateRepliesFnType
  editComment: EditCommentFnType
  commentDelete: CommentDeleteFnType
}

const Comment = ({
  key,
  id,
  currentUser,
  commentData,
  updateScore,
  updateReplies,
  editComment,
  commentDelete
} : CommentType) => {
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");
  const [vote, setVoted] = useLocalStorage<boolean>("voteState",false)
  const [score, setScore] = useState(commentData.score);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);

  // get time from comment posted
  const createdAt = new Date(commentData.createdAt);
  const today = new Date();
  const differenceInTime = today.getTime() - createdAt.getTime();

  useEffect(() => {
    setTime(commentPostedTime(differenceInTime));
    //setVoted(vote)
  }, [differenceInTime, vote]);

  const addReply = (newReply: CommentGroupType) => {
    
    if (commentData.replies !== undefined) {
      const replies = commentData.replies;
      replies.push(newReply)
      updateReplies(replies, commentData.id);
      setReplying(false);
    }
    

  };

  const updateComment = () => {
    editComment(content, commentData.id, "comment");
    setEditing(false);
  };

  const deleteComment = (id: number|undefined, type: string| undefined) => {
    const finalType = type !== undefined ? type : "comment";
    const finalId = id !== undefined ? id : commentData.id;
    commentDelete(finalId, finalType, commentData.id);
    setDeleting(false);
  };

  return (
    <div
      className={`comment-container ${
        commentData?.replies?.length !== undefined ? "reply-container-gap" : ""
      }`}
    >
      <div className="comment">
        <CommentVotes
          key={key}
          vote={vote}
          setVoted={setVoted}
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          commentData={commentData}
        />
        <div className="comment--body">
          <CommentHeader
            key={key}
            commentData={commentData}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setEditing={setEditing}
            time={time}
          />
          {!editing ? (
            <div className="comment-content">{commentData.content}</div>
          ) : (
            <textarea
              className="content-edit-box"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
              }}
            />
          )}
          {editing && (
            <button className="update-btn" onClick={updateComment}>
              update
            </button>
          )}
        </div>
        <CommentFooter
          key={key}
          vote={vote}
          setVoted={setVoted}
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          commentData={commentData}
          setReplying={setReplying}
          setDeleting={setDeleting}
          setEditing={setEditing}
        />{" "}
      </div>

      {replying && (
        <>
        <AddComment
          currentUser={currentUser}
          buttonValue={"reply"}
          addComments={addReply}
          replyingTo={commentData.username}
        />
        </>
      )}
      {commentData.replies?.length !== undefined && (
        <>
          <ReplyContainer
            key={commentData?.replies[0]?.id}
            currentUser= {currentUser}
            commentData={commentData.replies}
            updateScore={updateScore}
            commentPostedTime={commentPostedTime}
            addReply={addReply}
            editComment={editComment}
            deleteComment={deleteComment}
          />
        </>
      )}

      {deleting && (
        <DeleteModal
          id={key}
          isShowDeleteModal= {deleting}
          setDeleting={setDeleting}
          deleteComment={deleteComment}
        />
      )}
    </div>
  );
};

export default Comment;
