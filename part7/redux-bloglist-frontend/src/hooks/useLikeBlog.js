import { useDispatch } from "react-redux";

import { updateBlog } from "../reducers/blogsReducer";

const useLikeBlog = (blog) => {
  const dispatch = useDispatch();

  const like = async () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };

    dispatch(updateBlog(updatedBlog));
  };

  return { like };
};

export default useLikeBlog;
