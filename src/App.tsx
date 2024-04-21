import { Routes, Route } from "react-router-dom";
import HomePage from "./components/Home/HomePage";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Layout from "./components/layout/Layout";
import Profile from "./components/User/Profile";
import EditProfile from "./components/User/EditProfile";
import FriendPage from "./components/Relationship/FriendPage";

import SuggestFriendPage from "./components/Relationship/SuggestFriendPage";
import RequestFriendPage from "./components/Relationship/ReqestFriendPage";
import PostDetail from "./components/Post/PostDetail";
import LeaderBoard from "./components/LeaderBoard/LeaderBoard";
import ChatV2Index from "./components/ChatV2/ChatV2Index";
import SearchPage from "./components/Search/SearchPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminHomePage from "./components/Home/AdminHomePage";
import LayoutAdmin from "./components/layout/LayoutAdmin";
import AdminPostPage from "./components/Post/AdminPostPage";
import AdminCourseResult from "./components/CourseResult/AdminCourseResult";
import AdminUserPage from "./components/User/AdminUserPage";
import AdminClassPage from "./components/Class/AdminClassPage";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* private routes */}
        <Route>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/profile/edit" element={<EditProfile />} />

            <Route path="/friends" element={<FriendPage />} />
            <Route path="/suggest-friends" element={<SuggestFriendPage />} />
            <Route path="/add-friends" element={<RequestFriendPage />} />
            <Route path="/profile/:profileId" element={<Profile />} />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/messenger-v2" element={<ChatV2Index />} />
          </Route>

          {/* Admin Route */}
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route path="/admin" element={<AdminHomePage />} />
            <Route path="/admin/users" element={<AdminUserPage />} />
            <Route path="/admin/posts" element={<AdminPostPage />} />
            <Route path="/admin/classes" element={<AdminClassPage />} />
            <Route
              path="/admin/course-results"
              element={<AdminCourseResult />}
            />
          </Route>
        </Route>
      </Routes>

      <ToastContainer
        position="bottom-left"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};

export default App;
