import { useRoutes } from "react-router-dom";
import Layout from "layout/PrivateLayout";

//pages
import Home from "pages/home/Home";
import Profile from "pages/profile/Profile";
import AllFriends from "pages/friends/Friends";
import EditProfile from "pages/profile/EditProfile";
import Peoples from "pages/peoples/Peoples";
import Chat from "pages/chat/Chat";


export default function PrivateRouter() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "friends", element: <AllFriends /> },
        { path: "profile", element: <Profile /> },
        { path: "peoples", element: <Peoples /> },
        { path: "chat", element: <Chat /> },
      ],
    }
  ]);

  return routes;
}
