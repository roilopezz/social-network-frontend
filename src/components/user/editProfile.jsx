import React from "react";
import { contextUser } from "../../services/contexts/userContext";
import { Link } from "react-router-dom";
import Joi from "joi";
import Form from "../common/form";
import { toast } from "react-toastify";

class EditProfile extends Form {
  static contextType = contextUser;

  state = {
    form: {
      name: "",
      lastName: "",
      birthday: "",
      city: "",
      headline: "",
      phone: "",
      street: "",
    },
  };

  mapToViewModel({ name, lastName, birthday, phone, city, street, headline }) {
    return {
      name,
      lastName,
      birthday,
      phone,
      city,
      street,
      headline,
    };
  }

  async componentDidMount() {
    window.scrollTo(0, 0);
    const id = this.props.match.path.split(["/"])[3];
    const { getUserProfile, user } = this.context;
    const userPo = await getUserProfile(id).then((response) => {
      const { data } = response;

      if (data._id !== user._id) {
        return null;
      }

      return data;
    });
    this.setState({ form: this.mapToViewModel(userPo) });
  }

  schema = {
    city: Joi.string().min(2).max(255),
    street: Joi.string().min(2).max(255),
    birthday: Joi.string().min(10).max(24),
    name: Joi.string().min(2).max(8),
    lastName: Joi.string().min(2).max(8),
    headline: Joi.string().min(2).max(24),
    phone: Joi.string()
      .min(9)
      .max(10)
      .regex(/^0[2-9]\d{7,8}$/),
  };

  formData = () => {
    const { name, lastName, birthday, phone, city, street, headline } =
      this.state.form;
    const data = new FormData();
    data.append("name", name);
    data.append("lastName", lastName);
    data.append("birthday", birthday);
    data.append("phone", phone);
    data.append("city", city);
    data.append("street", street);
    data.append("headline", headline);

    return data;
  };

  async doSubmit() {
    const { editProfile } = this.context;

    const data = this.formData();

    try {
      await editProfile(data);
      const id = this.props.match.path.split(["/"])[3];
      window.location = `/dashboard/userprofile/${id}/info`;
    } catch ({ response }) {
      if (response && response.status >= 400) {
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
    return (
      <div className="col-12 bg-white ">
        <div className="col-md-12">
          <div className="card mb-3 pt-2">
            <div className="card-body">
              <form onSubmit={this.handleSubmit} noValidate="novalidate">
                <div className="col-sm-3">
                  <h6 className="mb-0">Full Name</h6>
                  <span>
                    {this.renderInput({
                      label: "name",
                      name: "name",
                      placeholder: "name",
                    })}
                    {this.renderInput({
                      label: "lastName",
                      name: "lastName",
                      placeholder: "lastName",
                    })}
                  </span>
                </div>
                <hr />

                <div className="col-sm-3">
                  <h6 className="mb-0">Phone</h6>
                  <span>
                    {this.renderInput({
                      label: "phone",
                      name: "phone",
                      placeholder: "phone",
                    })}
                  </span>
                </div>
                <hr />
                <div className="col-sm-3">
                  <h6 className="mb-0">Birthday</h6>
                  <span>
                    {this.renderInput({
                      type: "date",
                      label: "birthday",
                      name: "birthday",
                      placeholder: "birthday",
                    })}
                  </span>
                </div>
                <hr />
                <div className="col-sm-3">
                  <h6 className="mb-0">Headline</h6>
                  <span>
                    {this.renderInput({
                      label: "headline",
                      name: "headline",
                      placeholder: "headline",
                    })}
                  </span>
                </div>
                <hr />
                <div className="col-sm-3">
                  <h6 className="mb-0">Address</h6>
                  <span>
                    {this.renderInput({
                      label: "city",
                      name: "city",
                      placeholder: "city",
                    })}
                    {this.renderInput({
                      label: "street",
                      name: "street",
                      placeholder: "street",
                    })}
                  </span>
                </div>

                <div className="mt-3">
                  <button type="submit" className="btn btn-primary">
                    submit
                  </button>

                  <Link
                    className="btn btn-dark ms-2"
                    to={`/dashboard/userprofile/${
                      this.props.match.path.split(["/"])[3]
                    }/about`}
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditProfile;
