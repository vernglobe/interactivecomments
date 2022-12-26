import axios from "axios";
import { CommentGroupType, HEADERS, URL_INTERACTIVE_COMMENT_ENGINE } from "../common/constants";

const getAllCommentsFromDb = async () => {
  const urlpath = `${URL_INTERACTIVE_COMMENT_ENGINE}`;
  const resp = await axios( { 
    method: "GET",
    url: urlpath, 
    headers: HEADERS,
  });
  return resp;
};

const addCommentsIntoDb = async (newComment: CommentGroupType) => {
  const urlpath = `${URL_INTERACTIVE_COMMENT_ENGINE}`;
  const resp = await axios( { 
    method: "POST",
    url: urlpath, 
    headers: HEADERS,
    data: {
      newComment: newComment
    }
  });
  return resp;
};

const deleteCommentsFromDb = async (id: number) => {
  const urlpath = `${URL_INTERACTIVE_COMMENT_ENGINE}/${id}`;
  const resp = await axios( { 
    method: "DELETE",
    url: urlpath, 
    headers: HEADERS,
  });
  return resp;
};

const addNewReplyIntoDb = async (newComment: CommentGroupType, parentId: number) => {
  const urlpath = `${URL_INTERACTIVE_COMMENT_ENGINE}`;
  const resp = await axios( { 
    method: "POST",
    url: urlpath, 
    headers: HEADERS,
    data: {
      newComment: newComment,
      parentId: parentId
    }
  });
  return resp;
};

const updateCommentsIntoDb = async (id: number, content: string, score: number) => {
  const urlpath = `${URL_INTERACTIVE_COMMENT_ENGINE}/${id}`;
  const resp = await axios( { 
    method: "POST",
    url: urlpath, 
    headers: HEADERS,
    data: {
      content: content,
      score: score
    }
  });
  return resp;
};

export { getAllCommentsFromDb, addCommentsIntoDb, deleteCommentsFromDb, addNewReplyIntoDb, updateCommentsIntoDb};