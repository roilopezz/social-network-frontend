import React, { useContext, useEffect, useState, useRef } from "react";
import { contextUser } from "../../services/contexts/userContext";
import { Link } from "react-router-dom";
import { io } from "socket.io-client";
import AddCommentPost from "../user/addCommentPost";
import DeleteComment from "../user/deleteComment";
import { Accordion } from "react-bootstrap";
import { apiUrl } from "../../config.json";
import { format } from "timeago.js";
import LikePost from "../user/likePost";
import DeleteSavePost from "../user/deleteSavePost";
import SavePost from "../user/savePost";
import LoaderPosts from "../common/loader/loaderPosts";
const TimeLine = (props) => {
  const socket = useRef();
  const userContext = useContext(contextUser);
  const { user } = userContext;

  const [posts, getPosts] = useState([]);
  const [users, setUsers] = useState([]);

  /// ------------ [- search input -] ------------ ///
  const [search, setSearch] = useState("");
  function handleChange(e) {
    setSearch(e.target.value);
  }

  useEffect(() => {
    window.scrollTo(0, 0);

    socket.current = io(apiUrl);
    socket.current.on("get-posts", (data) => {
      if (!data.length) {
        return null;
      }
      if (data.length) {
        const dataPosts = data.reverse().slice(0, 100);
        getPosts(dataPosts);
      }
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const getUsers = async () => {
      socket.current.on("get-users", (data) => {
        if (!data.length) {
          return null;
        }
        if (data.length) {
          setUsers(data);
        }
      });
    };
    getUsers();
  }, [search]);

  const { savePosts } = user;

  function CheckPostSave(postId) {
    return savePosts.some(
      (postSave) => postSave._id.toString() === postId.toString()
    );
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center pt-3 pb-5 min-vh-100">
        <div className="d-flex justify-content-center align-items-center"></div>
        <div className="col-xl-6 col-12">
          <div id="content" className="content content-full-width">
            <div className="d-flex justify-content-center align-items-center ">
              <div className="input-group inputSearch ">
                <span className="input-group-text">
                  <i className="bi bi-search"></i>
                </span>
                {/* [------------- Search Input -------------] */}
                <div>
                  <span>
                    <input
                      value={search}
                      onChange={handleChange}
                      className="form-control serInput"
                      name="searchValue"
                      type="search"
                      placeholder="search"
                    />
                  </span>
                </div>
              </div>

              {/* [------------- Add new Post button -------------] */}
              <div>
                <Link to={`/dashboard/share-post/${user._id}`}>
                  <button
                    style={{
                      backgroundColor: "rgb(92, 28, 63)",
                      color: "white",
                    }}
                    className="btn btn-post "
                  >
                    Post
                  </button>
                </Link>
              </div>
            </div>
            <div className="input-group inputSearchShowOnlyPhones ">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
              {/* [------------- Search Input -------------] */}
              <div>
                <span>
                  <input
                    value={search}
                    onChange={handleChange}
                    className="form-control serInput"
                    name="searchValue"
                    type="search"
                    placeholder="search"
                  />
                </span>
              </div>
            </div>

            {search.length ? (
              <div className="searchMembers">
                {users.map((u) => {
                  let name = u.name + u.lastName;
                  if (
                    name
                      .toLowerCase()
                      .includes(search.toLocaleLowerCase().replace(" ", ""))
                  ) {
                    return (
                      <div key={u._id}>
                        <Link
                          style={{ textDecoration: "none" }}
                          to={`/dashboard/userprofile/${u._id}`}
                        >
                          <div key={u._id} className="pt-2">
                            <img
                              className="me-2"
                              height="30"
                              width="30"
                              style={{ borderRadius: "100%" }}
                              src={`${apiUrl}/${u.image}`}
                              alt="userPhoto"
                            />
                            {u.name} {u.lastName}
                          </div>
                        </Link>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            ) : null}

            {posts.length ? (
              <div className="tab-content p-0">
                <div id="profile-post">
                  <ul className="timeline">
                    {posts.map((p) => {
                      return (
                        <li key={p._id} className="pt-4">
                          <div className="bg-white  p-3 container-posts">
                            <div className="timeline-header pt-2">
                              {/* [------------- User img -------------] */}
                              <Link to={`/dashboard/userprofile/${p.user_id}`}>
                                <span
                                  className="userimage"
                                  style={{
                                    borderRadius: "100%",
                                    backgroundImage: `url("${apiUrl}/${p.userImage}")`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "50% 30%",
                                    backgroundRepeat: "no-repeat",
                                  }}
                                ></span>
                              </Link>
                              {/* [------------- Profile User -------------] */}
                              <span className="username">
                                <Link
                                  to={`/dashboard/userprofile/${p.user_id}`}
                                  style={{ textDecoration: "none" }}
                                >
                                  <span className="userDetails">
                                    {p.name} {p.lastName}
                                  </span>
                                  <span
                                    className="float-end createdAt-Posts"
                                    style={{ fontSize: "13px" }}
                                  >
                                    <span className="datePost">
                                      {format(p.created_At).toLocaleString()}
                                    </span>
                                  </span>
                                </Link>

                                <small></small>
                              </span>
                            </div>
                            {/* [------------- Post Title + Post Description -------------] */}
                            <div className="timeline-content">
                              {/* <p>
                                <b>{p.postTitle}</b>
                              </p> */}
                              <p style={{ whiteSpace: "pre-line" }}>
                                {p.description}
                              </p>
                            </div>
                            <div className="timeline-likes">
                              <div className="stats-right">
                                <span className="comAndLik">
                                  {/* [------------- Amount Comments -------------] */}

                                  <span className="stats-text">
                                    {p.comments.length} Comments
                                  </span>
                                  {/* [------------- Amount Likes -------------] */}
                                  <span className="stats-text">
                                    {p.likes.length} Likes
                                  </span>
                                </span>
                              </div>
                            </div>
                            <div className="timeline-footer pb-4 pt-4">
                              {/* [------------- Post Like / Post UnLike -------------] */}

                              <LikePost
                                user={user}
                                likes={p.likes}
                                postId={p._id}
                                props={props}
                              />

                              {/* [------------- Save Post / UnSave Post -------------] */}
                              {CheckPostSave(p._id) ? (
                                <DeleteSavePost postId={p._id} props2={props} />
                              ) : (
                                <SavePost postId={p._id} />
                              )}

                              {/* [------------- Delete Post / Edit Post -------------] */}

                              {user._id === p.user_id ? (
                                <>
                                  <Link to={`/dashboard/delete-post/${p._id}`}>
                                    <i
                                      className="bi bi-trash ms-5 btnAnimate"
                                      title="Trash"
                                    ></i>
                                  </Link>

                                  <Link
                                    to={`/dashboard/post/editpost/${p._id}`}
                                  >
                                    <i
                                      className="bi bi-pencil-fill ms-1 btnAnimate"
                                      title="Edit"
                                    ></i>
                                  </Link>
                                </>
                              ) : null}
                            </div>

                            {/* [------------- posts comments -------------] */}

                            <div>
                              {p.comments.length <= 0 ? null : (
                                <Accordion className="">
                                  <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                      <span className="viewComments">
                                        View {p.comments.length} comments
                                        <i className="ms-1 ms-xl-2 bi bi-chat"></i>
                                      </span>
                                    </Accordion.Header>

                                    <Accordion.Body>
                                      {p.comments
                                        .map((comment) => (
                                          <div
                                            key={comment._id}
                                            className="timeline-footer mb-3"
                                          >
                                            <span className="float-end">
                                              <span
                                                style={{
                                                  fontSize: "13px",
                                                }}
                                              >
                                                <span className="dateComment">
                                                  {format(
                                                    comment.created_At
                                                  ).toLocaleString()}
                                                </span>
                                              </span>
                                            </span>

                                            <b>
                                              <span className="timeline-header">
                                                <Link
                                                  style={{
                                                    textDecoration: "none",
                                                  }}
                                                  to={`/dashboard/userprofile/${comment.user_id}`}
                                                >
                                                  <span className="commentDetails">
                                                    <span
                                                      className="userimage "
                                                      style={{
                                                        borderRadius: "100%",

                                                        backgroundImage: `url("${apiUrl}/${comment.userImage}")`,
                                                        backgroundSize: "cover",
                                                        backgroundPosition:
                                                          "50% 30%",
                                                        backgroundRepeat:
                                                          "no-repeat",
                                                      }}
                                                    ></span>

                                                    <span className="ms-xl-2 comment-name">
                                                      <span>
                                                        {comment.name}{" "}
                                                        {comment.lastName}
                                                      </span>
                                                    </span>
                                                  </span>
                                                </Link>
                                              </span>
                                            </b>

                                            <div className="mt-2 commentContent">
                                              {comment.comment}
                                              {user._id === comment.user_id ? (
                                                <span className="float-end">
                                                  <DeleteComment
                                                    props={props}
                                                    post={p._id.toString()}
                                                    commentId={comment}
                                                    user={user}
                                                  />
                                                </span>
                                              ) : null}
                                            </div>
                                          </div>
                                        ))
                                        .reverse()}
                                    </Accordion.Body>
                                  </Accordion.Item>
                                </Accordion>
                              )}
                            </div>

                            <div className="timeline-comment-box pt-4 rounded">
                              <div className="user">
                                <i className="bi bi-person-circle personIcon"></i>
                              </div>
                              <div className="input">
                                <AddCommentPost
                                  post={p._id}
                                  props={props}
                                  user={user}
                                />
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            ) : (
              <>
                <LoaderPosts />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeLine;
