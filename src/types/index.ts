export type IUser = {
  address: string;
  avatar: string;
  birthDate: Date;
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
  image: string;
  createDate: Date;
  creator: IUser;
  content: string;
  likes: [];
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

export type RequestFriendType = {};

export type NotificationType = {
  id: string;
  createDate: Date;
  content: string;
  notificationType: {
    id: string;
    code: string;
    name: string;
    description: string;
    notificationsDto: any;
  };
  owner: IUser;
  actor: IUser;
  referenceId: string;
  post: string;
};

export type CourseType = {
  id: string;
  code: string;
  name: string;
  description: string;
  userCourses: IUser[];
};

export type CourseResultType = {
  id: string;
  code: string;
  name: string;
  description: string;
};
