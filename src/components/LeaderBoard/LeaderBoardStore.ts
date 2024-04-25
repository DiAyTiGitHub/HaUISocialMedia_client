import { getLeadingDashBoardRequest } from "@/services/LeaderBoardService";
import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";

class LeaderBoardStore {
  constructor() {
    makeAutoObservable(this);
  }

  getLeadingDashBoard = async (searchObject: any) => {
    try {
      const { data } = await getLeadingDashBoardRequest(searchObject);
      return data;
    } catch (error) {
      toast.error("Something went wrong :(");
    }
  };
}

export default LeaderBoardStore;
