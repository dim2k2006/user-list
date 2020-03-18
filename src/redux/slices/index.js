import { combineReducers } from '@reduxjs/toolkit';

import usersFetchingState, { actions as usersFetchingStateActions, getUsersFetchingState } from './usersFetchingState';
import users, { actions as usersActions, getUsers } from './users';

import usersAddingState, { actions as usersAddingStateActions, getUsersAddingState } from './usersAddingState';

import totalPages, { actions as totalPagesActions, getTotalPages } from './totalPages';
import currentPage, { actions as currentPageActions, getCurrentPage } from './currentPage';

export default combineReducers({
  usersFetchingState,
  users,
  usersAddingState,
  totalPages,
  currentPage,
});

const actions = {
  ...usersFetchingStateActions,
  ...usersActions,
  ...usersAddingStateActions,
  ...totalPagesActions,
  ...currentPageActions,
};

export { actions };

const selectors = {
  usersFetchingState: getUsersFetchingState,
  users: getUsers,
  usersAddingState: getUsersAddingState,
  totalPages: getTotalPages,
  currentPage: getCurrentPage,
};

const getSelector = (type) => selectors[type];

export { getSelector };
