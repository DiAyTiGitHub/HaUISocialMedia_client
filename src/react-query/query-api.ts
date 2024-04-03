import { currentFriendsPagination } from "@/pages/FriendPage";
import { LoginForm } from "@/pages/Login";
import { suggestFriendsPagination } from "@/pages/SuggestFriendPage";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const signIn = async (formData: LoginForm) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};

export const getCurrentFriend = async (
  currentFriendPagination: currentFriendsPagination
) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/api/relationship/currentFriends`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(currentFriendPagination),
    }
  );

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};

export const sendFriendRequest = async (friendId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/api/relationship/friendRequest/${friendId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) throw new Error("Failed to send request Friend");
  return response.json();
};

export const getRequestFriend = async (
  currentFriendPagination: currentFriendsPagination
) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/api/relationship/friendRequest/pending`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(currentFriendPagination),
    }
  );
  const body = await response.json();
  if (!response.ok) throw Error(body.message);
  return body;
};

export const getSuggestFriends = async (
  suggestFriendPagination: suggestFriendsPagination
) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/user/pagingNewUser`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(suggestFriendPagination),
  });
  const body = await response.json();
  if (!response.ok) throw Error(body.message);
  return body;
};
