import { makeAutoObservable } from "mobx";
import { toast } from "react-toastify";
import { over } from "stompjs";
import SockJS from "sockjs-client";
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

class ChatStore {
  isLoading: boolean = true;

  setIsLoading = (state: boolean) => {
    if (this.isLoading != state)
      this.isLoading = state;
  }

  stompClient: any = null;

  setStompClient = (stompClient: any) => {
    this.stompClient = stompClient;
  };

  constructor() {
    makeAutoObservable(this);
  }

  sendMessage = (messageContent: string) => {
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

      this?.stompClient?.send(
        "/messenger/privateMessage",
        {},
        JSON.stringify(chatMessage)
      );

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





  registerUser = () => {
    if (this.stompClient) return;
    this.connect();
  };

  resetStore = () => {
    if (this.stompClient)
      this.stompClient = null;

    this.joinedRooms = [];
    this.chosenRoom = null;
  }

  connect = () => {
    let Sock = new SockJS("http://localhost:8000/ws");
    this.stompClient = over(Sock);
    this.stompClient.connect({}, this.onConnected, this.onError);
  };

  onConnected = () => {
    const currenUser = LocalStorage.getLoggedInUser();
    this.stompClient.subscribe(
      "/user/" + currenUser.id + "/privateMessage",
      this.onReceiveRoomMessage
    );
  };

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
    if (!this.stompClient) {
      toast.error(
        "You haven't connected to chat server! Please login again!"
      );
      return;
    }

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
      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        return;
      }

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
      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        this.setIsLoading(false);
        return;
      }

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

      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        this.setIsLoading(false);
        return;
      }

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

      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        this.setIsLoading(false);
        return;
      }

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

      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        this.setIsLoading(false);
        return;
      }

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
      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        return;
      }

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

      if (!this.stompClient) {
        toast.error(
          "You haven't connected to chat server! Please login again!"
        );
        this.setIsLoading(false);
        return;
      }

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
