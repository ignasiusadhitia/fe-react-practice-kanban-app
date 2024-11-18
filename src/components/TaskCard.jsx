import React, { forwardRef } from 'react';

import PropTypes from 'prop-types';

const TaskCard = forwardRef(({ task, ...props }, ref) => (
  <div ref={ref} {...props} className="card bg-base-100 shadow-md">
    <div className="card-body">
      <h2 className="card-title">{task.title}</h2>
      <p>{task.description}</p>
      <div className="badge badge-outline">{task.tag}</div>
      <div className="text-sm text-gray-500 mt-2">
        {task.startAt} - {task.endAt}
      </div>
    </div>
  </div>
));

TaskCard.displayName = 'TaskCard';

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
};

export default TaskCard;
