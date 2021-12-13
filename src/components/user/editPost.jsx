import React from "react";
import Form from "../common/form";
import Joi from "joi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import { contextPosts } from "../../services/contexts/postsContext";

class EditPost extends Form {
  static contextType = contextPosts;

  state = {
    form: {
      description: "",
    },
    user: null,
  };

  mapToViewModel({ description }) {
    return {
      description,
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    const { userPosts, user } = this.context;

    const userPo = await userPosts(user._id).then((response) => {
      const { data } = response;
      return data.find((post) => {
        if (post._id !== this.props.match.params.id) {
          return null;
        }
        return post;
      });
    });

    this.setState({ user: user, form: this.mapToViewModel(userPo) });
  }

  schema = {
    description: Joi.string().required().min(2).max(1024),
  };

  formData = () => {
    const { description } = this.state.form;

    return { description };
  };

  async doSubmit() {
    const data = this.formData();
    const { editPost } = this.context;
    try {
      await editPost(this.props.match.params.id, data.description);
      toast.success("You post Edit successfully ", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      this.props.history.goBack();
    } catch ({ response }) {
      if (response && response.status === 400) {
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
    const { errors } = this.context;

    return (
      <div>
        <div className="d-flex flex-column min-vh-100">
          <div>
            <div className="container text-center pt-5">
              <div className="d-flex flex-column justify-content-center align-items-center">
                <h2>Edit Post</h2> <br />
                <div className="col-12"></div>
                <form
                  className="col-xl-5 col-lg-5 col-md-10 col-12 mt-4"
                  onSubmit={this.handleSubmit}
                  noValidate="novalidate"
                >
                  {this.renderTextArea({
                    label: "description",
                    name: "description",
                    placeholder: "Description",
                    rows: "4",
                    className: "text-center",
                  })}

                  <div className="mt-3 ">
                    <button className="btn   postBtnSubmit btnPost">
                      submit
                    </button>

                    <Link
                      className="btn btn-secondary ms-2 btnPost"
                      to="/dashboard"
                    >
                      Cancel
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

export default EditPost;
