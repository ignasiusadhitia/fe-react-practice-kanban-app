import React from 'react';

import PropTypes from 'prop-types';

const AddTaskModal = ({
  onToggleModal,
  onHandleInputChange,
  onHandleSubmit,
}) => (
  <div className="modal modal-open">
    <form className="modal-box" onSubmit={onHandleSubmit}>
      <h3 className="font-bold text-lg">Add Task</h3>
      <div className="form-control">
        <label className="label">Title</label>
        <input
          required
          className="input input-bordered"
          name="title"
          placeholder="Enter task title"
          type="text"
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
          onChange={onHandleInputChange}
        />
      </div>
      <div className="form-control">
        <label className="label">End Date</label>
        <input
          required
          className="input input-bordered"
          name="endAt"
          type="date"
          onChange={onHandleInputChange}
        />
      </div>
      <div className="form-control">
        <label className="label">Tag</label>
        <select
          required
          className="select select-bordered"
          defaultValue=""
          name="tag"
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
          Save
        </button>
      </div>
    </form>
  </div>
);

AddTaskModal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  onHandleInputChange: PropTypes.func,
  onHandleSubmit: PropTypes.func,
};

export default AddTaskModal;
