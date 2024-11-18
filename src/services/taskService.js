import axios from 'axios';

const API_URL = 'http://localhost:3000/tasks';

// Get all tasks
export const getTasks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

// Add a new task
export const addTask = async (task) => {
  const response = await axios.post(API_URL, task);
  return response.data;
};

// Update a task
export const updateTask = async (task) => {
  const response = await axios.put(`${API_URL}/${task.id}`, task);
  return response.data;
};

// Delete a task
export const deleteTask = async (taskId) => {
  const response = await axios.delete(`${API_URL}/${taskId}`);
  return response.data;
};
