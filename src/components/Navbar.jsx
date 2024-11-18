import React from 'react';

import PropTypes from 'prop-types';

const Navbar = ({ onToggleModal }) => (
  <div className="navbar bg-base-100 shadow-lg">
    <div className="flex-1">
      <a className="btn btn-ghost normal-case text-xl">Kanban App</a>
    </div>
    <div className="flex-none">
      <button className="btn btn-primary" onClick={onToggleModal}>
        Add Task
      </button>
    </div>
  </div>
);

Navbar.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};

export default Navbar;
