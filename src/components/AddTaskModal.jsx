import React from 'react';

import PropTypes from 'prop-types';

const AddTaskModal = ({
  onToggleModal,
  onHandleInputChange,
  onHandleSubmit,
  task,
  isEditingTask,
}) => (
  <div className="modal modal-open">
    <form className="modal-box" onSubmit={onHandleSubmit}>
      <h3 className="font-bold text-lg">
        {isEditingTask ? 'Edit Task' : 'Add Task'}
      </h3>
      <div className="form-control">
        <label className="label">Title</label>
        <input
          required
          className="input input-bordered"
          name="title"
          placeholder="Enter task title"
          type="text"
          value={task.title || ''}
          onChange={onHandleInputChange}
        />
      </div>
      <div className="form-control">
        <label className="label">Description</label>
        <textarea
          required
          className="textarea textarea-bordered"
          name="description"
          placeholder="Enter task description"
          value={task.description || ''}
          onChange={onHandleInputChange}
        />
      </div>
      <div className="form-control">
        <label className="label">Start Date</label>
        <input
          required
          className="input input-bordered"
          name="startAt"
          type="date"
          value={task.startAt || ''}
          onChange={onHandleInputChange}
        />
      </div>
      <div className="form-control">
        <label className="label">End Date</label>
        <input
          required
          className="input input-bordered"
          min={task.startAt || ''}
          name="endAt"
          type="date"
          value={task.endAt || ''}
          onChange={onHandleInputChange}
        />
      </div>
      <div className="form-control">
        <label className="label">Tag</label>
        <select
          required
          className="select select-bordered"
          name="tag"
          value={task.tag || ''}
          onChange={onHandleInputChange}
        >
          <option disabled value="">
            Select a tag
          </option>
          <option value="development">Development</option>
          <option value="testing">Testing</option>
          <option value="design">Design</option>
        </select>
      </div>
      <div className="modal-action">
        <button className="btn" type="reset" onClick={onToggleModal}>
          Cancel
        </button>
        <button className="btn btn-primary" type="submit">
          {isEditingTask ? 'Save Changes' : 'Add Task'}
        </button>
      </div>
    </form>
  </div>
);

AddTaskModal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  onHandleInputChange: PropTypes.func,
  onHandleSubmit: PropTypes.func,
  task: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    startAt: PropTypes.string,
    endAt: PropTypes.string,
    tag: PropTypes.string,
  }),
  isEditingTask: PropTypes.bool.isRequired,
};

export default AddTaskModal;
