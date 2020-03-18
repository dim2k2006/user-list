import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import Preloader from '../Preloader';
import Users from '../Users';
import Error from '../Error';
import './index.css';
import { getSelector } from '../../redux/slices';
import connect from '../../connect';

const App = ({ fetchUsers, loadMoreUsers, usersAddReset }) => {
  const usersFetchingState = useSelector(getSelector('usersFetchingState'));
  const users = useSelector(getSelector('users'));
  const usersAddingState = useSelector(getSelector('usersAddingState'));
  const totalPages = useSelector(getSelector('totalPages'));
  const currentPage = useSelector(getSelector('currentPage'));
  const hasMore = currentPage < totalPages;

  const loadMore = () => {
    if (usersAddingState === 'requested' || usersAddingState === 'failed') return;

    loadMoreUsers(currentPage + 1);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <section className="App">
      <div className="App__wrapper">
        {usersFetchingState === 'requested' && (
          <div className="App__preloader">
            <Preloader />
          </div>
        )}

        {usersFetchingState === 'finished' && (
          <div className="App__list">
            <InfiniteScroll
              loadMore={() => hasMore && loadMore()}
              hasMore={hasMore}
              pageStart={1}
              initialLoad={false}
              useWindow
            >
              <Users list={users} />
            </InfiniteScroll>

            {usersAddingState === 'requested' && (
              <div className="App__loader">
                <Preloader small />
              </div>
            )}

            {usersAddingState === 'failed' && (
              <div className="App__warn">
                Something went wrong during

                <br />

                fetching users&nbsp;

                <span role="img" aria-label="face">😱</span>

                <br />

                <br />

                <button className="App__cta" type="button" onClick={usersAddReset}>Try again</button>
              </div>
            )}

            {(hasMore && usersAddingState !== 'failed' && usersAddingState !== 'requested') && (
              <div className="App__arrow" />
            )}

            {!hasMore && (
              <div className="App__notice">
                All users have been loaded successfully&nbsp;

                <span role="img" aria-label="flag">🏁</span>
              </div>
            )}
          </div>
        )}

        {usersFetchingState === 'failed' && (
          <div className="App__error">
            <Error />
          </div>
        )}
      </div>
    </section>
  );
};

export default connect()(App);
