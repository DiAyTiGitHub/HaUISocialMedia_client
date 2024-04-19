import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import {
  pagingCurrentFriends,
  getAllCurrentFriends,
} from "@/services/RelationshipService";

class RelationshipStore {
  currentFriends: any = null;

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
}

export default RelationshipStore;
