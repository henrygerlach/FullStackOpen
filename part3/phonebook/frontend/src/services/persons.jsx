import axios from "axios";

const base_url = "/api/persons";

const getAll = () => {
  return axios.get(base_url).then((response) => {
    return response.data;
  });
};

const create = (newPerson) => {
  return axios.post(base_url, newPerson).then((response) => {
    return response.data;
  });
};

const _delete = (id) => {
  return axios.delete(`${base_url}/${id}`).then((response) => {
    return response.data;
  });
};

const update = (newPerson) => {
  return axios
    .put(`${base_url}/${newPerson.id}`, newPerson)
    .then((response) => {
      return response.data;
    });
};

export default { getAll, create, _delete, update };
