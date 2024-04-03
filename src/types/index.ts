export type IUser = {
  address: string;
  avatar: string;
  birthDate: string;
  classroomDto: string;
  code: string;
  email: string;
  firstName: string;
  gender: boolean;
  id: string;
  lastName: string;
  password: string;
  phoneNumber: string;
  role: string;
  username: string;
};

export type IPost = {
  id: string;
  comments: [];
  createDate: Date;
  creator: IUser;
  content: string;
  like: [];
};

export type IComment = {
  commenter: IUser;
  content: string;
  createDate: Date;
  id: string;
  numsOfSubComments: number;
  post: IPost;
  repliedComment: any;
};
