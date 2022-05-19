import Form from "../common/form";
import React from "react";
import Joi from "joi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { contextUser } from "../../services/contexts/userContext";
import { contextPosts } from "../../services/contexts/postsContext";
class NewPost extends Form {
  static contextType = contextUser;
  static contextType = contextPosts;

  state = {
    form: {
      description: "",
    },
  };

  schema = {
    description: Joi.string().required().min(2).max(1024),
  };

  formData = () => {
    const { description } = this.state.form;
    const data = new FormData();
    // data.append("postTitle", postTitle);
    data.append("description", description);

    return data;
  };

  async doSubmit() {
    const data = this.formData();

    const { addNewPost } = this.context;
    try {
      await addNewPost(data);
      toast("You post created", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      this.props.history.replace("/");
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
                <span className="text-muted fw-bolder">
                  Share yours thoughts
                </span>
                <form
                  className="col-xl-5 col-lg-5 col-md-10 col-12 mt-4 text-center"
                  onSubmit={this.handleSubmit}
                  noValidate="novalidate"
                >
                  {/* {this.renderInput({
                    label: "postTitle",
                    name: "postTitle",
                    placeholder: "Title",
                    className: "text-center",
                  })} */}

                  {this.renderTextArea({
                    label: "description",
                    name: "description",
                    placeholder: "Write something...",
                    rows: "4",
                    className: "text-center",
                  })}

                  <div className="mt-3">
                    <button className="btn postBtnSubmit btnPost">
                      submit
                    </button>

                    <Link className="btn btn-secondary ms-2 btnPost" to="/">
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

export default NewPost;
