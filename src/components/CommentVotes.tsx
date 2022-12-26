import { ReactComponent as IconPlus } from "../images/icons/icon-plus.svg";
import { ReactComponent as IconMinus } from "../images/icons/icon-minus.svg";
import { CommentType, UpdateScoreFnType, VoteFlgFnType, ScoreFnType } from "../common/constants";

type CommentVotesType = {
  vote: boolean
  setVoted: VoteFlgFnType
  score: number
  setScore: ScoreFnType
  updateScore: UpdateScoreFnType|undefined
  commentData: CommentType
}

const CommentVotes = ({
  vote,
  setVoted,
  score,
  setScore,
  updateScore,
  commentData,
} : CommentVotesType) => {

  let upVote = () => {
    if (vote === false) {
      let n = score + 1;
      console.debug(n)
      setScore(n);
      if (updateScore !== undefined) {
        updateScore(n, commentData.id, "reply");
      }
      
      setVoted(true);
    }
  };

  let downVote = () => {
    if (vote === true) {
      let n = score - 1;
      if (n < 0) {
        n = 0
      }
      console.debug(n)
      setScore(n);
      if (updateScore !== undefined) {
        updateScore(n, commentData.id, "reply");
      }
      setVoted(false);
    }
  };

  return (
    <div className="comment--votes">
      <button data-testid="upvote" className="plus-btn" onClick={upVote} aria-label="plus-btn">
        <IconPlus />
      </button>
      <div data-testid="score" className="votes-counter">{score}</div>
      <button data-testid="downvote" className="minus-btn" onClick={downVote} aria-label="minus-btn">
        <IconMinus />
      </button>
    </div>
  );
};

export default CommentVotes;
