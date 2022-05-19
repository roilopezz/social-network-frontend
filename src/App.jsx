import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PageNotFound from "./components/common/pageNotFound";
import Dashboard from "./components/dashboard/dashboard";
import NavBar from "./components/navbar/navbar";
import SideNav from "./components/sideNav/sideNav";
import SignUp from "./components/signup/signup";
import SignIn from "./components/signin/siginin";
import Home from "./components/home/home";
import http from "./services/http";
import { apiUrl } from "./config.json";

// context //
import UserContext from "./services/contexts/userContext";
import PostsContext from "./services/contexts/postsContext";
import Loader from "./components/common/loader/loader";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      await http.get(`${apiUrl}/user`).then((response) => {
        setUser(response.data);
      });
    }

    getUser();
  }, []);

  function toTop() {
    window.scrollTo(0, 0);
  }

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="App">
      <ToastContainer />
      <UserContext user={user}>
        <PostsContext user={user}>
          {/* <header className="fixed-top">{user ? <SideNav /> : null}</header> */}
          <header className="fixed-top">{user ? <SideNav /> : null}</header>
          <Switch>
            <Route user={user} exact path="/" component={Home} />
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            {!user ? (
              <Loader />
            ) : (
              <Route path="/dashboard" component={Dashboard} />
            )}

            <Route component={PageNotFound} />
          </Switch>

          <footer className="fixed-bottom">
            {scrollPosition > 400 ? (
              <span
                onClick={toTop}
                style={{
                  position: "absolute",
                  zIndex: "1",
                  bottom: "-6px",
                  left: "10px",
                }}
                className="btn mb-5 arrowToTop"
              >
                <i
                  className="bi bi-caret-up-fill"
                  style={{
                    fontSize: "50px",
                    transform: "scale(2,3)",
                  }}
                ></i>
              </span>
            ) : null}

            <NavBar user={user} />
          </footer>
        </PostsContext>
      </UserContext>
    </div>
  );
};

export default App;
