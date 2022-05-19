import React, { useState, useContext, useEffect, useRef } from "react";
import { contextPosts } from "../../services/contexts/postsContext";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { apiUrl } from "../../config.json";

const AddCommentPost = ({ props, post, commentId, user }) => {
  const postsContext = useContext(contextPosts);
  const { removeCommentPost } = postsContext;

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

  async function DeleteComment() {
    try {
      await removeCommentPost(post, {
        _id: commentId._id,
      });
      toast.success("the comment has been deleted");

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
    } catch ({ response }) {
      const { data } = response;
      console.log(data);
    }
  }

  return (
    <i
      style={{ cursor: "pointer", fontSize: "15px", zIndex: "1" }}
      onClick={DeleteComment}
      className="bi bi-trash ms-5 deleteComment"
      title="Trash"
    ></i>
  );
};

export default AddCommentPost;
