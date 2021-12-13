import { useEffect, useState, useRef, useContext } from "react";
import { apiUrl } from "../../config.json";
import "./conversation.css";
import { io } from "socket.io-client";
import { contextUser } from "../../services/contexts/userContext";

export default function Conversation({
  conversation,
  currentUser,
  search,
  allConversations,
}) {
  const userContext = useContext(contextUser);
  const friendId = conversation.members.find((m) => m !== currentUser._id);

  const { clearNotifications, getNotifications, userInChatFalse } = userContext;

  const socket = useRef();

  useEffect(() => {}, [currentUser, conversation]);
  const [notification, setNotification] = useState([]);
  const [notificationFromSocketIo, getNotificationFromSocketIo] = useState([]);

  async function clearNotification() {
    notification.map(async (user) => {
      if (user.receiverId === currentUser._id) {
        const res = await clearNotifications(friendId);
        return res;
      }
    });
  }

  useEffect(() => {
    socket.current = io(apiUrl);
    socket.current.emit("addUser", currentUser._id);
    socket.current.on("getNotification", (data) => {
      getNotificationFromSocketIo(data);
    });

    return async () => {
      await userInChatFalse();
      socket.current.disconnect();
    };
  }, [currentUser._id, userInChatFalse]);

  useEffect(() => {
    notificationFromSocketIo &&
      setNotification((prev) => [...prev, notificationFromSocketIo]);
  }, [notificationFromSocketIo]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const res = await getNotifications(friendId);
        setNotification(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNotification();
  }, [getNotifications, friendId]);

  const userConversations = allConversations.filter((u) => {
    if (u.receiver.receiverId === friendId) {
      return u.receiver.receiverName.includes(search.toLowerCase());
    }
    if (u.sender.senderId === friendId) {
      return u.sender.senderName.includes(search.toLowerCase());
    }
    return null;
  });

  const image = userConversations.map((u) => {
    if (u.sender.senderId === friendId) {
      return u.sender.imageSender;
    }
    if (u.receiver.receiverId === friendId) {
      return u.receiver.imageReceiver;
    }
    return null;
  });

  const name = userConversations.map((u) => {
    if (u.sender.senderId === friendId) {
      return u.sender.senderName;
    }
    if (u.receiver.receiverId === friendId) {
      return u.receiver.receiverName;
    }

    return null;
  });

  return (
    <>
      <div style={{ position: "relative" }}>
        {!image.length ? null : (
          <div className="conversation" onClick={() => clearNotification()}>
            <img
              className="conversationImg"
              src={`${apiUrl}/${image}`}
              alt=""
            />
            {notification.map((user) => {
              if (user.receiverId === currentUser._id) {
                return (
                  <span key={user._id} className="notificationChat ">
                    {notification.length}
                  </span>
                );
              }
              return null;
            })}

            <span className="conversationName">{name}</span>
          </div>
        )}
      </div>
    </>
  );
}
