import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/layout/Layout";
import Profile from "./pages/Profile";
import ChatPage from "./pages/ChatPage";
import EditProfile from "./pages/EditProfile";
import FriendPage from "./pages/FriendPage";
import Wishlist from "./pages/Wishlist";
import GroupPage from "./pages/GroupPage";
import ProtectedRoute from "./context/ProtectedRoute";
import ChatDetailPage from "./pages/ChatDetailPage";
import SuggestFriendPage from "./pages/SuggestFriendPage";
import RequestFriendPage from "./pages/ReqestFriendPage";
import PostDetail from "./pages/PostDetail";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* private routes */}
      <Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/profile/edit" element={<EditProfile />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/groups" element={<GroupPage />} />
          <Route path="/friends" element={<FriendPage />} />
          <Route path="/suggest-friends" element={<SuggestFriendPage />} />
          <Route path="/add-friends" element={<RequestFriendPage />} />
          <Route path="/profile/:profileId" element={<Profile />} />
          <Route path="/post/:postId" element={<PostDetail />} />
        </Route>
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/chats/:roomId" element={<ChatDetailPage />} />
      </Route>
    </Routes>
  );
};

export default App;
