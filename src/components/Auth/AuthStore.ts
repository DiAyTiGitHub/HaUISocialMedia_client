import { makeAutoObservable } from 'mobx';
import { over } from 'stompjs';
import SockJS from 'sockjs-client';
import { toast } from "react-toastify";
import LocalStorage from '@/services/LocalStorageService';
import { registerUser, authenticateUser } from "../../services/AuthService";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { getCurrentLoginUser } from "@/services/UserService";

class AuthStore {
    currentLoginUser: any = null;

    constructor() {
        makeAutoObservable(this);
    }

    signUpUser = async (user: any) => {
        try {
            const { data } = await registerUser(user);
            toast.success("Register successfully! Please login again!");
            return data;
        }
        catch (error: any) {
            if (error?.response?.status === 409)
                toast.info("Username has existed, please choose another one!");
            else {
                console.error(error);
                toast.error("Registration has error occured :(");
            }
            throw new Error(error);
        }
    }

    authenticateUser = async (user: any) => {
        try {
            const { data } = await authenticateUser(user);
            const userData = data?.loggedInUser;
            console.log("after login data: ", this.getAllClaimsFromJwt(data?.token));
            this.setSession(data?.token);
            toast.dismiss();
            toast.success("Login successfully!");
            this.setUser(userData);
            this.currentLoginUser = userData;

            this.connectToSocket();
            return data;
        }
        catch (error: any) {
            if (error?.response?.status === 401)
                toast.error("The username or password is incorrect!");
            else {
                toast.error("Connection errors!");
            }
            throw new Error(error);
        }
    }
















    stompClient: any = null;

    setStompClient = (sc: any) => {
        this.stompClient = sc;
    }

    disconnectStompClient = () => {
        if (this.stompClient)
            this.stompClient.disconnect();
    }

    connectToSocket = async () => {
        let Sock = new SockJS('http://localhost:8000/ws');
        this.stompClient = over(Sock);
        this.stompClient.connect({}, this.onConnected, this.onError);
    }

    onConnected = () => {
        this.stompClient.subscribe('/user/' + this.currentLoginUser.id + '/notification', this.onReceivedNotification);
    }

    onError = (err: any) => {
        console.error(err);

        toast.error("Connect to messenger error, please login again! Auto redirect in 5 seconds...", { autoClose: 5000 });

        setTimeout(function () {
            window.location.href = "/login";

            const navigate = useNavigate();
            navigate('/login');
        }, 5000);
    }

    onReceivedNotification = (payload: any) => {
        const payloadData = JSON.parse(payload.body);
        toast.info(payloadData?.content);
    }

    logout = () => {
        this.setSession(null);
        this.removeUser();
        const navigate = useNavigate();
        navigate('/login');
    };

    setSession(token: any) {
        if (token) {
            LocalStorage.setItem("jwt_token", token);
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
        } else {
            LocalStorage.removeItem("jwt_token");
            delete axios.defaults.headers.common["Authorization"];
        }
    }

    getLoggedInUser() {
        return LocalStorage.getLoggedInUser();
    }

    getCurrentUser = async () => {
        // debugger
        try {
          const { data } = await getCurrentLoginUser();
    
          this.setUser(data);
        }
        catch (error: any) {
          console.error(error);
          toast.error("Có lỗi xảy ra khi tải dữ liệu người dùng, vui lòng thử lại sau");
        }
      };

    //set token
    setLoginToken = (data: any) => LocalStorage.setItem("auth_token", data);
    setUser = (user: any) => LocalStorage.setItem("auth_user", user);
    removeUser = () => LocalStorage.removeItem("auth_user");

    getAllClaimsFromJwt = (token: any) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
}

export default AuthStore;