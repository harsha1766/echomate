import React from "react";
import Loader from "components/Loader";
import { useDispatch } from "react-redux";
import PublicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";
import { useAppSelector } from "src/redux/hooks";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "src/service/firebase";
import {
  setUser,
  setUsers,
  stopLoading,
} from "src/redux/reducers/auth.reducer";

//websockets
import { io } from "socket.io-client";
import { getCollections } from "src/service/api/api.firebase";
import { clearSocket, setSocket } from "src/redux/reducers/socket.reducer";
import { setSnack } from "src/redux/reducers/snack.reducer";
import { setPosts } from "src/redux/reducers/post.reducer";
import {
  setProfile,
  setProfilePosts,
} from "src/redux/reducers/profile.reducer";
import { insertChat, setChats } from "src/redux/reducers/chat.reducer";
import { setPeoples } from "src/redux/reducers/peoples.reducer";
import axios from "axios";

/* eslint-disable @typescript-eslint/no-explicit-any */

export default function Routes() {
  const dispatch = useDispatch();
  const {
    auth,
    socket: { socket },
  } = useAppSelector((state) => ({
    auth: state.auth,
    socket: state.socket,
  }));

  React.useEffect(() => {
    if (!auth.user && socket) {
      const unsubscribe = onAuthStateChanged(
        firebaseAuth,
        async (currentUser) => {
          if (currentUser) {
            const userObj = {
              displayName: currentUser.displayName || "",
              email: currentUser.email || "",
              photoURL: currentUser.photoURL || "",
              phoneNumber: currentUser.phoneNumber || "",
              accessToken: await currentUser.getIdToken(),
            };
            socket.emit("get-user-by-email-request", userObj);
          }
        }
      );
      return () => unsubscribe();
    }
  }, [auth.user, dispatch, socket]);

  React.useEffect(() => {
    const socket = io(import.meta.env.VITE_socket_server, {
      reconnectionDelayMax: 10000,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      dispatch(setSocket(socket));
    });

    socket.on("get-user-by-email-response", async (user) => {
      const obj = {
        ...user,
        socket_id: socket.id,
      };
      const response = await axios.get(
        "https://nexjs-admin-rouge.vercel.app/api/admin"
      );
      if (response.status === 200) {
        dispatch(setUser(obj));
        dispatch(stopLoading());
      }
      socket.emit("update-user", obj);
    });

    socket.io.on("error", (error) => {
      // ...
      console.log(error.message);
    });
    socket.on("update-user-error", (error) => {
      // ...
      dispatch(setSnack({ open: true, message: error, type: "error" }));
    });

    socket.on("disconnect", (reason) => {
      dispatch(clearSocket());
      if (reason === "io server disconnect") {
        // the disconnection was initiated by the server, you need to reconnect manually
        socket.connect();
      }
      // else the socket will automatically try to reconnect
    });

    //TITLE: HOME PAGE: POST OPERATIONS
    socket.emit("get-posts-request");
    socket.on("create-post-response", (data) => {
      dispatch(setPosts(data));
    });
    socket.on("get-posts-response", (data) => {
      dispatch(setPosts(data));
    });
    socket.on("get-posts-error", (data) => {
      dispatch(setSnack({ open: true, message: data, type: "error" }));
    });

    //TITLE: PROFILE PAGE: PROFILE OPERATIONS
    socket.on("create-post-response", (data) => {
      dispatch(setProfilePosts(data));
    });
    socket.on("get-profile-response", (data) => {
      dispatch(setProfile(data));
    });
    socket.on("send-friend-request-error", (data) => {
      dispatch(setSnack({ open: true, message: data, type: "error" }));
    });
    socket.on("get-profile-error", (data) => {
      dispatch(setSnack({ open: true, message: data, type: "error" }));
    });

    //TITLE: CHAT OPERATIONS
    socket.on("get-messages-error", (data) => {
      dispatch(setSnack({ type: "error", message: data, open: true }));
    });
    socket.on("send-message-error", (data) => {
      dispatch(setSnack({ type: "error", message: data, open: true }));
    });
    socket.on("get-messages-response", (data) => {
      dispatch(setChats(data));
    });
    socket.on("send-message-response", (data) => {
      dispatch(insertChat(data));
    });

    //TITLE: PROFILE OPERATIONS
    socket.on("create-post-response", (data) => {
      dispatch(setProfilePosts(data));
    });
    socket.on("get-profile-response", (data: any) => {
      dispatch(setProfile(data));
      dispatch(setUser(data));
    });
    socket.on("send-friend-request-error", (data: any) => {
      dispatch(setSnack({ open: true, message: data, type: "error" }));
    });
    socket.on("get-profile-error", (data: any) => {
      dispatch(setSnack({ open: true, message: data, type: "error" }));
    });
  }, [dispatch]);

  React.useEffect(() => {
    const user = localStorage.getItem("userId");
    if (!user) {
      dispatch(stopLoading());
    }
  }, [dispatch]);

  React.useEffect(() => {
    if (socket && auth.user) {
      if (socket.id !== auth.user?.socket_id) {
        socket.emit("update-user", {
          ...auth.user,
          socket_id: socket.id,
        });
      }
      socket.on("send-friend-request-response", (data: any) => {
        if (data.email === auth.user?.email) {
          dispatch(setProfile(data));
        }
      });

      socket.on("send-friend-request-response", (data: any) => {
        if (data.email === auth.user?.email) {
          dispatch(setProfile(data));
          dispatch(setUser(data));
        }
      });

      //TITLE: PEOPLES OPERATIONS
      socket.on("search-users-response", (data: any) => {
        dispatch(
          setPeoples(data.filter((item: any) => item._id !== auth.user?._id))
        );
      });
    }
  }, [socket, auth.user, dispatch]);

  React.useEffect(() => {
    if (auth.user) {
      getCollections("users")
        .then((res) => {
          dispatch(setUsers(res.filter((user) => user._id !== auth.user?._id)));
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }, [auth.user, dispatch]);

  return (
    <div>
      {auth.loading && <Loader loading />}
      {auth.user && !auth.loading && <PrivateRouter />}
      {!auth.user && !auth.loading && <PublicRouter />}
    </div>
  );
}
