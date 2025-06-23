import { get, orderBy } from "lodash";
import moment from "moment";
import { useState } from "react";
import { Accordion } from "react-bootstrap";
import { useAppSelector } from "src/redux/hooks";
import { PostType } from "utils/types/post.types";

export default function CommentComponent(props: PostType) {
  const [comment, setComment] = useState("");
  const { user, socket } = useAppSelector((state) => ({
    user: state.auth.user,
    socket: state.socket.socket,
  }));
  return (
    <Accordion className="mt-2 order-3">
      <Accordion.Item eventKey="0" style={{}}>
        <Accordion.Header>Comments</Accordion.Header>
        <Accordion.Body>
          <div className="post-footer">
            <div className="input-group mb-2">
              <input
                className="form-control"
                placeholder="Add a comment"
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                className="b-none border-0"
                style={{ borderRadius: "0px 4px 4px 0px" }}
                onClick={() => {
                  socket?.emit("comment-post", {
                    post_id: props._id,
                    user_id: user?._id,
                    text: comment,
                  });
                  setComment("");
                }}
              >
                Submit
              </button>
            </div>
            <ul className="comments-list" style={{ listStyleType: "none" }}>
              {orderBy(props.comments, "timestamp", "desc").map(
                (comment, index) => (
                  <li className="comment border p-2 rounded mb-2" key={index}>
                    <div className="d-flex border-bottom mb-2">
                      <img
                        className="avatar"
                        src={get(comment, "user.photoURL")}
                        alt="avatar"
                        style={{
                          width: 40,
                          height: 40,
                          borderRadius: 20,
                        }}
                      />
                      <div
                        className="comment-heading"
                        style={{ marginLeft: 8 }}
                      >
                        <p className="p-0 m-0">
                          {get(comment, "user.displayName")}
                        </p>
                        <p className="time" style={{ fontSize: 12 }}>
                          {moment(get(comment, "timestamp")).fromNow()}
                        </p>
                      </div>
                    </div>
                    <div className="comment-body">
                      <p>{comment.text}</p>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}
