import React, { useState, useContext, useRef, useEffect } from "react";
import { contextPosts } from "../../services/contexts/postsContext";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { apiUrl } from "../../config.json";

const AddCommentPost = ({ props, post, user }) => {
  const [comment, setComment] = useState("");

  const postsContext = useContext(contextPosts);
  const { addCommentPost } = postsContext;

  const socket = useRef();
  const [reloadPosts, setReloadPosts] = useState([]);
  useEffect(() => {
    socket.current = io(apiUrl);
    socket.current.emit("addUser", user?._id);
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

  function formData(comment) {
    return setComment(comment);
  }

  async function addCom(e) {
    e.preventDefault();

    if (!comment.length) {
      return null;
    }

    await addCommentPost(post, comment);
    toast.success("the comment has been added");
    setComment("");

    socket.current = io(apiUrl);
    socket.current.emit("addUser", user._id);
    socket.current.on("get-posts", (data) => {
      if (!data.length) {
        return null;
      }
      if (data.length) {
        const dataPosts = data.reverse().slice(0, 100);
        return setReloadPosts([...dataPosts]);
      }
    });
  }

  return (
    <form onSubmit={addCom} className="input-group ">
      <input
        value={comment}
        onChange={(e) => formData(e.target.value)}
        type="text"
        className="form-control rounded-corner inputComment"
        placeholder="comment..."
      />
      <span className="input-group-btn p-l-10">
        <button
          style={{
            backgroundColor: " rgb(92, 28, 63)",
            color: "white",
          }}
          className="btn btnAnimateAddComment f-s-12 rounded-corner "
        >
          <i className="bi bi-chat-fill iconAddComment"></i>
          <span className="addCommentBtn">Comment</span>
        </button>
      </span>
    </form>
  );
};

export default AddCommentPost;
