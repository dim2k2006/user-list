import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

const Users = ({ list }) => (
  <div className="Users">
    <div className="Users__header">
      <div className="Users__holder">Users</div>
    </div>

    <div className="Users__content">
      <ul className="Users__list">
        {
          list.map(({
            id,
            name,
            surname,
            avatar,
          }) => (
            <li key={id} className="Users__item">
              <div className="Users__avatar">
                <img src={avatar} alt={name} />
              </div>

              <div className="Users__title">{`${name} ${surname}`}</div>
            </li>
          ))
        }
      </ul>
    </div>
  </div>
);

Users.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Users;
