import { NavLink } from "react-router-dom";
import React, { useContext, useState, useEffect, useRef } from "react";
import { contextUser } from "../../services/contexts/userContext";
import { apiUrl } from "../../config.json";
import { io } from "socket.io-client";
import { Badge } from "@material-ui/core";

const SideNav = () => {
  const userContext = useContext(contextUser);
  const socket = useRef();
  const { user, getAllNotifications } = userContext;

  const [notification, setNotification] = useState([]);
  const [notificationFromSocketIo, getNotificationFromSocketIo] = useState([]);

  useEffect(() => {
    socket.current = io(apiUrl);
    socket.current.emit("addUser", user._id);
    socket.current.on("getNotification", (data) => {
      getNotificationFromSocketIo(data);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [user._id]);

  useEffect(() => {
    notificationFromSocketIo &&
      setNotification((prev) => [...prev, notificationFromSocketIo]);
  }, [notificationFromSocketIo]);

  useEffect(() => {
    const getNotification = async () => {
      try {
        const res = await getAllNotifications(user._id);
        setNotification(...notification, res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getNotification();
  }, [user._id, getAllNotifications]);

  async function getOnlineNotification() {
    const res = await getAllNotifications(user._id);
    socket.current.emit("addUser", user._id);
    return setNotification([...res.data]);
  }

  return (
    <nav
      className="container-nav"
      style={{
        backgroundColor: "rgb(66 28 92)",
        listStyleType: "none",
        color: "white",
        direction: "rtl",
      }}
    >
      <div className="sideNav">
        <NavLink
          onClick={() => getOnlineNotification()}
          activeStyle={{
            fontWeight: "bold",
          }}
          exact
          to="/dashboard"
          style={{ textDecoration: "none", color: "white" }}
          title="Profile"
          className="textSymbols"
        >
          <div className="m-2 ">
            <i className=" bi bi-house me-md-2 me-lg-2 me-xl-2  symbols "></i>
            <span
              className="sideNav-title
           d-none d-sm-inline d-sm-none d-md-inline
           "
            >
              Home
            </span>
          </div>
        </NavLink>
        <br />

        <NavLink
          onClick={() => getOnlineNotification()}
          activeStyle={{
            fontWeight: "bold",
          }}
          exact
          to={`${`/dashboard/userprofile/${user?._id}`}`}
          style={{ textDecoration: "none", color: "white" }}
          title="Profile"
          className="textSymbols"
        >
          <div className="m-2">
            <i className="bi bi-person-circle me-md-2 me-lg-2 me-xl-2 me-1 symbols"></i>
            <span
              className="sideNav-title
            d-none d-sm-inline d-sm-none d-md-inline
            "
            >
              Profile
            </span>
          </div>
        </NavLink>
        <br />

        <NavLink
          onClick={() => getOnlineNotification()}
          className="textSymbols"
          activeStyle={{
            fontWeight: "bold",
          }}
          to={`${`/dashboard/userprofile/${user?._id}/info`}`}
          style={{ textDecoration: "none", color: "white" }}
          title="About"
        >
          <div className="m-2">
            <i className=" bi bi-file-text me-md-2 me-lg-2 me-xl-2 me-1 symbols"></i>
            <span
              className="sideNav-title
            d-none d-sm-inline d-sm-none d-md-inline
            "
            >
              Info
            </span>
          </div>
        </NavLink>
        <br />
        <NavLink
          onClick={() => getOnlineNotification()}
          className="textSymbols"
          activeStyle={{
            fontWeight: "bold",
          }}
          to={`${`/dashboard/userprofile/${user?._id}/friends/`}`}
          style={{ textDecoration: "none", color: "white" }}
          title="Friends"
        >
          <div className="m-2">
            <i className="bi bi-people-fill me-md-2 me-lg-2 me-xl-2 me-1 symbols"></i>
            <span
              className="sideNav-title
        d-none d-sm-inline d-sm-none d-md-inline
        "
            >
              Friends
            </span>
          </div>
        </NavLink>
        <br />
        <NavLink
          onClick={() => getOnlineNotification()}
          className="textSymbols"
          activeStyle={{
            fontWeight: "bold",
          }}
          to={`${`/dashboard/userprofile/${user?._id}/save-posts/`}`}
          style={{ textDecoration: "none", color: "white" }}
          title="Saves"
        >
          <div className="m-2">
            <i className="bi bi-save2-fill me-md-2 me-lg-2 me-xl-2 me-1 symbols"></i>
            <span
              className="sideNav-title
        d-none d-sm-inline d-sm-none d-md-inline
        "
            >
              Saves
            </span>
          </div>
        </NavLink>

        <br />
        <NavLink
          className="textSymbols"
          activeStyle={{
            fontWeight: "bold",
          }}
          to={"/dashboard/messenger"}
          style={{ textDecoration: "none", color: "white" }}
          title="Chat"
        >
          <div className="m-2">
            <span
              onClick={() => getOnlineNotification()}
              className="chatIcon"
              style={{ position: "relative " }}
            >
              <Badge
                badgeContent={
                  notification?.length <= 0 ? null : notification.length
                }
                color="error"
              >
                <i className="bi bi-chat-square-dots-fill me-md-2 me-lg-2 me-xl-2 symbols"></i>
              </Badge>
              <span
                className="sideNav-title sideNav-title-chat
        d-none d-sm-inline d-sm-none d-md-inline
        "
              >
                Chat
              </span>
            </span>
          </div>
        </NavLink>
      </div>
    </nav>
  );
};

export default SideNav;
