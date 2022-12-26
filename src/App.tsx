import React, { useEffect } from "react";
import "./components/Styles/App.scss";
import Comment from "./components/Comment";
import AddComment from "./components/AddComment";
import { CommentGroupType, CommentType, currentUser } from "./common/constants";
import data from './data/data.json'
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getAllCommentsFromDb, addCommentsIntoDb, updateCommentsIntoDb } from "./services/interactivecomment-api";
import Logger from "@vernglobe/logger";

const logger = new Logger("App");

const updateCommentWithCurrentUserAttr = (comments: Array<CommentGroupType>) => {
  comments.map ( comment => {
    if (comment.user.username === currentUser.username) {
      comment.currentUser = true;
    } else {
      comment.currentUser = false;
    }
    comment.replies?.map (reply => {
      if (reply.user.username === currentUser.username) {
        reply.currentUser = true;
      }
    })
  })
};

const App = () => {
  const [comments, updateComments] = useLocalStorage<CommentGroupType[]>("comments",[]);

  const getData = async () => {
    logger.info("retrieve all comments from database");
    const resp = await getAllCommentsFromDb();
    const sourceData = resp.data;    
    if (sourceData.length > 1) {
      sourceData.sort((a: any,b: any) => (a.score < b.score) ? 1 : -1);
    }
    
    updateComments(sourceData);
  };

  useEffect(() => {
    comments !== null && comments.length > 0
      ? updateComments(comments)
      : getData();
      getData();
  }, []);

  useEffect(() => {
    updateComments(comments);
  }, [comments]);

  let updateScore = (score: number, id: number, type: string) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.score = score;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment?.replies?.forEach((data) => {
          if (data.id === id) {
            data.score = score;
          }
        });
      });
    }
    updateComments(updatedComments);
  };

  let addComments = async (newComment: CommentGroupType) => {
    newComment.currentUser = true
    newComment.user = data.currentUser
    let updatedComments = [...comments, newComment];
    updateComments(updatedComments);
    await addCommentsIntoDb(newComment);
  };

  let updateReplies = (replies: Array<CommentType>, id: number) => {
    let updatedComments = [...comments];
    updatedComments.forEach((data) => {
      if (data.id === id) {
        data.replies = [...replies];
      }
    });
    updateComments(updatedComments);
  };

  let editComment = async (content: string, id: number, type: string) => {
    let updatedComments = [...comments];
    let score = 0;
    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.content = content;
          score = data.score;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment?.replies?.forEach((data) => {
          if (data.id === id) {
            data.content = content;
            score = data.score;
          }
        });
      });
    }

    updateComments(updatedComments);
    await updateCommentsIntoDb(id, content, score);
  };


  let commentDelete = (id: number, type: string, parentComment: number) => {
    let updatedComments = [...comments];
    let updatedReplies: Array<CommentType>| undefined;

    if (type === "comment") {
      updatedComments = updatedComments.filter((data) => data.id !== id);
    } else if (type === "reply") {
      comments.forEach((comment) => {
        if (comment.id === parentComment) {
          updatedReplies = comment?.replies?.filter((data) => data.id !== id);
          comment.replies = updatedReplies;
        }
      });
    }

    updateComments(updatedComments);
  };

  updateCommentWithCurrentUserAttr(comments);

  return (
    <main className="App">
      {comments.map((comment) => (
       <>
       {  }
       <Comment
          key={comment.id}
          id={comment.id}
          commentData={comment}
          updateScore={updateScore}
          updateReplies={updateReplies}
          editComment={editComment}
          commentDelete={commentDelete}
        />
       </>
      ))}
      <AddComment buttonValue={"send"} addComments={addComments}/>
    </main>
  );
};

export default App;
