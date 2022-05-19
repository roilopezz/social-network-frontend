import { Switch, Route } from "react-router-dom";

import UserProfile from "../user/userProfile";
import NewPost from "../user/newPost";
import DeletePost from "../user/deletePost";
import EditPost from "../user/editPost";
import SavePost from "../user/savePost";
import DeleteSavePost from "../user/deleteSavePost";
import LikePost from "../user/likePost";
import AddCommentPost from "../user/addCommentPost";
import TimeLine from "../timeLine/timeLine";
import Messenger from "../messenger/Messenger";
import PageNotFound from "../common/pageNotFound";

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid pb-5">
        <div className="row  dashboard pt-xl-3 pt-lg-3 pt-md-3 pt-sm-3">
          {/* <SideNav notification={notification} /> */}
          <main>
            {/* <main className="  col-xl-11 col-10 px-md-5 ms-sm-auto ms-xs-auto container-dashboard"> */}
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 ">
              <h1 className="h2"> </h1>
            </div>
            <div>
              <div className="row">
                <Switch>
                  {/* ------------------------- TimeLine--------------------- */}

                  <Route exact path="/dashboard" component={TimeLine} />

                  {/* -------------------------User Profile---------------------- */}
                  <Route
                    path="/dashboard/userprofile/:id"
                    component={UserProfile}
                  />

                  {/* -------------------------messenger---------------------- */}
                  <Route path="/dashboard/messenger" component={Messenger} />

                  {/* -------------------------New Post---------------------- */}
                  <Route path="/dashboard/share-post/:id" component={NewPost} />

                  {/* -------------------------Delete Post---------------------- */}
                  <Route
                    path="/dashboard/delete-post/:id"
                    component={DeletePost}
                  />

                  {/* -------------------------Edit Post---------------------- */}
                  <Route
                    path="/dashboard/post/editpost/:id"
                    component={EditPost}
                  />

                  {/* -------------------------User Save Post---------------------- */}
                  <Route path="/dashboard/save-post/:id" component={SavePost} />

                  {/* -------------------------User delete Save Post---------------------- */}
                  <Route
                    path="/dashboard/save-post-delete/:id"
                    component={DeleteSavePost}
                  />

                  {/* -------------------------Like Post---------------------- */}
                  <Route path="/dashboard/post/:id/like" component={LikePost} />

                  {/* -------------------------Add Comment Post---------------------- */}
                  <Route
                    path="/dashboard/add-comment/:id"
                    component={AddCommentPost}
                  />
                  {/* -------------------------Page Not Found---------------------- */}
                  <Route component={PageNotFound} />
                </Switch>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
