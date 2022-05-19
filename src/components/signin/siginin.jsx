import React from "react";
import { contextUser } from "../../services/contexts/userContext";
import { toast } from "react-toastify";
import Form from "../common/form";
import Joi from "joi";
import { Link, Redirect } from "react-router-dom";

class SignIn extends Form {
  static contextType = contextUser;

  state = {
    form: {
      email: "",
      password: "",
    },
    userOnline: null,
  };

  schema = {
    email: Joi.string()
      .required()
      .email({
        tlds: { allow: false },
      })
      .label("Email"),
    password: Joi.string().required().min(6).label("Password"),
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    const { user } = this.context;
    this.setState({ userOnline: user });
    if (user) {
      toast(
        <span>
          <span className="me-2">
            <b>Welcome</b>
          </span>
          <span>
            {user.name} {user.lastName}
          </span>
          <span className="ms-2 text-danger">❤</span>
        </span>,
        {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }
      );
    }
  }

  async doSubmit() {
    const { email, password } = this.state.form;
    const { login } = this.context;

    try {
      await login({ email, password });
      window.location.reload();
    } catch ({ response }) {
      if (response && response.status === 401) {
        this.setState({
          form: {
            email: "",
            password: "",
          },
        });

        toast.error(response.data, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  }

  render() {
    const { errors, user } = this.context;

    if (user) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <div>
        <div className="d-flex flex-column min-vh-100 pt-5">
          <div>
            <div className="container text-center pt-5">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h2>Sign In</h2> <br />
                <div className="col-12">
                  <p>Login your account</p>
                </div>
                <form
                  className="col-xl-5 col-lg-5 col-md-10 col-10 mt-4"
                  onSubmit={this.handleSubmit}
                  noValidate="novalidate"
                >
                  {this.renderInput({
                    type: "email",
                    label: "email",
                    name: "email",
                    placeholder: "Email",
                  })}

                  {this.renderInput({
                    type: "password",
                    label: "password",
                    name: "password",
                    placeholder: "Password",
                  })}

                  <div className="mt-3">
                    <button
                      style={{ background: "rgb(66 28 92)", color: "white" }}
                      className="btn"
                    >
                      Login
                    </button>
                    <Link
                      style={{ background: "rgb(66 28 92)", color: "white" }}
                      className="ms-2 btn"
                      to="/signup"
                    >
                      Register
                    </Link>
                  </div>
                </form>
                <div className="pt-3">{errors}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SignIn;
