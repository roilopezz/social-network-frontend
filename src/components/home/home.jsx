import { Link, Redirect } from "react-router-dom";
import { useContext } from "react";
import { contextUser } from "../../services/contexts/userContext";
import Logo from "../common/logo";

const Home = () => {
  const userContext = useContext(contextUser);

  const { user } = userContext;

  if (user) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="bgHome min-vh-100  text-white text-center">
      <div className="d-flex flex-column justify-content-center align-items-center">
        <div className="">
          <Link
            style={{ background: "rgb(92, 28, 63)", color: "white" }}
            className="ms-2 btn "
            to="/signin"
          >
            Login
          </Link>
          <Link
            style={{ background: "rgb(92, 28, 63)", color: "white" }}
            className="ms-2 btn "
            to="/signup"
          >
            Register
          </Link>
          <div className="pt-5 ">
            <h1 className="display-1 homeTitle text-white">
              WELCOME TO{" "}
              <span className="text-muted fw-bolder">
                SOCIAL <Logo /> NET
              </span>
            </h1>
            <p className="pt-5 blockquote-footer content-home">
              <br />
              <br />
              TO LOG IN THE APP, PLEASE REGISTER OR LOG IN
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
