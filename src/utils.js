import get from 'lodash/get';

export const genUsers = (users) => users
  .map((user) => ({
    ...user,
    name: get(user, 'first_name'),
    surname: get(user, 'last_name'),
  }));

export const delay = (wait) => new Promise((resolve) => setTimeout(resolve, wait));
