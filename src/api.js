import axios from 'axios';
import get from 'lodash/get';

const fetchUsers = async (page = 1) => {
  const response = await axios.get(`https://reqres.in/api/users?page=${page}`);

  return get(response, 'data', []);
};

export default {
  fetchUsers,
};
