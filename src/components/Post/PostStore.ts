import {
  createPostRequest,
  deletePostRequest,
  getById,
  pagingNewsFeed,
  pagingPostsOfUser,
  updatePostRequest,
} from "@/services/PostService";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class PostStore {
  constructor() {
    makeAutoObservable(this);
  }

  getNewFeed = async (searchObject: any) => {
    try {
      const { data } = await pagingNewsFeed(searchObject);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };

  getPostById = async (postId: string) => {
    try {
      const { data } = await getById(postId);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };

  getPostOfUser = async (searchObject: any, userId: string) => {
    try {
      const { data } = await pagingPostsOfUser({
        searchObject: searchObject,
        userId: userId,
      });
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };

  createPost = async (formData: any) => {
    try {
      const { data } = await createPostRequest(formData);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };

  updatePost = async (formData: any) => {
    try {
      const { data } = await updatePostRequest(formData);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };

  deletePost = async (postId: string) => {
    try {
      const { data } = await deletePostRequest(postId);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
}

export default PostStore;
