import { contextPosts } from "../../services/contexts/postsContext";
import { useContext } from "react";

const SavePost = ({ postId }) => {
  const postsContext = useContext(contextPosts);

  const { savePosts, user } = postsContext;

  async function save(id) {
    await savePosts(id);
    window.location = `/dashboard/userprofile/${user._id}/save-posts`;
  }

  return (
    <button
      onClick={() => save(postId)}
      className="m-r-15 text-inverse-lighter btnAnimate"
    >
      <i
        style={{
          color: "rgb(161 40 183)",
        }}
        className="bi bi-save-fill ms-2"
        title="Save Post"
      ></i>
    </button>
  );
};

export default SavePost;
