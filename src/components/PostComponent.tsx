import { get, orderBy } from "lodash";
import { PostType } from "utils/types/post.types";
import moment from "moment";
import Accordion from "react-bootstrap/Accordion";
import { Icon } from "@iconify/react";
import { useAppSelector } from "src/redux/hooks";
import { useState } from "react";
/* eslint-disable @typescript-eslint/no-explicit-any */

export default function PostComponent(props: PostType & { index: number }) {
  const { user, socket } = useAppSelector((state) => ({
    user: state.auth.user,
    socket: state.socket.socket,
  }));
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [comment, setComment] = useState("");
  return (
    <div>
      {props.index % 2 === 0 ? (
        <div className="row align-items-center event-block no-gutters margin-40px-bottom p-4 rounded">
          <div className="col-lg-5 col-sm-12">
            <div className="position-relative">
              {props.type === "image" && <img src={props.content} alt="" />}
              <div className="events-date">
                <div className="font-size28">
                  {moment(props.timestamp).date()}
                </div>
                <div className="font-size14">
                  {months[moment(props.timestamp).month()]}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-7 col-sm-12">
            <div className="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
              <h5 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                {props.text}
              </h5>
              <ul className="event-time margin-10px-bottom md-margin-5px-bottom p-0">
                <li>
                  <strong>Creator :</strong>
                </li>
                <li>{props.owner.displayName}</li>
              </ul>
              <div className="stats">
                <button
                  style={{ border: "none", padding: 8 }}
                  onClick={() => {
                    if (props.likes?.includes(user._id)) {
                      socket?.emit("unlike-post", {
                        post_id: props._id,
                        user_id: user._id,
                      });
                    } else {
                      socket?.emit("like-post", {
                        post_id: props._id,
                        user_id: user._id,
                      });
                    }
                  }}
                >
                  {props.likes.includes(user._id) ? (
                    <Icon
                      icon="mdi:like"
                      style={{ fontSize: 20, color: " #17A9FD" }}
                    />
                  ) : (
                    <Icon icon="ei:like" style={{ fontSize: 26 }} />
                  )}
                  {props.likes.length} Likes
                </button>
                <button
                  // onClick={() => setShowCommentDialog(true)}
                  style={{ border: "none", marginLeft: 8, padding: 8 }}
                >
                  <Icon
                    icon="teenyicons:chat-outline"
                    style={{ fontSize: 16, marginRight: 8 }}
                  />
                  {props.comments.length} Comments
                </button>
              </div>
            </div>
          </div>
          <Accordion className="mt-2">
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
                          user_id: user._id,
                          text: comment,
                        });
                        setComment("");
                      }}
                    >
                      Submit
                    </button>
                  </div>
                  <ul
                    className="comments-list"
                    style={{ listStyleType: "none" }}
                  >
                    {orderBy(props.comments, "timestamp", "desc").map(
                      (comment, index) => (
                        <li
                          className="comment border p-2 rounded mb-2"
                          key={index}
                        >
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
        </div>
      ) : (
        <div>
          <div className="row align-items-center event-block no-gutters margin-40px-bottom p-4 rounded">
          <div className="col-lg-7 order-2 order-lg-1">
            <div className="padding-60px-lr md-padding-50px-lr sm-padding-30px-all xs-padding-25px-all">
              <h5 className="margin-15px-bottom md-margin-10px-bottom font-size22 md-font-size20 xs-font-size18 font-weight-500">
                {props.text}
              </h5>
              <ul className="event-time margin-10px-bottom md-margin-5px-bottom p-0">
                <li>
                  <strong>Creator :</strong>
                </li>
                <li>{props.owner.displayName}</li>
              </ul>
              <div className="stats">
                <button
                  style={{ border: "none", padding: 8 }}
                  onClick={() => {
                    if (props.likes?.includes(user._id)) {
                      socket?.emit("unlike-post", {
                        post_id: props._id,
                        user_id: user._id,
                      });
                    } else {
                      socket?.emit("like-post", {
                        post_id: props._id,
                        user_id: user._id,
                      });
                    }
                  }}
                >
                  {props.likes.includes(user._id) ? (
                    <Icon
                      icon="mdi:like"
                      style={{ fontSize: 20, color: " #17A9FD" }}
                    />
                  ) : (
                    <Icon icon="ei:like" style={{ fontSize: 26 }} />
                  )}
                  {props.likes.length} Likes
                </button>
                <button
                  // onClick={() => setShowCommentDialog(true)}
                  style={{ border: "none", marginLeft: 8, padding: 8 }}
                >
                  <Icon
                    icon="teenyicons:chat-outline"
                    style={{ fontSize: 16, marginRight: 8 }}
                  />
                  {props.comments.length} Comments
                </button>
              </div>
            </div>
          </div>
          <div className="col-lg-5 order-1 order-lg-2">
            <div className="position-relative">
              {props.type === "image" && <img src={props.content} alt="" />}
              {props.type === "video" && (
                <video controls>
                  <source src={props.content} type="video/mp4" />
                </video>
              )}
              {props.type === "text" && (
                <div className="p-4 border rounded">
                  <h3>{props.content}</h3>
                </div>
              )}
              <div className="events-date">
                <div className="font-size28">
                  {moment(props.timestamp).date()}
                </div>
                <div className="font-size14">
                  {months[moment(props.timestamp).month()]}
                </div>
              </div>
            </div>
          </div>
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
                          user_id: user._id,
                          text: comment,
                        });
                        setComment("");
                      }}
                    >
                      Submit
                    </button>
                  </div>
                  <ul
                    className="comments-list"
                    style={{ listStyleType: "none" }}
                  >
                    {orderBy(props.comments, "timestamp", "desc").map(
                      (comment, index) => (
                        <li
                          className="comment border p-2 rounded mb-2"
                          key={index}
                        >
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
        </div>
        </div>
      )}
    </div>
  );
}
