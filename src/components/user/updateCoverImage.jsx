import React, { useContext, useEffect, useState } from "react";
import { contextUser } from "../../services/contexts/userContext";
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Typography from "@material-ui/core/Typography";
import LinearProgress from "@material-ui/core/LinearProgress";
const UpdateCoverImage = (props) => {
  const userContext = useContext(contextUser);
  const { updateCoverImage } = userContext;

  const [image, setImage] = useState("");
  const [open, setOpen] = useState(false);
  const [isLoader, setLoader] = useState(0);

  useEffect(() => {
    const handleClickOpen = () => {
      setOpen(true);
    };
    handleClickOpen();
  }, []);

  const handleClose = () => {
    props.history.goBack();
  };

  const handleSubmit = async (e) => {
    const id = props.history.location.pathname.split("/")[3];
    e.preventDefault();
    if (!image) {
      return null;
    }
    const data = new FormData();
    data.append("image", image);

    const options = {
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        let percent = Math.floor((loaded * 100) / total);
        // console.log(`${loaded}kb of ${total}kb | ${percent}%`);

        if (percent < 100) {
          setLoader(percent);
        }
      },
    };

    await updateCoverImage(data, options);
    window.location = `/dashboard/userprofile/${id}`;
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="pb-2">
            <form
              onSubmit={handleSubmit}
              noValidate="novalidate"
              encType="multipart/form-data"
            >
              <div>
                {image ? (
                  <Button variant="outlined" color="primary" type="submit">
                    Upload
                  </Button>
                ) : (
                  <Button
                    disabled
                    variant="outlined"
                    color="primary"
                    type="submit"
                  >
                    Upload
                  </Button>
                )}
                <label htmlFor="upload-photo">
                  <input
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setImage(file);
                    }}
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                  />

                  <IconButton
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>

                {isLoader <= 0 ? null : (
                  <>
                    <div className="pt-1 pb-1 text-center">
                      <Typography
                        variant="caption"
                        component="div"
                        color="textSecondary"
                      >{`${isLoader}%`}</Typography>
                    </div>

                    <LinearProgress variant="determinate" value={isLoader} />
                  </>
                )}
              </div>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateCoverImage;
