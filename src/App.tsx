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

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* private routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/chats" element={<ChatPage />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/friends" element={<FriendPage />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/groups" element={<GroupPage />} />
      </Route>

      <Route path="/profile/:profileId" element={<Profile />} />
    </Routes>
  );
};

export default App;
