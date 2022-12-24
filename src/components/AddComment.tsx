import { useState } from "react";
import "./Styles/AddComment.scss";
import { MIN_WINDOW_WIDTH, UserType } from "../common/Constants";
import { useWindowSize } from "../hooks/useWindowSize";

type AddCommentType = {
  currentUser?: UserType
  buttonValue: string
  addComments: any
  replyingTo?: string
}
const AddComment = ({ currentUser, buttonValue, addComments, replyingTo }: AddCommentType) => {
  const replyingToUser = replyingTo ? `@${replyingTo}, ` : "";
  const [comment, setComment] = useState("");
  const windowSize = useWindowSize()
  const clickHandler = () => {
    if (comment === "" || comment === " ") return;
    const newComment = {
      id: Math.floor(Math.random() * 100) + 5,
      content: replyingToUser + comment,
      user: currentUser,
      currentUser: true,
      createdAt: new Date(),
      score: 0,
      replies: [],
    };

    addComments(newComment);
    setComment("");
  };
  
  return (
    <div className="add-comment">
      { windowSize.width >=  MIN_WINDOW_WIDTH?
        (<img alt={currentUser?.username} src={currentUser?.image?.png} width="50px" height="50px"/>):""}
      <textarea
        className="comment-input"
        placeholder="Add a comment..."
        value={replyingToUser + comment}
        onChange={(e) => {
          setComment(
            e.target.value.replace(replyingTo ? `@${replyingTo}, ` : "", "")
          );
        }}
      />
      <div className="send-btn-container">
        { windowSize.width <  MIN_WINDOW_WIDTH?
          (<img alt={currentUser?.username} src={currentUser?.image?.png} width="50px" height="50px"/>):""}
      
        <button className="add-btn" onClick={clickHandler}>
          {buttonValue}
        </button>
      </div>
    </div>
  );
};

export default AddComment;
