import React, { useContext, useState, useEffect } from "react";
import { contextPosts } from "../../services/contexts/postsContext";
import { contextUser } from "../../services/contexts/userContext";
import { Link } from "react-router-dom";
import { apiUrl } from "../../config.json";
import { Accordion } from "react-bootstrap";
import DeleteComment from "../user/deleteComment";
import { format } from "timeago.js";

const PostsUser = (props, posts) => {
  const postsContext = useContext(contextPosts);
  const userContext = useContext(contextUser);

  const { userPosts } = postsContext;
  const { user } = userContext;

  const [post, getPosts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function posts() {
      const filterUrl = props.match.path.split(["/"]);
      return getPosts(
        await userPosts(filterUrl[3]).then((response) => {
          const { data } = response;
          return data.reverse();
        })
      );
    }

    posts();
  }, [props.match.path, userPosts]);

  return (
    <>
      {post.length ? (
        post.map((p) => {
          return (
            <div
              className="timeline-profile p-3 pb-3 rounded mb-4 container-profile "
              key={p._id}
            >
              <div className="timeline-body mt-3">
                <div className="timeline-header">
                  <span
                    className="userimage"
                    style={{
                      borderRadius: "100%",
                      backgroundImage: `url("${apiUrl}/${p.userImage}")`,
                      backgroundSize: "cover",
                      backgroundPosition: "50% 30%",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <Link to={`/dashboard/userprofile/${p.user_id}`}></Link>
                  </span>
                  <span className="username">
                    <Link
                      to={`/dashboard/userprofile/${p.user_id}`}
                      style={{ textDecoration: "none" }}
                      className="ms-3"
                    >
                      <span className="postProfile-F-name-L-name">
                        {p.name} {p.lastName}
                      </span>
                    </Link>
                    <small></small>
                  </span>
                  <span className="float-end ">
                    <span
                      className="datePostProfile"
                      style={{ fontSize: "13px" }}
                    >
                      {format(p.created_At).toLocaleString()}
                    </span>
                  </span>
                </div>

                <div className="timeline-content ">
                  <span className="float-end edit-delete-posts-profile-btns">
                    {user._id === p.user_id ? (
                      <>
                        <Link
                          to={`/dashboard/userprofile/${user._id}/delete-post/${p._id}`}
                        >
                          <i
                            className="bi bi-trash btnAnimate"
                            title="Trash"
                          ></i>
                        </Link>
                        <Link to={`/dashboard/post/editpost/${p._id}`}>
                          <i
                            className="bi bi-pencil-fill ms-1 btnAnimate"
                            title="Edit"
                          ></i>
                        </Link>
                      </>
                    ) : null}
                  </span>

                  <p style={{ whiteSpace: "pre-line" }}>{p.description}</p>
                </div>

                <div className="timeline-likes timeline-footer pb-3">
                  <div className="stats-right">
                    {/* [------------- Amount Likes -------------] */}
                    <span className="stats-text">{p.likes.length} Likes</span>
                    {/* [------------- Amount Comments -------------] */}
                    <span className="stats-text">
                      {p.comments.length} Comments
                    </span>
                  </div>
                </div>
                {/* [------------- posts comments -------------] */}
                <div className="pt-4">
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
                                            backgroundPosition: "50% 30%",
                                            backgroundRepeat: "no-repeat",
                                          }}
                                        ></span>

                                        <span className="ms-xl-2 comment-name">
                                          <span>
                                            {comment.name} {comment.lastName}
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
              </div>
            </div>
          );
        })
      ) : (
        <p className="mt-5 d-flex justify-content-center">no posts yet ...</p>
      )}
    </>
  );
};

export default PostsUser;
