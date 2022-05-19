import { contextPosts } from "../../services/contexts/postsContext";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";

const DeletePost = (props) => {
  const postsContext = useContext(contextPosts);

  const { deletePost } = postsContext;

  useEffect(() => {
    handleClickOpen();
  }, []);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    props.history.goBack();
  };

  const handleAgree = async () => {
    setOpen(await deletePost(props.match.params.id));
    toast.info("Post was deleted", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    props.history.goBack();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you Want to Delete the post ?"}
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleAgree} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeletePost;
