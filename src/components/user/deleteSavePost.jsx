import { contextPosts } from "../../services/contexts/postsContext";
import { useContext } from "react";

const DeleteSavePost = ({ postId }) => {
  const postsContext = useContext(contextPosts);

  const { deleteSavePost } = postsContext;

  async function deletePost(id) {
    await deleteSavePost(id);
    window.location.reload();
  }

  return (
    <button
      onClick={() => deletePost(postId)}
      className="m-r-15 text-inverse-lighter btnAnimate"
    >
      <i
        style={{
          color: "rgb(228 15 15 / 80%)",
        }}
        className="bi bi-x-square-fill ms-2"
        title="UnSave Post"
      ></i>
    </button>
  );
};

export default DeleteSavePost;
