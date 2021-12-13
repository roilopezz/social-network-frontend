import { useContext, useEffect, useRef, useState } from "react";
import { contextPosts } from "../../services/contexts/postsContext";
import { io } from "socket.io-client";
import { apiUrl } from "../../config.json";

const LikePost = ({ postId, likes, user }) => {
  const postsContext = useContext(contextPosts);
  const { likePost } = postsContext;

  const socket = useRef();
  const [reloadPosts, setReloadPosts] = useState([]);
  useEffect(() => {
    socket.current = io(apiUrl);
    socket.current.emit("addUser", user._id);
    socket.current.on("get-posts", (data) => {
      if (!data.length) {
        return null;
      }
      if (data.length) {
        return true;
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, [reloadPosts, user?._id]);

  async function like(id) {
    socket.current = io(apiUrl);
    socket.current.emit("addUser", user._id);
    socket.current.on("get-posts", (data) => {
      if (!data.length) {
        return null;
      }
      if (data.length) {
        return setReloadPosts([...data]);
      }
    });

    await likePost(id);

    // return props.history.replace("/");
  }

  return (
    <>
      <button
        className=" btnAnimate"
        style={{
          textDecoration: "none",
        }}
        onClick={() => like(postId)}
      >
        {likes.some((e) => e === user._id) ? (
          <i className="bi bi-hand-thumbs-up-fill ms-2 " title="UnLike"></i>
        ) : (
          <i
            style={{ minHeight: "40px" }}
            className="bi bi-hand-thumbs-up ms-2 "
            title="Like"
          ></i>
        )}
      </button>
    </>
  );
};

export default LikePost;
