import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import './index.css';

const Preloader = ({ small }) => {
  const componentClass = cn({
    Preloader: true,
    Preloader_size_small: small,
  });

  return (
    <div className={componentClass} />
  );
};

Preloader.propTypes = {
  small: PropTypes.bool,
};

Preloader.defaultProps = {
  small: false,
};

export default Preloader;
