import React, { useState } from 'react';
import { render, screen, fireEvent } from "@testing-library/react";
import CommentVotes from "../components/CommentVotes";

describe("test CommentVotes component", () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test("upvote the comment success when vote not yet happened.", () => {
    const mockCommentData = {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "2022-04-10T13:49:51.141Z",
      "score": 12,
      "user": {
        "image": { 
          "png": "./images/avatars/leiaskywalker.png"
        },
        "username": "leiaskywalker"
      },
      "replies": []
    }
    const spy = jest.spyOn(console, "debug")

    render(<CommentVotes 
      vote={false} 
      setVoted={jest.fn()}
      score= {mockCommentData.score}
      setScore = {jest.fn()}
      updateScore = {jest.fn()}
      commentData={mockCommentData}/>)
  
      const upvote = screen.getByTestId("upvote")
  
      fireEvent.click(upvote)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(13)
  });

  test("downvote the comment success when vote is happened.", () => {
    const mockCommentData = {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "2022-04-10T13:49:51.141Z",
      "score": 12,
      "user": {
        "image": { 
          "png": "./images/avatars/leiaskywalker.png"
        },
        "username": "leiaskywalker"
      },
      "replies": []
    }
    const spy = jest.spyOn(console, "debug")

    render(<CommentVotes 
      vote={true} 
      setVoted={jest.fn()}
      score= {mockCommentData.score}
      setScore = {jest.fn()}
      updateScore = {jest.fn()}
      commentData={mockCommentData}/>)
  
      const downvote = screen.getByTestId("downvote")
  
      fireEvent.click(downvote)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(11)
  });

  test("upvote the comment success when vote not yet happened and updateScore is undefined.", () => {
    const mockCommentData = {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "2022-04-10T13:49:51.141Z",
      "score": 12,
      "user": {
        "image": { 
          "png": "./images/avatars/leiaskywalker.png"
        },
        "username": "leiaskywalker"
      },
      "replies": []
    }
    const spy = jest.spyOn(console, "debug")

    render(<CommentVotes 
      vote={false} 
      setVoted={jest.fn()}
      score= {mockCommentData.score}
      setScore = {jest.fn()}
      updateScore = {undefined}
      commentData={mockCommentData}/>)
  
      const upvote = screen.getByTestId("upvote")
  
      fireEvent.click(upvote)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(13)
  });

  test("downvote the comment success when vote is happened and updateScore is undefined.", () => {
    const mockCommentData = {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "2022-04-10T13:49:51.141Z",
      "score": 12,
      "user": {
        "image": { 
          "png": "./images/avatars/leiaskywalker.png"
        },
        "username": "leiaskywalker"
      },
      "replies": []
    }
    const spy = jest.spyOn(console, "debug")

    render(<CommentVotes 
      vote={true} 
      setVoted={jest.fn()}
      score= {mockCommentData.score}
      setScore = {jest.fn()}
      updateScore = {undefined}
      commentData={mockCommentData}/>)
  
      const downvote = screen.getByTestId("downvote")
  
      fireEvent.click(downvote)
      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(11)
  });

  test("upvote the comment failed when vote is already happened.", () => {
    const mockCommentData = {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "2022-04-10T13:49:51.141Z",
      "score": 12,
      "user": {
        "image": { 
          "png": "./images/avatars/leiaskywalker.png"
        },
        "username": "leiaskywalker"
      },
      "replies": []
    }
    const spy = jest.spyOn(console, "debug")

    render(<CommentVotes 
      vote={true} 
      setVoted={jest.fn()}
      score= {mockCommentData.score}
      setScore = {jest.fn()}
      updateScore = {jest.fn()}
      commentData={mockCommentData}/>)
  
      const upvote = screen.getByTestId("upvote")
  
      fireEvent.click(upvote)
      expect(spy).toHaveBeenCalledTimes(0)
  });

  test("downvote the comment failed when vote is not happened.", () => {
    const mockCommentData = {
      "id": 1,
      "content": "Impressive! Though it seems the drag feature could be improved. But overall it looks incredible. You've nailed the design and the responsiveness at various breakpoints works really well.",
      "createdAt": "2022-04-10T13:49:51.141Z",
      "score": 12,
      "user": {
        "image": { 
          "png": "./images/avatars/leiaskywalker.png"
        },
        "username": "leiaskywalker"
      },
      "replies": []
    }
    const spy = jest.spyOn(console, "debug")

    render(<CommentVotes 
      vote={false} 
      setVoted={jest.fn()}
      score= {mockCommentData.score}
      setScore = {jest.fn()}
      updateScore = {jest.fn()}
      commentData={mockCommentData}/>)
  
      const downvote = screen.getByTestId("downvote")
  
      fireEvent.click(downvote)
      expect(spy).toHaveBeenCalledTimes(0)
  });
})