import axios from "axios";
import ConstantList from "@/appConfig";

const API_PATH = ConstantList.API_ENPOINT + "/api/relationship";

export function pagingCurrentFriends(searchObject: any) {
    const url = API_PATH + '/currentFriends';
    return axios.post(url, searchObject);
}

export function getAllCurrentFriends() {
    const url = API_PATH + '/currentFriends';

    const searchObject = {
        pageSize: 1000000,
        pageIndex: 1,
    };

    return axios.post(url, searchObject);
}