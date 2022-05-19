import React, { useState, useEffect, useContext } from "react";
import { contextUser } from "../../services/contexts/userContext";
import { Route, Switch, NavLink } from "react-router-dom";
import PostsUser from "./postsUser";
import AboutUser from "./about";
import PostsSave from "./postsSave";
import { apiUrl } from "../../config.json";
import { Link } from "react-router-dom";
import EditProfile from "./editProfile";
import UpdateProfileImage from "./updateProfileImage";
import UpdateCoverImage from "./updateCoverImage";
import DeletePost from "./deletePost";
import Friends from "../user/userFriends";
import LoaderProfile from "../common/loader/loaderProfile";
const UserProfile = (props) => {
  const userContext = useContext(contextUser);

  const { getUserProfile, user, addConversation, addFriends, getFriends } =
    userContext;

  const [userProfile, getProfileUser] = useState([]);
  const [friends, setFriends] = useState([]);
  const [relationship, checkRelationship] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    async function profileUser() {
      const { data } = await getUserProfile(props.match.params.id);
      return getProfileUser(data);
    }

    async function myFriend() {
      const { data } = await getFriends(props.match.params.id);
      return setFriends(data);
    }

    profileUser();
    myFriend();
  }, [props.match.params.id, getFriends, getUserProfile]);

  useEffect(() => {
    friends.some((friend) => {
      if (friend.members.includes(user._id.toString(), props.match.params.id)) {
        return checkRelationship(true);
      }
      return checkRelationship(false);
    });
  }, [friends, props.match.params.id, user._id]);

  async function addConv(senderId, receiverId) {
    await addConversation({ senderId, receiverId });
    window.location = "/dashboard/messenger";
  }

  async function addFriend(senderId, receiverId) {
    await addFriends({ senderId, receiverId });
    window.location.reload();
  }

  return (
    <div className=" d-flex justify-content-center align-items-center container-user-profile pt-4 pb-5 ">
      <div
        key={userProfile._id}
        style={{ textDecoration: "none" }}
        className="col-12 col-xl-6 "
      >
        {!userProfile.coverImage ? (
          <div className="profile-header-content">
            <div className="profile-header-info">
              <LoaderProfile />
            </div>
          </div>
        ) : (
          <>
            <div className="profile-header">
              <img
                className="img-fluid rounded profile-header-cover "
                src={`${apiUrl}/${userProfile.coverImage}`}
                alt="coverImage"
              />

              <div className="profile-header-content">
                <Link
                  to={
                    user._id === userProfile._id
                      ? `/dashboard/userprofile/${user._id}/updateprofileimage`
                      : props.location.pathname
                  }
                >
                  <div
                    style={{
                      borderRadius: "100%",
                      backgroundImage: `url("${apiUrl}/${userProfile.image}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "50% 30%",
                      backgroundRepeat: "no-repeat",
                    }}
                    className="profile-header-img me-4"
                  ></div>
                </Link>

                <div className="profile-header-info">
                  <h4 className="m-t-10 m-b-5 profileName">
                    {userProfile.name} {userProfile.lastName}
                  </h4>

                  <p className="m-b-10 profileTeam ">{userProfile.headline}</p>

                  {user._id !== props.match.params.id ? (
                    <>
                      <p
                        className="btnsProfile"
                        onClick={() => addConv(user._id, props.match.params.id)}
                      >
                        <button
                          className="btn btn-sm mb-2  text-white btnProfile "
                          style={{
                            backgroundColor: "rgba(14, 81, 153, 0.467)",
                          }}
                        >
                          Send Message
                        </button>
                      </p>
                    </>
                  ) : null}

                  {user._id === props.match.params.id ? (
                    <p className="btnsProfile">
                      <Link
                        to={`/dashboard/userprofile/${user._id}/updateCoverImage`}
                        className="btn btn-sm mb-2  text-white btnProfile"
                        style={{ backgroundColor: "rgba(14, 81, 153, 0.467)" }}
                      >
                        Cover Photo
                      </Link>
                    </p>
                  ) : // <div className="p-4"></div>
                  null}
                </div>
              </div>
              {/* -------------------------profile nav tabs---------------------- */}
              <ul className="profile-header-tab nav nav-tabs">
                {user._id !== props.match.params.id ? (
                  <li>
                    {relationship ? null : (
                      <button
                        className="btn  text-dark"
                        onClick={() =>
                          addFriend(user._id, props.match.params.id)
                        }
                      >
                        <i className="bi bi-person-plus"></i>
                      </button>
                    )}
                  </li>
                ) : null}
                {/* -------------------------Save Posts the tab show if user is the correct user---------------------- */}
                {user._id === props.match.params.id ? (
                  <li className="nav-item">
                    <NavLink
                      exact
                      to={`/dashboard/userprofile/${userProfile._id}/save-posts`}
                      className="nav-link"
                      data-toggle="tab"
                    >
                      SAVE POSTS
                    </NavLink>
                  </li>
                ) : null}
                {/* -------------------------User Friends---------------------- */}
                <li className="nav-item">
                  <NavLink
                    to={`/dashboard/userprofile/${userProfile._id}/friends`}
                    exact
                    className="nav-link "
                    data-toggle="tab"
                  >
                    FRIENDS
                  </NavLink>
                </li>
                {/* -------------------------About User Profile---------------------- */}
                <li className="nav-item">
                  <NavLink
                    to={`/dashboard/userprofile/${userProfile._id}/info`}
                    exact
                    className="nav-link "
                    data-toggle="tab"
                  >
                    INFO
                  </NavLink>
                </li>
                {/* /* -------------------------User Posts---------------------- */}{" "}
                <li className="nav-item">
                  <NavLink
                    to={`/dashboard/userprofile/${userProfile._id}/`}
                    exact
                    className="nav-link"
                    data-toggle="tab"
                  >
                    <span className="profileNavPosts">PROFILE</span>
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* -------------------------------------[[---Show tabs---]]------------------------------------- */}

            {/* -------------------------User Posts---------------------- */}
            <Switch>
              <Route
                exact
                path={`/dashboard/userprofile/${props.match.params.id}/`}
                component={PostsUser}
              />

              {/* -------------------------About User Profile---------------------- */}
              <Route
                exact
                path={`/dashboard/userprofile/${userProfile._id}/info`}
                component={AboutUser}
              />

              {/* ------------------------- User Friends---------------------- */}
              <Route
                exact
                path={`/dashboard/userprofile/${userProfile._id}/friends`}
                component={Friends}
              />

              {/* -------------------------Save Posts---------------------- */}
              <Route
                exact
                path={`/dashboard/userprofile/${userProfile._id}/save-posts`}
                component={PostsSave}
              />

              {/* -------------------------Edit Profile---------------------- */}
              <Route
                exact
                path={`/dashboard/userprofile/${userProfile._id}/editprofile`}
                component={EditProfile}
              />

              {/* -------------------------Update Profile image---------------------- */}
              <Route
                exact
                path={`/dashboard/userprofile/${user._id}/updateprofileimage`}
                component={UpdateProfileImage}
              />

              {/* -------------------------Update Cover image---------------------- */}
              <Route
                exact
                path={`/dashboard/userprofile/${user._id}/updateCoverImage`}
                component={UpdateCoverImage}
              />

              {/* -------------------------Delete Post---------------------- */}
              <Route
                path="/dashboard/userprofile/:id/delete-post/:id"
                component={DeletePost}
              />
            </Switch>
          </>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
