import React, { forwardRef } from 'react';

import PropTypes from 'prop-types';

const TaskCard = forwardRef(
  ({ task, onHandleEdit, onHandleDelete, ...props }, ref) => (
    <div ref={ref} {...props} className="card bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">{task.title}</h2>
        <p>{task.description}</p>
        <div className="badge badge-outline">{task.tag}</div>
        <div className="text-sm text-gray-500 mt-2">
          {task.startAt} - {task.endAt}
        </div>
        <div className="flex gap-2 justify-end">
          <div
            className="cursor-pointer"
            onClick={() => onHandleDelete(task.id)}
          >
            Delete
          </div>
          <div className="cursor-pointer" onClick={() => onHandleEdit(task)}>
            Edit
          </div>
        </div>
      </div>
    </div>
  )
);

TaskCard.displayName = 'TaskCard';

TaskCard.propTypes = {
  task: PropTypes.object.isRequired,
  onHandleDelete: PropTypes.func.isRequired,
  onHandleEdit: PropTypes.func.isRequired,
};

export default TaskCard;
