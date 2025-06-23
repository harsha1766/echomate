import { useAppSelector } from "src/redux/hooks";
import Page from "../../components/Page";
import "./home.css";
import { Icon } from "@iconify/react";
import moment from "moment";
import CommentComponent from "./CommentComponent";
import CreatePostComponent from "components/CreatePostComponent";
import { orderBy } from "lodash";

export default function Home() {
  const { posts, user, socket } = useAppSelector((state) => ({
    posts: state.posts.posts,
    user: state.auth.user,
    socket: state.socket.socket,
  }));
  return (
    <Page title="Home">
      <div className="container">
        <CreatePostComponent />
        {orderBy(posts, 'timestamp','desc').map((post) => (
          <div key={post._id} className="well p-3 border rounded mb-3 shadow">
            <div className="media">
              <a className="pull-left" href="#">
                <img
                  className="media-object"
                  src={post.owner.photoURL}
                  style={{ width: 50, height: 50, borderRadius: "50%" }}
                />
              </a>
              <div className="media-body">
                <h4 className="media-heading">{post.owner.displayName}</h4>
                <p className="text-right">
                  {moment(post.timestamp).format("DD MMM")}
                </p>
                <p>{post.text}</p>
                {post.content && post.type.includes("image") && (
                  <img
                    style={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                    src={post.content}
                    alt={post.text}
                  />
                )}
                {post.content && post.type.includes("video") && (
                  <video
                    style={{
                      width: 200,
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 8,
                    }}
                    controls
                    src={post.content}
                  />
                )}
                <br />
                <br />
                <button
                  style={{ border: "none", padding: 8 }}
                  onClick={() => {
                    if (post.likes?.includes(`${user?._id}`)) {
                      socket?.emit("unlike-post", {
                        post_id: post._id,
                        user_id: user?._id,
                      });
                    } else {
                      socket?.emit("like-post", {
                        post_id: post._id,
                        user_id: user?._id,
                      });
                    }
                  }}
                >
                  {post.likes.includes(`${user?._id}`) ? (
                    <Icon
                      icon="mdi:like"
                      style={{ fontSize: 20, color: " #17A9FD" }}
                    />
                  ) : (
                    <Icon icon="ei:like" style={{ fontSize: 26 }} />
                  )}
                  {post.likes.length} Likes
                </button>
                <button
                  // onClick={() => setShowCommentDialog(true)}
                  style={{ border: "none", marginLeft: 8, padding: 8 }}
                >
                  <Icon
                    icon="teenyicons:chat-outline"
                    style={{ fontSize: 16, marginRight: 8 }}
                  />
                  {post.comments.length} Comments
                </button>
                <CommentComponent {...post} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </Page>
  );
}
