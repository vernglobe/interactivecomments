import { render, screen, fireEvent } from "@testing-library/react";
import CommentBtn from "../components/CommentBtn";

describe('test CommentBtn component', () => { 
  afterEach(() => {
    jest.restoreAllMocks()
  })

  test("show button reply when comment is not belong to current user", () => {
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
      "currentUser": false,
      "replies": []
    }

    render(<CommentBtn 
      commentData={mockCommentData}
      setReplying={jest.fn()}
      setDeleting={jest.fn()}
      setEditing={jest.fn()}/>)
  
      const replyBtn = screen.getByTestId("replybtn")
      const deleteBtn = screen.queryByTestId("deletebtn")
      const editBtn = screen.queryByTestId("editbtn")

      fireEvent.click(replyBtn)
      expect(replyBtn).not.toBeNull()
      expect(deleteBtn).toBeNull()
      expect(editBtn).toBeNull()
  });

  test("show button delete and edit when comment is belong to current user", () => {
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
      "currentUser": true,
      "replies": []
    }

    render(<CommentBtn 
      commentData={mockCommentData}
      setReplying={jest.fn()}
      setDeleting={jest.fn()}
      setEditing={jest.fn()}/>)
  
      const replyBtn = screen.queryByTestId("replybtn")
      const deleteBtn = screen.getByTestId("deletebtn")
      const editBtn = screen.getByTestId("editbtn")
      
      fireEvent.click(deleteBtn)
      fireEvent.click(editBtn)

      expect(replyBtn).toBeNull()
      expect(deleteBtn).not.toBeNull()
      expect(editBtn).not.toBeNull()
  });
})