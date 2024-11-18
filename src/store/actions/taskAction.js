export const setTasksAction = (tasks) => ({
  type: 'SET_TASKS',
  payload: tasks,
});

export const addTaskAction = (task) => ({
  type: 'ADD_TASK',
  payload: task,
});

export const updateTaskAction = (task) => ({
  type: 'UPDATE_TASK',
  payload: task,
});

export const deleteTaskAction = (taskId) => ({
  type: 'DELETE_TASK',
  payload: taskId,
});
