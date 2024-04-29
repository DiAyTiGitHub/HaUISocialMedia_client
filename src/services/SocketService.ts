import { over } from "stompjs";
import SockJS from "sockjs-client";
import LocalStorageService from "./LocalStorageService";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toastInfo } from "@/common/ToastNotification/ToastInfoNotification";

class SocketService {
    stompClient: any = null;

    constructor() {

    }

    initializeSocket = async (onReceiveRoomMessage: any) => {
        if (!this.stompClient) {

            //start connecting to socket
            const Sock = new SockJS("http://localhost:8000/ws");
            const cliStomp = over(Sock);
            this.stompClient = cliStomp;
            const _this = this;

            cliStomp.connect({}, function () {
                _this.subscribeChannels(onReceiveRoomMessage);
            }, this.onError);
        }
        else {
            console.log("Already has socket connection!")
        }
    }

    subscribeChannels = (onReceiveRoomMessage: any) => {
        const currentUser = LocalStorageService.getLoggedInUser();

        //subscribe channels...
        this.stompClient.subscribe(
            "/user/" + currentUser?.id + "/privateMessage", onReceiveRoomMessage
        );
        this.stompClient.subscribe(
            "/user/" + currentUser?.id + "/notification", this.onReceivedNotification
        );
    }

    disconnectStompClient = () => {
        if (this?.stompClient) {
            this?.stompClient.disconnect();
            this.stompClient = null;
            // toast.success("Disconnected from stomp");
        }
    }

    onReceivedNotification = (notification: any) => {
        const currentLocation = window.location.href;
        if (currentLocation.includes("messenger-v2")) return;

        const data = JSON.parse(notification?.body);
        console.log("notification: ", data);
        // toast.info(data?.content);
        toastInfo(data);
    }

    onError = (err: any) => {
        console.error(err);

        toast.error(
            "Connect to messenger error, please login again! Auto redirect in 5 seconds...",
            { autoClose: 5000 }
        );

        setTimeout(function () {
            window.location.href = "/login";

            const navigate = useNavigate();
            navigate('/login');
        }, 5000);
    }
}

export default new SocketService();