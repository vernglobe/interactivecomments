import { useState, useEffect } from "react";

import "./Styles/Comment.scss";

import AddComment from "./AddComment";
import DeleteModal from "./DeleteModal";
import CommentVotes from "./CommentVotes";
import CommentHeader from "./CommentHeader";
import CommentFooter from "./CommentFooter";
import { CommentType, CommentGroupType, UpdateScoreFnType, EditCommentFnType,
   CommentPostedTimeFnType, AddReplyFnType, UserType } from "../common/constants";
import { useLocalStorage } from "../hooks/useLocalStorage";

type NewReplyFnType = (comment: CommentType) => void
type DeleteCommentFnType = (id: number, type: string) => void

type ReplyType = {
  key?: number
  currentUser?: UserType
  commentData: CommentGroupType
  commentPostedTime: CommentPostedTimeFnType
  updateScore?: UpdateScoreFnType|undefined
  addNewReply?: NewReplyFnType
  editComment?: EditCommentFnType
  deleteComment?: DeleteCommentFnType
  addReply?:AddReplyFnType
}

const Reply = ({
  commentData,
  commentPostedTime,
  updateScore,
  addNewReply,
  editComment,
  deleteComment
} : ReplyType) => {
  const [replying, setReplying] = useState(false);
  const [time, setTime] = useState("");
  const [vote, setVoted] = useLocalStorage<boolean>("voteState", false);
  const [score, setScore] = useState(commentData.score);
  const [editing, setEditing] = useState(false);
  const [content, setContent] = useState(commentData.content);
  const [deleting, setDeleting] = useState(false);

  // retrieve datetime from posted comment
  const createdAt = new Date(commentData.createdAt);
  const today = new Date();
  var differenceInTime = today.getTime() - createdAt.getTime();

  useEffect(() => {
    setTime(commentPostedTime(differenceInTime));
    //localStorage.setItem("voteState", String(vote));
  }, [differenceInTime, commentPostedTime, vote]);

  
  const addReply = (newReply: CommentType) => {
    if (addNewReply !== undefined) {
      addNewReply(newReply);
    }
    setReplying(false);
  };

  const commentContent = () => {
    const text = commentData.content.trim().split(" ");
    const firstWord = text?.shift()?.split(",");
    return !editing ? (
      <div className="comment-content">
        <span className="replyingTo">{firstWord}</span>
        {text.join(" ")}
      </div>
    ) : (
      <textarea
        className="content-edit-box"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
        }}
      />
    );
  };

  const updateComment = () => {
    if (editComment !== undefined) {
      editComment(content, commentData.id, "reply");
    }
    setEditing(false);
  };

  // delete comment
  const deleteReply = () => {
    if (deleteComment !== undefined) {
      deleteComment(commentData.id, "reply");
    }
    setDeleting(false);
  };

  return (
    <div
      className={`comment-container ${
        commentData.replies !== undefined ? "gap" : ""
      }`}
    >
      <div className="comment">
        <CommentVotes
          vote={vote}
          setVoted={setVoted}
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          commentData={commentData}
        />
        <div className="comment--body">
          <CommentHeader
            commentData={commentData}
            setReplying={setReplying}
            setDeleting={setDeleting}
            setEditing={setEditing}
            time={time}
          />

          {commentContent()}
          {editing && (
            <button className="update-btn" onClick={updateComment}>
              update
            </button>
          )}
        </div>
        <CommentFooter
          vote={vote}
          setVoted={setVoted}
          score={score}
          setScore={setScore}
          updateScore={updateScore}
          commentData={commentData}
          setReplying={setReplying}
          setDeleting={setDeleting}
          setEditing={setEditing}
        />
      </div>

      {replying && (
        <AddComment
          buttonValue={"reply"}
          addComments={addReply}
          replyingTo={commentData.user.username}
        />
      )}

      {commentData?.replies?.map((reply) => (
        <>
          <Reply
            key={reply.id}
            commentData={reply}
            commentPostedTime={commentPostedTime}
            addReply={addReply}
          />
        </>
      ))}

      {deleting && (
        <DeleteModal
          id={commentData.id}
          isShowDeleteModal = {deleting}
          setDeleting={setDeleting}
          deleteComment={deleteReply}
        />
      )}
    </div>
  );
};

export default Reply;
