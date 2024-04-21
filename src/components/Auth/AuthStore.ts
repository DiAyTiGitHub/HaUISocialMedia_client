import { makeAutoObservable } from "mobx";
import { over } from "stompjs";
import SockJS from "sockjs-client";
import { toast } from "react-toastify";
import LocalStorage from "@/services/LocalStorageService";
import { registerUser, authenticateUser } from "../../services/AuthService";
import axios from "axios";
import { getCurrentLoginUser } from "@/services/UserService";
import { useNavigate } from "react-router-dom";
class AuthStore {
  constructor() {
    makeAutoObservable(this);
  }

  getLoggedInUser() {
    return LocalStorage.getLoggedInUser();
  }

  signUpUser = async (user: any) => {
    try {
      const { data } = await registerUser(user);
      toast.success("Register successfully! Please login again!");
      return data;
    } catch (error: any) {
      if (error?.response?.status === 409)
        toast.info("Username has existed, please choose another one!");
      else {
        console.error(error);
        toast.error("Registration has error occured :(");
      }
      throw new Error(error);
    }
  };

  authenticateUser = async (user: any) => {
    try {
      const { data } = await authenticateUser(user);
      const userData = data?.loggedInUser;

      toast.dismiss();
      toast.success("Login successfully!", {
        position: "top-left",
      });

      this.setSession(data?.accessToken);
      this.setUser(userData);

      this.connectToSocket();
      return data;
    } catch (error: any) {
      if (error?.response?.status === 401)
        toast.error("The username or password is incorrect!", {
          position: "top-left",
        });
      else {
        toast.error("Connection errors!", {
          position: "top-left",
        });
      }
      throw new Error(error);
    }
  };

  stompClient: any = null;

  setStompClient = (sc: any) => {
    this.stompClient = sc;
  };

  disconnectStompClient = () => {
    if (this.stompClient) this.stompClient.disconnect();
  };

  connectToSocket = async () => {
    let Sock = new SockJS("http://localhost:8000/ws");
    this.stompClient = over(Sock);
    this.stompClient.connect({}, this.onConnected, this.onError);
  };

  onConnected = () => {
    const loggedInUser = this.getLoggedInUser();

    //subscribe for channel notification
    this.stompClient.subscribe(
      "/user/" + loggedInUser?.id + "/notification",
      this.onReceivedNotification
    );
    //subscribe for channel privateMessage
    // this.stompClient.subscribe('/user/' + loggedInUser?.id + '/privateMessage', this.onReceivedNotification);
  };

  onError = (err: any) => {
    console.error(err);

    toast.error(
      "Connect to messenger error, please login again! Auto redirect in 5 seconds...",
      { autoClose: 5000 }
    );

    // setTimeout(function () {
    //     window.location.href = "/login";

    //     const navigate = useNavigate();
    //     navigate('/login');
    // }, 5000);
  };

  onReceivedNotification = (payload: any) => {
    const payloadData = JSON.parse(payload.body);
    console.log("notification: ", payloadData);
    toast.info(payloadData?.content);
  };

  logout = () => {
    this.setSession(null);
    this.removeUser();
    window.location.href = "/login";
  };

  setSession(token: any) {
    if (token) {
      LocalStorage.setItem("jwt_token", token);

      //add field to compatible with Thanh Thuan code
      localStorage.setItem("token", token);

      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    } else {
      LocalStorage.removeItem("jwt_token");

      //add field to compatible with Thanh Thuan code
      localStorage.removeItem("token");

      delete axios.defaults.headers.common["Authorization"];
    }
  }

  loadCurrentUserByApi = async () => {
    // debugger
    try {
      const { data } = await getCurrentLoginUser();

      this.setUser(data);
    } catch (error: any) {
      console.error(error);
      toast.error(
        "Có lỗi xảy ra khi tải dữ liệu người dùng, vui lòng thử lại sau"
      );
    }
  };

  setUser = (user: any) => {
    LocalStorage.setItem("auth_user", user);
    //add field to compatible with Thanh Thuan code
    localStorage.setItem("user", user);
  };
  removeUser = () => {
    LocalStorage.removeItem("auth_user");
    //add field to compatible with Thanh Thuan code
    localStorage.removeItem("user");
  };

  getAllClaimsFromJwt = (token: any) => {
    if (!token) {
      console.error("No valid token!");
      return;
    }

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  };
}

export default AuthStore;
