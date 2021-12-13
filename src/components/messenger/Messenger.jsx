import "./messenger.css";
import Conversation from "../../components/conversation/conversation";
import Message from "../../components/message/Message";
import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { apiUrl } from "../../config.json";
import { contextUser } from "../../services/contexts/userContext";
import { Link } from "react-router-dom";

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [messageFromSocketIo, getMessageFromSocketIo] = useState(null);
  const [nameUserInChat, setNameUserInChat] = useState([]);
  const [idUserInChat, setIdUserInChat] = useState([]);
  const socket = useRef();
  const userContext = useContext(contextUser);

  const {
    user,
    getConversations,
    newMessages,
    newNotifications,
    getMessages,
    userInChat,
    userInChatTrue,
  } = userContext;

  useEffect(() => {
    window.scrollTo(0, 0);
    socket.current = io(apiUrl);
    socket.current.on("getMessage", (data) => {
      getMessageFromSocketIo({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
        image: data.image,
        name: data.name,
        lastName: data.lastName,
      });
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    messageFromSocketIo &&
      currentChat?.members.includes(messageFromSocketIo.sender) &&
      setMessages((prev) => [...prev, messageFromSocketIo]);
  }, [messageFromSocketIo, currentChat, user]);

  const [search, setSearch] = useState("");
  function handleChange(e) {
    setSearch(e.target.value);
  }

  // ---------get conversations from api------------ //
  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await getConversations(user._id);
        const { data } = res;
        setConversations(data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [user._id, getConversations]);

  // ---------get messages from api ------------ //
  useEffect(() => {
    const getMessage = async () => {
      try {
        const currentChatId = currentChat?._id;
        await userInChatTrue({
          currentChatId: currentChatId,
        });
        const res = await getMessages(currentChatId);
        setMessages(res.data);
        // clearNotification(idUserInChat);
      } catch (err) {
        console.log(err);
      }
    };
    getMessage();
  }, [currentChat, getMessages, userInChatTrue]);

  // ---------fetch users names to chat------------ //

  useEffect(() => {
    setNameUserInChat([]);
    setIdUserInChat([]);
    messages.map((m) =>
      conversations.map((conv) => {
        if (
          m.conversationId === conv._id &&
          conv.receiver.receiverId !== user._id
        ) {
          return (
            setNameUserInChat(conv.receiver.receiverName),
            setIdUserInChat(conv.receiver.receiverId)
          );
        }

        if (
          m.conversationId === conv._id &&
          conv.sender.senderId !== user._id
        ) {
          return (
            setNameUserInChat(conv.sender.senderName),
            setIdUserInChat(conv.sender.senderId)
          );
        }
        return null;
      })
    );
  }, [messages, conversations, user._id]);

  function formData() {
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    return message;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = formData();

    const receiverId = currentChat.members.find(
      (member) => member !== user._id.toString()
    );

    if (!newMessage.length) {
      return null;
    }

    socket.current.emit("sendMessage", {
      senderId: user._id.toString(),
      receiverId,
      text: newMessage,
      image: user.image,
      name: user.name,
      lastName: user.lastName,
    });

    const res = await newMessages(message);

    setMessages([...messages, res.data]);
    setNewMessage("");
    try {
      await userInChat(receiverId).then(async (response) => {
        if (
          response.data.online === false ||
          response.data.currentChatId !== currentChat._id ||
          response.data.currentChatId === "null"
          // typeof response.data.currentChatId === "null"
        ) {
          if (!message.text.length) {
            return null;
          }
          socket.current.emit("sendNotification", {
            senderName: user.name,
            senderLastName: user.lastName,
            receiverId: receiverId,
            senderId: user._id,
          });

          let userId = user._id;
          await newNotifications({ receiverId, userId });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-4 ">
      <div className="containerInputSearchMobile">
        <div className="input-group col-12  pb-4 input-search-mobile-container">
          <span className="input-group-text input-search-icon">
            <i className="bi bi-search"></i>
          </span>
          {/* [------------- Search Input -------------] */}
          <div>
            <span>
              <input
                className="form-control input-search-mobile"
                name="searchValue"
                value={search}
                onChange={handleChange}
                type="search"
                placeholder="Search for friends "
              />
            </span>
          </div>
        </div>
      </div>
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            {conversations
              .map((c) => (
                <div key={c._id} onClick={() => setCurrentChat(c)}>
                  <Conversation
                    conversation={c}
                    currentUser={user}
                    search={search}
                    allConversations={conversations}
                  />
                </div>
              ))
              .reverse()}
          </div>
        </div>
        <div className="chatBox col-xl-7 col-10 col-sm-10 col-xs-12">
          <div className="chatBoxWrapper ">
            {currentChat ? (
              <>
                {nameUserInChat.length <= 0 ? null : (
                  <span
                    style={{
                      textAlign: "right",
                      padding: "5px",
                      borderBottom: "1px solid rgba(128, 128, 128, 0.576)",
                      fontSize: "15px",
                      fontWeight: "600",
                      paddingRight: "20px",
                    }}
                  >
                    <Link
                      style={{ textDecoration: "none", color: "gray" }}
                      to={`/dashboard/userprofile/${idUserInChat}`}
                    >
                      {nameUserInChat}
                    </Link>
                  </span>
                )}

                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id}>
                      <Message
                        message={m}
                        own={m.sender === user._id}
                        src={`${apiUrl}/${m.image}`}
                      />
                    </div>
                  ))}
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="d-flex mt-2 me-2 containerSendMessage "
                >
                  <input
                    className="form-control inputMessenger "
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></input>
                  <button className="chatSubmitButton btn btn-primary">
                    Send
                  </button>
                </form>
              </>
            ) : (
              <span className="noConversationText ms-4 pt-5">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
