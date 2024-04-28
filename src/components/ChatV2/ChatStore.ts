import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import LocalStorage from "@/services/LocalStorageService";
import {
  searchJoinedRooms,
  createGroupChat,
  updateRoomInfo,
  unjoinAnGroupChat,
  addSingleUserIntoGroupChat,
  getListFriendNotInRoom,
  addMultipleUsersIntoGroupChat,
  getAllJoinedRooms
} from "@/services/RoomService";
import { sendMessage } from "@/services/MessageService";

class ChatStore {
  isLoading: boolean = true;

  setIsLoading = (state: boolean) => {
    if (this.isLoading != state)
      this.isLoading = state;
  }

  constructor() {
    makeAutoObservable(this);
  }

  sendMessage = async (messageContent: string) => {
    if (!messageContent || messageContent.length === 0 || messageContent.trim().length <= 0) {
      return;
    }
    try {
      const currentUser = LocalStorage.getLoggedInUser();

      const chatMessage = {
        content: (messageContent),
        room: { id: this?.chosenRoom?.id },
        messageType: { name: "chat" },
        user: currentUser,
      };
      console.log("msg content: " + (messageContent));

      //send message via stompclient
      // this?.stompClient?.send(
      //   "/messenger/privateMessage",
      //   {},
      //   JSON.stringify(chatMessage)
      // );


      //send message via api
      const { data: sentMessage } = await sendMessage(chatMessage);
      console.log("sent message: ", sentMessage);

    } catch (err: any) {
      if (err?.response?.status === 401)
        toast.error("You don't have permission to access this conversation anymore :(");
      else {
        console.log(err);
        toast.error("Error occured when sending message, please try again :(");
      }
      throw new Error(err);
    }
  };






  resetStore = () => {
    this.joinedRooms = [];
    this.chosenRoom = null;
  }

  onReceiveRoomMessage = (payload: any) => {
    const payloadData = JSON.parse(payload.body);
    const roomId = payloadData?.room?.id;
    if (!roomId) {
      toast.error("Received message errors!");
      return;
    }

    let isExisted: any = null;
    for (let i = 0; i < this.joinedRooms.length; i++) {
      const currentRoom = this.joinedRooms[i];
      if (currentRoom?.id === roomId) {
        if (!currentRoom.messages) currentRoom.messages = [];
        currentRoom.messages.push(payloadData);
        this.joinedRooms[i] = { ...currentRoom };
        isExisted = i;

        if (currentRoom?.id === this?.chosenRoom?.id) {
          this.chosenRoom = { ...currentRoom };
        }
      }
    }

    if (isExisted || isExisted == 0) {
      const temp = this.joinedRooms[isExisted];
      for (let i = isExisted; i >= 1; i--) {
        this.joinedRooms[i] = this.joinedRooms[i - 1];
      }
      this.joinedRooms[0] = temp;
      this.joinedRooms = [...this.joinedRooms];
    } else {
      const newRoom = payloadData.room;
      const firstMessage = {
        ...payloadData,
        room: null
      };
      newRoom.messages = [firstMessage];
      this.joinedRooms.unshift(newRoom);
      this.joinedRooms = [...this.joinedRooms];
    }
  };

  onError = (err: any) => {
    console.log(err);
    toast.error("Connect to chat server error, please try again!");
  };

  chosenRoom: any = null;
  setChosenRoom = (chosenRoom: any) => {
    this.chosenRoom = chosenRoom;
  };

  joinedRooms: any = [];
  getAllJoinedRooms = async () => {
    this.joinedRooms = [];
    this.chosenRoom = null;

    try {

      const { data } = await getAllJoinedRooms();
      this.joinedRooms = data;
      this.chosenRoom = data[0];

    } catch (error) {
      console.log(error);
      toast.error("Load conversation fail, please try again!");
    }
  };

  searchJoinedRooms = async (keyword: string) => {
    try {
      const searchObject = {
        keyword: keyword,
      };
      const { data } = await searchJoinedRooms(searchObject);
      this.joinedRooms = data;
    } catch (err: any) {
      console.log(err);
      toast.error("Find conversation errors :( Please try again!");
      throw new Error(err);
    }
  };

  createGroupChat = async (room: any) => {
    toast.info("Please wait, we're handling your request!");
    try {
      this.setIsLoading(true);
      const { data } = await createGroupChat(room);
      // console.log("new group chat: ", data);
      await this.getAllJoinedRooms();

      this.setIsLoading(false);
      return data;
    } catch (err: any) {
      console.log(err);
      toast.error("Create new group chat fail, please try again!");
      throw new Error(err);
    }
  }

  updateRoomInfo = async (room: any) => {

    try {
      this.setIsLoading(true);

      const incomingRoom = { ...this.chosenRoom };

      if (room?.color) incomingRoom.color = room.color;
      if (room?.name) incomingRoom.name = room.name;
      if (room?.description) incomingRoom.description = room.description;

      const { data } = await updateRoomInfo(incomingRoom);

      await this.getAllJoinedRooms();

      console.log("updated group chat: ", data);

      // await this.getAllJoinedRooms();
      this.setIsLoading(false);

      return data;
    } catch (err: any) {
      console.log(err);
      this.setIsLoading(false);
      toast.error("Update this conversation info fail, please try again!");
      throw new Error(err);
    }
  }

  leaveConversation = async () => {
    try {
      this.setIsLoading(true);

      const { data } = await unjoinAnGroupChat(this.chosenRoom?.id);

      console.log("updated group chat: ", data);

      await this.getAllJoinedRooms();
      this.setIsLoading(false);

      return data;
    } catch (err: any) {
      console.log(err);
      this.setIsLoading(false);
      toast.error("Update this conversation info fail, please try again!");
      throw new Error(err);
    }
  }

  addNewParticipant = async (userId: string) => {
    try {
      this.setIsLoading(true);

      const { data } = await addSingleUserIntoGroupChat(userId, this.chosenRoom?.id);

      console.log("updated group chat: ", data);

      await this.getAllJoinedRooms();
      this.setIsLoading(false);

      return data;
    } catch (err: any) {
      console.log(err);
      this.setIsLoading(false);
      toast.error("Update this conversation info fail, please try again!");
      throw new Error(err);
    }
  }

  notJoinedFriends: any = [];
  getListFriendNotInRoom = async () => {
    try {
      const { data } = await getListFriendNotInRoom(this.chosenRoom?.id);

      this.notJoinedFriends = data;

      return data;
    } catch (err: any) {
      console.log(err);
      toast.error("Cannot get list unjoined friends, please try again!");
      throw new Error(err);
    }
  }

  addMultipleUsersIntoGroupChat = async (userIds: any) => {
    try {
      this.setIsLoading(true);

      const { data } = await addMultipleUsersIntoGroupChat(userIds, this.chosenRoom?.id);

      await this.getAllJoinedRooms();
      this.setIsLoading(false);

      return data;
    } catch (err: any) {
      console.log(err);
      this.setIsLoading(false);
      toast.error("Update this conversation info fail, please try again!");
      throw new Error(err);
    }
  }

  uploadRoomAvatar = async (image: any) => {
    try {
      this.setIsLoading(true);



      this.setIsLoading(false);

      return null;
    } catch (error: any) {
      this.setIsLoading(false);
      console.error('Error updating user info in AccountStore:', error);
      // Xử lý lỗi nếu cần thiết
      throw error;
    }
  }

  getAvatarSrc = async (avatarUrl: string) => {
    if (!avatarUrl) return;

    try {

      return null;
    } catch (error: any) {
      console.error('Error getting avatar:', error);
      // Handle errors as needed
    }
  }
}

export default ChatStore;




