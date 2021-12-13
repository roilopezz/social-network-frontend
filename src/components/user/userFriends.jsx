import React, { useState, useEffect, useContext } from "react";
import { contextUser } from "../../services/contexts/userContext";
import { apiUrl } from "../../config.json";
import { Link } from "react-router-dom";

const Friends = (props) => {
  const userContext = useContext(contextUser);
  const [friends, setFriends] = useState([]);
  const { getFriends, user, deleteFriend } = userContext;

  let id = props.match.path.split(["/"])[3];
  useEffect(() => {
    window.scrollTo(0, 0);
    async function myFriend() {
      await getFriends(id).then((response) => {
        return setFriends(response.data);
      });
    }

    myFriend();
  }, [id, getFriends]);

  async function friendDel(id) {
    const FriendDelete = await deleteFriend(id);
    window.location.reload();
    return FriendDelete;
  }

  return (
    <div className="row pt-4 ">
      {friends
        .map((u) => {
          if (id === u.receiver.receiverId) {
            return (
              <div
                key={u._id}
                className="col-12 col-xl-4 col-lg-4 col-md-6 col-sm-6 pb-3"
              >
                <div className="card " style={{ borderRadius: "30px" }}>
                  <img
                    style={{ height: "200px", borderRadius: "30px" }}
                    className="card-img-top"
                    src={`${apiUrl}/${u.sender.imageSender}`}
                    alt="friendImage"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/dashboard/userprofile/${u.sender.senderId}`}
                      >
                        {u.sender.senderName}
                      </Link>
                      {user._id === id ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => friendDel(u._id)}
                          className="float-end"
                        >
                          <i className="bi bi-person-x-fill"></i>
                        </span>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          if (id === u.sender.senderId) {
            return (
              <div
                key={u._id}
                className="col-12 col-xl-4 col-lg-4 col-md-6 col-sm-6 pb-3"
              >
                <div className="card " style={{ borderRadius: "30px" }}>
                  <img
                    style={{ height: "200px", borderRadius: "30px" }}
                    className="card-img-top "
                    src={`${apiUrl}/${u.receiver.imageReceiver}`}
                    alt="imageFriend"
                  />
                  <div className="card-body">
                    <p className="card-text">
                      <Link
                        style={{ textDecoration: "none" }}
                        to={`/dashboard/userprofile/${u.receiver.receiverId}`}
                      >
                        {u.receiver.receiverName}
                      </Link>
                      {user._id === id ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => friendDel(u._id)}
                          className="float-end"
                        >
                          <i className="bi bi-person-x-fill"></i>
                        </span>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
          return null;
        })
        .reverse()}
    </div>
  );
};

export default Friends;
