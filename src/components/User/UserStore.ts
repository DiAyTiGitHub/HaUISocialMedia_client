import {
  getUserByIdRequest,
  pagingSuggestFriend,
  updateUserRequest,
  getAllUsers
} from "@/services/UserService";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class UserStore {
  currentFriends: any = null;
  pagingCurrentFriend: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  getSuggestFriend = async (searchObject: any) => {
    try {
      const { data } = await pagingSuggestFriend(searchObject);
      this.pagingCurrentFriend = data;
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };

  getUserById = async (userId: string) => {
    try {
      const { data } = await getUserByIdRequest(userId);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };

  updateUser = async (fromData: any) => {
    try {
      const { data } = await updateUserRequest(fromData);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
  getAllUsers = async () => {
    try {
      const { data } = await getAllUsers();
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
}

export default UserStore;
