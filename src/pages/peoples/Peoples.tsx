import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import { setProfileRequests } from "src/redux/reducers/profile.reducer";
import { setSnack } from "src/redux/reducers/snack.reducer";

export default function Peoples() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const params = new URLSearchParams(window.location.search);
  const { user, socket, peoples } = useAppSelector((state) => ({
    socket: state.socket.socket,
    user: state.auth.user,
    peoples: state.peoples.data,
  }));
  const [query, setQuery] = useState("");
  useEffect(() => {
    if (socket) {
      socket.emit("search-users-request", `${query}`);
    }
    const paramValue = params.get("search");
    if ((!query || paramValue !== query) && paramValue)
      setQuery(`${paramValue}`);
  }, [socket, query, location.pathname, params.get("search")]);

  return (
    <div className="row px-5">
      <h2 className="mb-4">
        {query ? `Search results for "${query}"` : "Peoples"}
      </h2>
      {peoples.map((friend, index) => (
        <div className="col-sm-6 col-lg-4" key={index}>
          <div className="card hover-img">
            <div className="card-body p-4 text-center">
              <img
                src={
                  friend.photoURL ||
                  "https://bootdey.com/img/Content/avatar/avatar1.png"
                }
                alt=""
                className="mb-3"
                width="80"
                height="80"
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
              <h5 className="fw-semibold mb-0">{friend.displayName}</h5>
              <span className="h6">{friend.email}</span>
              <br />
              {user?.friends.map(item => item._id).includes(friend._id) ? (
                <Button
                  onClick={() => {
                    const obj = {
                      receiver: friend._id,
                      sender: user?._id,
                    };
                    console.log(obj);

                    socket?.emit("unfriend-user", obj);
                  }}
                  className="mt-2"
                >
                  Unfriend
                </Button>
              ) : (
                <Button
                onClick={() => {
                  socket?.emit("send-friend-request", {
                    sender: user?._id,
                    receiver: friend._id,
                  });

                  // setProfileData((prev) => {
                  //   return {
                  //     ...prev,
                  //     requests: [...prev.requests, user?._id],
                  //   };
                  // });
                  dispatch(setProfileRequests(user?._id));
                  dispatch(setSnack({ open: true, message: "Friend request sent", type: "success" }));
                }}
                  className="mt-2"
                >
                  Add friend
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
      {peoples.length === 0 && (
        <div className="col-12">
          <h3>No Peoples found</h3>
        </div>
      )}
    </div>
  );
}
