export interface IComment {
  commentId: number;
  userId: number;
  content: string;
  created: string;
  nickname: string;
  imageType: number;
}

interface ITag {
  tagId: number;
  tagName: string;
}

export interface IPostData {
  postId: number;
  imageUrl: string;
  nickname: string;
  title: string;
  created: string;
  category: string;
  content: string;
  voteCount: number;
  option1: string;
  option1Count: number;
  option2: string;
  option2Count: number;
  tags: ITag[];
  commentCount: number;
  comments: IComment[];
  selectedOption: string;
  imageType: number;
}
