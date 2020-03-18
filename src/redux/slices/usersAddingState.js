import { createSlice } from '@reduxjs/toolkit';
import get from 'lodash/get';
import api from '../../api';
import { genUsers } from '../../utils';
import { actions as usersActions } from './users';
import { actions as currentPageActions } from './currentPage';

const usersAddingState = createSlice({
  name: 'usersAddingState',
  initialState: 'none',
  reducers: {
    usersAddRequest() {
      return 'requested';
    },
    usersAddSuccess() {
      return 'finished';
    },
    usersAddFailure() {
      return 'failed';
    },
    usersAddReset() {
      return 'none';
    },
  },
});

const {
  usersAddRequest,
  usersAddSuccess,
  usersAddFailure,
} = usersAddingState.actions;

export const loadMoreUsers = (page) => async (dispatch) => {
  dispatch(usersAddRequest());

  try {
    const response = await api.fetchUsers(page);
    const fetchedUsers = get(response, 'data');
    const newUsers = genUsers(fetchedUsers);

    dispatch(usersActions.addUsers({ users: newUsers }));

    dispatch(currentPageActions.setCurrentPage({ currentPage: page }));

    dispatch(usersAddSuccess());
  } catch (e) {
    dispatch(usersAddFailure());
  }
};

const actions = { ...usersAddingState.actions, loadMoreUsers };

export { actions };

export const getUsersAddingState = (state) => state.usersAddingState;

export default usersAddingState.reducer;
