import axios from "axios";

const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const create = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const update = async (blog) => {
  const blogToUpdate = {
    ...blog,
    user: blog.user.id,
  };

  const response = await axios.put(`${baseUrl}/${blog.id}`, blogToUpdate);
  return response.data;
};

const _delete = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${blog.id}`, config);
};

export default { setToken, getAll, create, update, _delete };
