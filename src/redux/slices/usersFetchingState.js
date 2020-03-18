import { createSlice } from '@reduxjs/toolkit';
import get from 'lodash/get';
import api from '../../api';
import { genUsers, delay } from '../../utils';
import { actions as usersActions } from './users';
import { actions as totalPagesActions } from './totalPages';

const usersFetchingState = createSlice({
  name: 'usersFetchingState',
  initialState: 'none',
  reducers: {
    usersFetchRequest() {
      return 'requested';
    },
    usersFetchSuccess() {
      return 'finished';
    },
    usersFetchFailure() {
      return 'failed';
    },
  },
});

const {
  usersFetchRequest,
  usersFetchSuccess,
  usersFetchFailure,
} = usersFetchingState.actions;

export const fetchUsers = () => async (dispatch) => {
  dispatch(usersFetchRequest());

  try {
    await delay(3000);

    const response = await api.fetchUsers();
    const totalPages = get(response, 'total_pages');
    const fetchedUsers = get(response, 'data');
    const newUsers = genUsers(fetchedUsers);

    dispatch(totalPagesActions.setTotalPages({ totalPages }));
    dispatch(usersActions.addUsers({ users: newUsers }));

    dispatch(usersFetchSuccess());
  } catch (e) {
    dispatch(usersFetchFailure());
  }
};

const actions = { ...usersFetchingState.actions, fetchUsers };

export { actions };

export const getUsersFetchingState = (state) => state.usersFetchingState;

export default usersFetchingState.reducer;
