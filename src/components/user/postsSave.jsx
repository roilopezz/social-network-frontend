import React, { useContext, useState, useEffect } from "react";
import { contextPosts } from "../../services/contexts/postsContext";
import { Link } from "react-router-dom";
import { apiUrl } from "../../config.json";
import { Accordion } from "react-bootstrap";
import { format } from "timeago.js";
import DeleteSavePost from "./deleteSavePost";

const PostsSave = (props) => {
  const postsContext = useContext(contextPosts);
  const { allPostsSave, user } = postsContext;
  const [savePosts, SetSavePosts] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    async function allPostSave() {
      const filterUrl = props.match.path.split(["/"]);
      return SetSavePosts(
        await allPostsSave(filterUrl[3]).then((res) => {
          const { data } = res;
          return data.reverse();
        })
      );
    }

    allPostSave();
  }, [allPostsSave, props.match.path]);

  return (
    <>
      {savePosts.length ? (
        savePosts.map((p) => {
          return (
            <div className="mb-4 bg-white p-3 rounded" key={p._id}>
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
                  ></span>
                  <span className="username">
                    <Link
                      to={`/dashboard/userprofile/${p.user_id}`}
                      style={{ textDecoration: "none" }}
                      className="ms-3 postProfile-F-name-L-name"
                    >
                      {p.name} {p.lastName}
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
                  <span className="float-end">
                    {user._id === props.location.pathname.split(["/"])[3] ? (
                      <>
                        <DeleteSavePost postId={p._id} />
                        {/* <Link to={`/dashboard/save-post-delete/${p._id}`}>
                          <i
                            className="bi bi-x-square-fill text-danger"
                            title="Trash"
                          ></i>
                        </Link> */}
                      </>
                    ) : null}
                  </span>
                  <p>
                    <b>{p.postTitle}</b>
                  </p>
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
        <p className="mt-5 d-flex justify-content-center">
          no save posts yet ...
        </p>
      )}
    </>
  );
};

export default PostsSave;
