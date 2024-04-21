import { CreateCommentType } from "@/components/shared/Comment";

import { LoginForm } from "@/pages/Login";
import { CreatePostType } from "@/pages/PostForm";
import { suggestFriendsPagination } from "@/pages/SuggestFriendPage";
import { IComment, IPost, IUser } from "@/types";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// ================ Auth ==========================
export const signIn = async (formData: LoginForm) => {
  console.log(formData);
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

export const register = async (formData: any) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
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
/// ========================================================

// ================== Relationship =========================
export const getCurrentFriend = async (currentFriendPagination: any) => {
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

export const denyFriendRequest = async (friendId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/api/relationship/unacceptFriend/${friendId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) throw new Error("Failed to deny request Friend");
  return response.json();
};

export const getRequestFriend = async (currentFriendPagination: any) => {
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

export const getFriendOfUser = async ({
  paging,
  userId,
}: {
  paging: any;
  userId: string;
}): Promise<IUser[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/api/relationship/friends/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(paging),
    }
  );
  const body = await response.json();
  if (!response.ok) throw Error(body.message);
  return body;
};
// ===============================================================

// ======================== Post ================================
export const createPost = async (formData: CreatePostType) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/post`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};

export const getPostById = async (postId: string): Promise<IPost> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/post/${postId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};

export const updatePost = async (formData: CreatePostType) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/post`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};

export const deletePost = async (postId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/post/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};

export const getNewFeed = async (newFeedPagination: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/post/newsfeed`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newFeedPagination),
  });
  const body = await response.json();
  if (!response.ok) throw Error(body.message);
  return body;
};
// ==============================================================

//========================== Like Post =========================
export const likePost = async (postId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/like/${postId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};

export const dislikePost = async (postId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/like/${postId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw Error("Failed to dislike post");
};
// ======================================================================

//============================= Comment =================================
export const createComment = async (formData: CreateCommentType) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/comment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};

export const getCommentPost = async (postId: string): Promise<IComment[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/api/comment/forPost/${postId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};

export const getSubCommentPost = async (
  commentId: string
): Promise<IComment[]> => {
  const token = localStorage.getItem("token");
  const response = await fetch(
    `${API_BASE_URL}/api/comment/children/${commentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};
//======================================================================

//================================= User ===============================
export const getUserById = async (userId: string): Promise<IUser> => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/user/id/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};

export const updateUser = async (formData: IUser) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/user/update`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};

export const getPostOfUser = async ({
  newFeedPagination,
  userId,
}: {
  newFeedPagination: any;
  userId: string;
}) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/post/newsfeed/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(newFeedPagination),
  });
  const body = await response.json();
  if (!response.ok) throw Error(body.message);
  return body;
};

// =========================== Message =======================

export const getAllJoinedRooms = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/room/joinedRooms`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};

export const getChatById = async (chatId: string) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/room/${chatId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const body = await response.json();

  if (!response.ok) throw Error(body.message);

  return body;
};
// =============================================================

export const getAllNotification = async (paging: any) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${API_BASE_URL}/api/notification/paging`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(paging),
  });
  const body = await response.json();
  if (!response.ok) throw Error(body.message);
  return body;
};
