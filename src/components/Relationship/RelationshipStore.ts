import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import {
  pagingCurrentFriends,
  getAllCurrentFriends,
  pagingPendingFriendRequests,
  acceptFriendRequest,
  sendAddFriendRequest,
  unAcceptFriendRequest,
  unFriendRequest,
} from "@/services/RelationshipService";

class RelationshipStore {
  currentFriends: any = null;
  pagingCurrentFriend: any = null;

  constructor() {
    makeAutoObservable(this);
  }

  getAllFriends = async () => {
    try {
      const { data } = await getAllCurrentFriends();

      this.currentFriends = data;

      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };

  getCurrentFriend = async (searchObject: any) => {
    try {
      const { data } = await pagingCurrentFriends(searchObject);
      this.pagingCurrentFriend = data;
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };

  getPendingFriendRequests = async (searchObject: any) => {
    try {
      const { data } = await pagingPendingFriendRequests(searchObject);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
  acceptFriend = async (relationshipId: string) => {
    try {
      const { data } = await acceptFriendRequest(relationshipId);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };

  addFriend = async (receiverId: string) => {
    try {
      const { data } = await sendAddFriendRequest(receiverId);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
  unAcceptFriend = async (relationshipId: string) => {
    try {
      const { data } = await unAcceptFriendRequest(relationshipId);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
  unFriend = async (relationshipId: string) => {
    try {
      const { data } = await unFriendRequest(relationshipId);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
}

export default RelationshipStore;
