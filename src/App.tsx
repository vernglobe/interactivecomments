import React, { useState, useEffect } from "react";
import "./components/Styles/App.scss";
import Comment from "./components/Comment";
import AddComment from "./components/AddComment";
import { CommentGroupType, CommentType } from "./common/Constants";
import data from './data/data.json'
import { useLocalStorage } from "./hooks/useLocalStorage";

const App = () => {
  const [comments, updateComments] = useLocalStorage<CommentGroupType[]>("comments",[]);

  const initialUpdateData = (comment: CommentGroupType | CommentType) => {
    comment.username = comment.user.username
    if (comment.user.username !== data.currentUser.username) {
      comment.currentUser = false
    } else {
      comment.currentUser = true
    }
  }
  const getData = async () => {
    //const res = await fetch("./data/data.json");
    console.log("fetch data here")
    const sourceData = data
    sourceData.comments.map((comment: any) => {
        initialUpdateData(comment)
        comment.replies?.map((reply: any) => (
          initialUpdateData(reply)
        ))
    })
    sourceData.comments.sort((a,b) => (a.score > b.score) ? 1 : ((b.score > a.score) ? -1 : 0))
    updateComments(sourceData.comments);
  };

  useEffect(() => {
    comments !== null && comments.length > 0
      ? updateComments(comments)
      : getData();
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

  let addComments = (newComment: CommentGroupType) => {
    newComment.currentUser = true
    newComment.user = data.currentUser
    let updatedComments = [...comments, newComment];
    updateComments(updatedComments);
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

  let editComment = (content: string, id: number, type: string) => {
    let updatedComments = [...comments];

    if (type === "comment") {
      updatedComments.forEach((data) => {
        if (data.id === id) {
          data.content = content;
        }
      });
    } else if (type === "reply") {
      updatedComments.forEach((comment) => {
        comment?.replies?.forEach((data) => {
          if (data.id === id) {
            data.content = content;
          }
        });
      });
    }

    updateComments(updatedComments);
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

  return (
    <main className="App">
      {comments.map((comment) => (
       <>
       <Comment
          currentUser={data.currentUser}
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
      <AddComment buttonValue={"send"} addComments={addComments} currentUser={data.currentUser}/>
    </main>
  );
};

export default App;
