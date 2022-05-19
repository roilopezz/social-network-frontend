import React, { Component } from "react";
import http from "../../services/http";
import { apiUrl } from "../../config.json";
import { contextUser } from "./userContext";
export const contextPosts = React.createContext();

class PostsContext extends Component {
  static contextType = contextUser;

  addNewPost = async (data) => {
    return await http.post(`${apiUrl}/post`, data);
  };

  deletePost = async (id) => {
    await http.delete(`${apiUrl}/post/removepost/${id}`);
  };

  userPosts = async (id) => {
    return await http.get(`${apiUrl}/post/userposts/${id}`);
  };

  editPost = async (id, description) => {
    return await http.put(`${apiUrl}/post/editpost/${id}`, {
      description,
    });
  };

  savePosts = async (id) => {
    return await http.post(`${apiUrl}/savepost/${id}`);
  };

  allPostsSave = async (id) => {
    return await http.get(`${apiUrl}/postssave/${id}`);
  };

  deleteSavePost = async (id) => {
    return await http.post(`${apiUrl}/deletepostsave/${id}`);
  };

  // like / unlike post
  likePost = async (id) => {
    return await http.put(`${apiUrl}/post/${id}/like`);
  };

  addCommentPost = async (id, comment) => {
    return await http.post(`${apiUrl}/post/addpostcomment/${id}`, {
      comment,
    });
  };

  removeCommentPost = async (id, idComment) => {
    return await http.post(`${apiUrl}/post/deletepostcomment/${id}`, idComment);
  };

  render() {
    const { user } = this.context;
    return (
      <contextPosts.Provider
        value={{
          ...this.state,
          addNewPost: this.addNewPost,
          deletePost: this.deletePost,
          userPosts: this.userPosts,
          editPost: this.editPost,
          savePosts: this.savePosts,
          allPostsSave: this.allPostsSave,
          deleteSavePost: this.deleteSavePost,
          likePost: this.likePost,
          addCommentPost: this.addCommentPost,
          removeCommentPost: this.removeCommentPost,
          user: user,
        }}
      >
        {this.props.children}
      </contextPosts.Provider>
    );
  }
}

export default PostsContext;
