import React, { useEffect, useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';

import AddTaskModal from 'components/AddTaskModal';
import KanbanColumn from 'components/KanbanColumn';
import Navbar from 'components/Navbar';

import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from './services/taskService';
import {
  addTaskAction,
  setTasksAction,
  updateTaskAction,
} from './store/actions/taskAction';

const App = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState({});
  const [columns, setColumns] = useState({});
  const [isEditingTask, setIsEditingTask] = useState(false);

  // Fungsi untuk membangun struktur kolom berdasarkan status tugas
  const getColumnsFromTasks = () => ({
    backlog: {
      name: 'Backlog',
      items: tasks.filter((task) => task.status === 'backlog'),
    },
    onProgress: {
      name: 'On Progress',
      items: tasks.filter((task) => task.status === 'onProgress'),
    },
    done: {
      name: 'Done',
      items: tasks.filter((task) => task.status === 'done'),
    },
  });

  // Handler untuk drag-and-drop
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // Jika tidak ada destinasi, batalkan operasi
    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    // Ambil task yang dipindahkan
    const [movedTask] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      // Jika task dipindahkan dalam kolom yang sama
      sourceItems.splice(destination.index, 0, movedTask);
    } else {
      // Jika task dipindahkan ke kolom yang berbeda
      destItems.splice(destination.index, 0, movedTask);
      // Update status tugas
      const updatedTask = { ...movedTask, status: destination.droppableId };

      try {
        await updateTask(updatedTask);
        dispatch(updateTaskAction(updatedTask));
      } catch (error) {
        console.error('Failed to update task status:', error);
      }

      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      }));
    }
  };

  // Handler modal
  const toggleModalHandler = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  // Handler untuk menambahkan tugas
  const addTaskHandler = async (task) => {
    try {
      const newTask = {
        ...task,
        id: new Date().getTime().toString(),
        status: 'backlog',
      };
      const createdTask = await addTask(newTask);
      dispatch(addTaskAction(createdTask));
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  // Handler untuk perubahan input
  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  // Submit form tugas
  const submitTaskHandler = (event) => {
    event.preventDefault();
    if (isEditingTask) {
      updateTaskHandler(task);
    } else {
      addTaskHandler(task);
    }

    toggleModalHandler();
  };

  const editTaskHandler = (task) => {
    setIsEditingTask(true);
    setTask(task);
    setIsModalOpen(true);
  };

  const updateTaskHandler = async (updatedTask) => {
    try {
      const response = await updateTask(updatedTask);

      dispatch(updateTask(response));
    } catch (error) {
      console.error(
        'Failed to update task:',
        error.response?.data || error.message
      );
    } finally {
      setIsEditingTask(false);
    }
  };

  const deleteTaskHandler = async (taskId) => {
    try {
      await deleteTask(taskId);
      dispatch(deleteTask(taskId));
    } catch (error) {
      console.error(
        'Failed to delete task:',
        error.response?.data || error.message
      );
    }
  };

  // Fetch tugas saat komponen dimuat
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        dispatch(setTasksAction(data));
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, [dispatch]);

  // Update kolom berdasarkan perubahan tugas
  useEffect(() => {
    setColumns(getColumnsFromTasks());
  }, [tasks]);

  return (
    <div>
      <Navbar onToggleModal={toggleModalHandler} />
      {isModalOpen && (
        <AddTaskModal
          isEditingTask={isEditingTask}
          task={task}
          onHandleInputChange={inputChangeHandler}
          onHandleSubmit={submitTaskHandler}
          onToggleModal={toggleModalHandler}
        />
      )}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="p-4">
          <div className="flex space-x-4">
            {Object.entries(columns).map(([status, column]) => (
              <KanbanColumn
                key={status}
                droppableId={status}
                tasks={column.items}
                title={column.name}
                onHandleDelete={deleteTaskHandler}
                onHandleEdit={editTaskHandler}
              />
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
