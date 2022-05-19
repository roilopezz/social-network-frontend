import { contextUser } from "../../services/contexts/userContext";
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

const AboutUser = (props) => {
  const userContext = useContext(contextUser);
  const { getUserProfile, user } = userContext;

  const [profileDetails, getUserProfileDetails] = useState({});
  const id = props.match.path.split(["/"])[3];
  useEffect(() => {
    window.scrollTo(0, 0);
    async function Details() {
      await getUserProfile(id).then((response) => {
        try {
          const { data } = response;
          return getUserProfileDetails(data);
        } catch ({ response }) {
          if (response && response.data.status === 404) {
            console.log(response.data);
          }
        }
      });
    }

    Details();
  }, [getUserProfile, id]);

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <div className="col-12 bg-white ">
      <div className="col-md-12">
        <div className="card mb-3 pt-2">
          <div className="card-body">
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Full Name</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <span>{profileDetails.name}</span>{" "}
                <span>{profileDetails.lastName}</span>{" "}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Email</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                <span>{profileDetails.email}</span>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Phone</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {profileDetails.phone}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0"> Birthday</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {new Date(profileDetails.birthday).toLocaleString(
                  "en-US",
                  options
                )}
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Headline</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {profileDetails.headline}
              </div>
            </div>
            <hr />

            <div className="row">
              <div className="col-sm-3">
                <h6 className="mb-0">Address</h6>
              </div>
              <div className="col-sm-9 text-secondary">
                {profileDetails.city} {profileDetails.street}
              </div>
            </div>
            {user._id === id ? (
              <>
                <hr />
                <div className="row">
                  <div>
                    <Link
                      className="float-start btn btnToEditProfile"
                      to={`/dashboard/userprofile/${id}/editprofile`}
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUser;
