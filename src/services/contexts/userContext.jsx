import React, { Component } from "react";
import http from "../../services/http";
import { apiUrl } from "../../config.json";

export const contextUser = React.createContext();

class UserContext extends Component {
  state = {
    errors: "",
  };
  signUp = async (data) => {
    return await http.post(`${apiUrl}/register`, data);
  };

  signOut = async () => {
    await http.post(`${apiUrl}/logout`);
    window.location = "/";
  };

  login = async ({ email, password }) => {
    await http.post(`${apiUrl}/login`, {
      email,
      password,
    });
  };

  getUserProfile = async (id) => {
    return await http.get(`${apiUrl}/profile/${id}`);
  };

  updateProfileImage = async (data, options) => {
    return await http.post(`${apiUrl}/updateProfileImage`, data, options);
  };

  updateCoverImage = async (data, options) => {
    return await http.post(`${apiUrl}/coverimage`, data, options);
  };

  editProfile = async (data) => {
    return await http.put(`${apiUrl}/editprofile`, data);
  };

  addConversation = async ({ senderId, receiverId }) => {
    return await http.post(`${apiUrl}/conversations`, { senderId, receiverId });
  };

  addFriends = async ({ senderId, receiverId }) => {
    return await http.post(`${apiUrl}/friends`, { senderId, receiverId });
  };

  getFriends = async (id) => {
    return await http.get(`${apiUrl}/friends/${id}`);
  };

  deleteFriend = async (id) => {
    return await http.delete(`${apiUrl}/friends/${id}`);
  };

  getConversations = async (id) => {
    return await http.get(`${apiUrl}/conversations/${id}`);
  };

  newNotifications = async ({ receiverId, userId }) => {
    return await http.post(`${apiUrl}/messages/newNotification`, {
      receiverId: receiverId,
      senderId: userId,
    });
  };

  clearNotifications = async (friendId) => {
    return await http.delete(
      `${apiUrl}/messages/notification/sender/${friendId}`
    );
  };

  getNotifications = async (id) => {
    return await http.get(`${apiUrl}/messages/notification/sender/${id}`);
  };

  getAllNotifications = async (id) => {
    return await http.get(`${apiUrl}/messages/notification/receiver/${id}`);
  };

  newMessages = async (message) => {
    return await http.post(`${apiUrl}/messages`, message);
  };

  getMessages = async (currentChatId) => {
    return await http.get(`${apiUrl}/messages/${currentChatId}`);
  };

  userInChatTrue = async (currentChatId) => {
    return await http.post(`${apiUrl}/messages/userInChatTrue`, currentChatId);
  };

  userInChatFalse = async () => {
    return await http.put(`${apiUrl}/messages/userInChatFalse`);
  };

  userInChat = async (receiverId) => {
    return await http.get(`${apiUrl}/messages/userInChat/${receiverId}`);
  };

  render() {
    const { user } = this.props;

    return (
      <contextUser.Provider
        value={{
          ...this.state,
          login: this.login,
          signOut: this.signOut,
          signUp: this.signUp,
          user: user,
          getUserProfile: this.getUserProfile,
          addFriends: this.addFriends,
          updateProfileImage: this.updateProfileImage,
          updateCoverImage: this.updateCoverImage,
          editProfile: this.editProfile,
          addConversation: this.addConversation,
          getConversations: this.getConversations,
          getFriends: this.getFriends,
          deleteFriend: this.deleteFriend,
          clearNotifications: this.clearNotifications,
          getNotifications: this.getNotifications,
          newMessages: this.newMessages,
          newNotifications: this.newNotifications,
          getMessages: this.getMessages,
          getAllNotifications: this.getAllNotifications,
          userInChatTrue: this.userInChatTrue,
          userInChatFalse: this.userInChatFalse,
          userInChat: this.userInChat,
        }}
      >
        {this.props.children}
      </contextUser.Provider>
    );
  }
}

export default UserContext;
