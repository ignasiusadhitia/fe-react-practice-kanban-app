import React, { useEffect, useState } from 'react';

import { DragDropContext } from 'react-beautiful-dnd';

import AddTaskModal from 'components/AddTaskModal';
import KanbanColumn from 'components/KanbanColumn';
import Navbar from 'components/Navbar';

import {
  addTask,
  deleteTask,
  getTasks,
  updateTask,
} from './services/taskService';

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [task, setTask] = useState({});
  const [tasks, setTasks] = useState([]);
  const [columns, setColumns] = useState({});

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
  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [movedTask] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, movedTask);
      setColumns((prev) => ({
        ...prev,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      }));
    } else {
      destItems.splice(destination.index, 0, movedTask);
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
      // Update status tugas
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === movedTask.id
            ? { ...task, status: destination.droppableId }
            : task
        )
      );
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
      setTasks((prevTasks) => [...prevTasks, createdTask]);
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
    addTaskHandler(task);
    setTask({});
    toggleModalHandler();
  };

  // Fetch tugas saat komponen dimuat
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  // Update kolom berdasarkan perubahan tugas
  useEffect(() => {
    setColumns(getColumnsFromTasks());
  }, [tasks]);

  return (
    <div>
      <Navbar onToggleModal={toggleModalHandler} />
      {isModalOpen && (
        <AddTaskModal
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
              />
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  );
};

export default App;
