import { useAppDispatch, useAppSelector } from "src/redux/hooks";
import "./friends.css";
import { setSnack } from "src/redux/reducers/snack.reducer";
export default function Friends() {
  const dispatch = useAppDispatch();
  const { user, socket } = useAppSelector((state) => ({
    user: state.auth.user,
    socket: state.socket.socket,
  }));
  return (
    <div className="container">
      <div className="row">
        {user?.requests.map((friend) => (
          <div key={friend._id} className="col-xl-3 col-md-6 mb-4">
            <div className="card border-0 shadow">
              <img
                src={
                  friend.photoURL ||
                  "https://source.unsplash.com/TMgQMXoglsM/500x350"
                }
                className="card-img-top"
                alt="..."
              />
              <div className="card-body text-center">
                <h5 className="card-title mb-0">{friend.displayName}</h5>
                <div className="card-text text-black-50">{friend.email}</div>
                <button
                  onClick={() => {
                    const obj = {
                      receiver: user?._id,
                      sender: friend._id,
                    };
                    socket?.emit("accept-friend-request", obj);
                    dispatch(
                      setSnack({
                        open: true,
                        message: "Friend request accepted",
                        type: "success",
                      })
                    );
                  }}
                  className="form-control mt-2"
                >
                  Accept
                </button>
                <button
                  onClick={() => {
                    const obj = {
                      receiver: user?._id,
                      sender: friend._id,
                    };
                    socket?.emit("reject-friend-request", obj);
                    dispatch(
                      setSnack({
                        open: true,
                        message: "Friend request rejected",
                        type: "error",
                      })
                    );
                  }}
                  className="form-control mt-2"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
        {user?.friends.map((friend) => (
          <div key={friend._id} className="col-xl-3 col-md-6 mb-4">
            <div className="card border-0 shadow">
              <img
                src={
                  friend.photoURL ||
                  "https://source.unsplash.com/TMgQMXoglsM/500x350"
                }
                className="card-img-top"
                alt="..."
              />
              <div
                className="card-body text-center rounded"
                style={{ background: "white", overflow: 'hidden' }}
              >
                <h5 className="card-title mb-0">{friend.displayName}</h5>
                <div className="card-text text-black-50">{friend.email}</div>
                <button
                  onClick={() => {
                    socket?.emit("unfriend-user", {
                      receiver: user?._id,
                      sender: friend._id,
                    });
                  }}
                  className="form-control mt-2"
                >
                  unfriend
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
