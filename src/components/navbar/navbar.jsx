import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { contextUser } from "../../services/contexts/userContext";
import { apiUrl } from "../../config.json";
import Logo from "../common/logo";

const NavBar = ({ user }) => {
  const context = useContext(contextUser);
  const { signOut } = context;

  function toTop() {
    window.scrollTo(0, 0);
  }
  return (
    <>
      <nav
        className="navbar navbar-expand-md navbar-dark  "
        style={{
          backgroundColor: "rgb(66 28 92)",
        }}
      >
        <div className="container-fluid">
          {user ? (
            <NavLink
              onClick={toTop}
              className=" navbar-brand text-white"
              exact
              to="/dashboard"
              style={{ textDecoration: "none" }}
            >
              <span className="text-white">
                Social <Logo /> Net
              </span>
            </NavLink>
          ) : (
            <NavLink
              onClick={toTop}
              className=" navbar-brand text-white "
              exact
              to="/"
              style={{ textDecoration: "none" }}
            >
              <span className="text-white ">
                Social <Logo /> Net
              </span>
            </NavLink>
          )}

          {user ? (
            <>
              <div style={{ cursor: "pointer" }}>
                <Link
                  to={`/dashboard/userprofile/${user._id}`}
                  style={{ textDecoration: "none" }}
                >
                  <span className="timeline-header">
                    <span
                      className="userimage userImageNavBottom"
                      style={{
                        borderRadius: "100%",
                        backgroundImage: `url("${apiUrl}/${user.image}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "50% 30%",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></span>
                  </span>
                </Link>

                <span onClick={() => signOut()}>
                  {/* <span className="text-white me-1"></span> */}
                  <i
                    className="bi bi-box-arrow-right   ms-2 me-2 text-white bold"
                    title="Sign Out"
                    style={{ fontSize: "23px", textDecoration: "none" }}
                  ></i>
                </span>
              </div>
            </>
          ) : (
            <div className="text-white">
              <a
                style={{ textDecoration: "none", color: "white" }}
                href="mailto:roilopez946@gmail.com"
              >
                <i
                  style={{ fontSize: "30px" }}
                  className="bi bi-envelope me-2"
                ></i>
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
