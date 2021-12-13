import React from "react";
import { contextUser } from "../../services/contexts/userContext";
import Form from "../common/form";
import Joi from "joi";
import { Redirect } from "react-router-dom";
import { toast } from "react-toastify";

class SignUp extends Form {
  static contextType = contextUser;

  state = {
    form: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      // headline: "",
    },
  };

  schema = {
    name: Joi.string().min(2).max(8).required(),
    lastName: Joi.string().min(2).max(8).required(),
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

  formData() {
    const { name, lastName, email, password } = this.state.form;

    const data = new FormData();
    data.append("name", name);
    data.append("lastName", lastName);
    data.append("email", email);
    data.append("password", password);
    // data.append("headline", headline);

    return data;
  }

  async doSubmit() {
    const data = this.formData();
    const { signUp } = this.context;
    try {
      await signUp(data);
      toast.success("You are registered successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.props.history.replace("/signin");
    } catch ({ response }) {
      if (response && response.status === 401) {
        this.setState({
          form: {
            password: "",
            email: "",
            name: "",
            lastName: "",
            // headline: "",
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
              <div className="d-flex flex-column  justify-content-center align-items-center">
                <h2>Sign Up</h2> <br />
                <div className="col-12">
                  <p>Register your account</p>
                </div>
                <form
                  className="col-xl-5 col-lg-5 col-md-10 col-10 mt-4"
                  onSubmit={this.handleSubmit}
                  noValidate="novalidate"
                  encType="multipart/form-data"
                >
                  <div class="row">
                    <div class="col-6">
                      {this.renderInput({
                        name: "name",
                        placeholder: "name",
                      })}
                    </div>
                    <div class="col-6">
                      {this.renderInput({
                        name: "lastName",
                        placeholder: "last Name",
                      })}
                    </div>

                    {/* <div className="col-12">
                      {this.renderInput({
                        name: "headline",
                        placeholder: "Profile Title",
                      })}
                    </div> */}

                    <div className="col-12">
                      {this.renderInput({
                        type: "email",
                        name: "email",
                        placeholder: "Email",
                      })}
                    </div>

                    <div className="col-12">
                      {this.renderInput({
                        type: "password",
                        name: "password",
                        placeholder: "Password",
                      })}
                    </div>
                  </div>

                  <div className="mt-3">
                    <button
                      style={{ background: "rgb(66 28 92)", color: "white" }}
                      className="btn "
                    >
                      Submit
                    </button>
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

export default SignUp;
