import axios from "axios";
import ConstantList from "@/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/user";

export function getCurrentLoginUser() {
    const url = API_PATH;
    return axios.get(url);
}