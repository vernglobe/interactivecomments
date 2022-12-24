export type ImageType = {
  png: string
}

export type UserType = {
  image?: ImageType
  username?: string
  currentUser?: string
}

export type CommentType = {
  id: number
  content: string
  createdAt: string
  score: number
  user: UserType
  username?:string
  replyingTo?:string
  currentUser?: boolean
};

export type CommentGroupType = {
  id: number
  content: string
  createdAt: string
  score: number
  user: UserType
  username?:string
  currentUser?: boolean
  replies?: Array<CommentType>
};

export type DeleteFlagFnType = (isDelete: boolean) => void
export type EditFlagFnType = (isEdit: boolean) => void
export type ReplyFnType = (isReply: boolean) => void
export type UpdateScoreFnType = (score: number, id: number, type: string) => void
export type EditCommentFnType = (comment: string, id: number, style: string) => void
export type VoteFlgFnType = (isVote: boolean) => void
export type ScoreFnType = (score: number) => void
export type UpdateRepliesFnType = (replies: Array<CommentType>, id: number) => void
export type CommentDeleteFnType = (finalId: number, type: string, id:number) => void
export type DeleteFnType = (id?: number|undefined, type?: string|undefined) => void
export type CommentPostedTimeFnType = (time: number) => string
export type AddReplyFnType = (newReply: CommentType) => void

export const MIN_WINDOW_WIDTH = 752