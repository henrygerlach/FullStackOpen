import { useState } from "react";
import { useDispatch } from "react-redux";

import { commentBlog } from "../reducers/blogsReducer";

const Comments = ({ id, comments }) => {
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  const handleComment = (event) => {
    event.preventDefault();

    dispatch(commentBlog(id, comment));
    setComment("");
  };

  return (
    <div>
      <h3>Comments</h3>
      <form onSubmit={handleComment}>
        <input
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type={"submit"}>add comment</button>
      </form>
      <ul>
        {comments.map((comment, i) => (
          <li key={i}>{comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default Comments;
