import CommentVotes from "./CommentVotes";
import CommentBtn from "./CommentBtn";
import { CommentGroupType, DeleteFlagFnType, EditFlagFnType, ReplyFnType, ScoreFnType, UpdateScoreFnType, VoteFlgFnType } from '../common/Constants'

type CommentFooterType = {
  vote: boolean,
  setVoted: VoteFlgFnType,
  score: number,
  setScore: ScoreFnType,
  updateScore: UpdateScoreFnType|undefined,
  commentData: CommentGroupType,
  setReplying: ReplyFnType,
  setDeleting: DeleteFlagFnType,
  setEditing: EditFlagFnType ,
}
const CommentFooter = ({
  vote,
  setVoted,
  score,
  setScore,
  updateScore,
  commentData,
  setReplying,
  setDeleting,
  setEditing,
} : CommentFooterType) => {
  return (
    <div className="comment--footer">
      <CommentVotes
        vote={vote}
        setVoted={setVoted}
        score={score}
        setScore={setScore}
        updateScore={updateScore}
        commentData={commentData}
      />

      <CommentBtn
        commentData={commentData}
        setReplying={setReplying}
        setDeleting={setDeleting}
        setEditing={setEditing}
      />
    </div>
  );
};

export default CommentFooter;
