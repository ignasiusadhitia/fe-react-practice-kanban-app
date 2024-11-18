### **Kanban Board Application Documentation with JSON-Server**

---

## **Application Description**

The Kanban Board is a web-based task management application built using **React** and **React Beautiful DnD** for interactive drag-and-drop functionality. The application is backed by a **JSON-Server** to simulate a backend and manage task data.

---

## **Key Features**

1. **Drag-and-Drop**: Move tasks between columns easily using React Beautiful DnD.
2. **Task Management**:
   - Add new tasks via a modal form.
   - Edit tasks by updating their status using drag-and-drop.
   - Delete tasks when no longer needed.
3. **Task Grouping by Status**:
   - _Backlog_
   - _On Progress_
   - _Done_
4. **Dynamic Columns**: Columns are automatically updated based on the status of tasks.

---

## **Project Structure**

```
src/
│
├── components/
│   ├── AddTaskModal.jsx       # Modal component for adding a task
│   ├── KanbanColumn.jsx       # Component for displaying a Kanban column
│   ├── Navbar.jsx             # Navbar component
│
├── services/
│   ├── taskService.js         # API functions for CRUD operations on tasks
│
├── App.jsx                    # Main application component
├── index.js                   # Application entry point
├── styles.css                 # Application styling
```

---

## **Installation Guide**

### **1. Prerequisites**

Ensure that your system has:

- **Node.js** version 16 or later
- **npm** or **yarn**

### **2. Clone the Repository**

```bash
git clone https://github.com/username/kanban-board.git
cd kanban-board
```

### **3. Install Dependencies**

```bash
npm install
```

### **4. Install JSON-Server**

JSON-Server is used to simulate a backend API.

```bash
npm install json-server --save-dev
```

### **5. Configure JSON-Server**

In the root of the project, create a file named `db.json`:

```json
{
  "tasks": []
}
```

### **6. Add Scripts in `package.json`**

In the `scripts` section of your `package.json`, add the following command to start JSON-Server:

```json
"scripts": {
  "start": "react-scripts start",
  "server": "json-server --watch db.json --port 5000",
  "dev": "concurrently \"npm run server\" \"npm start\""
}
```

This will start both the React app and the JSON-Server concurrently.

### **7. Run the Application**

To run both the React app and the JSON-Server together, use the following command:

```bash
npm run dev
```

The application will be accessible at `http://localhost:3000`, and the API server will be running at `http://localhost:5000`.

---

## **How to Use**

### **Adding a New Task**

1. Click on the "Add Task" button in the Navbar.
2. Fill in the form fields:
   - _Title_
   - _Description_
   - _Start Date_
   - _End Date_
   - _Tag_
3. Click the "Save" button to add the task.

### **Moving Tasks**

1. Click and hold on a task in any column.
2. Drag the task to the desired column.
3. Release the task to save the changes.

### **Deleting Tasks**

- You can delete tasks by clicking the delete button (if implemented in the modal or task row).

---

## **API Services**

The application interacts with **JSON-Server** through the `taskService.js` module, which handles all the CRUD operations for tasks.

### **API Endpoints**

| Function     | Endpoint     | Method | Description          |
| ------------ | ------------ | ------ | -------------------- |
| `getTasks`   | `/tasks`     | GET    | Fetch all tasks      |
| `addTask`    | `/tasks`     | POST   | Add a new task       |
| `updateTask` | `/tasks/:id` | PUT    | Update a task's data |
| `deleteTask` | `/tasks/:id` | DELETE | Delete a task by ID  |

### **Example Implementation**

#### Fetching Tasks

```javascript
import axios from 'axios';

export const getTasks = async () => {
  try {
    const response = await axios.get('http://localhost:5000/tasks');
    return response.data;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
};
```

#### Adding a Task

```javascript
export const addTask = async (task) => {
  try {
    const response = await axios.post('http://localhost:5000/tasks', task);
    return response.data;
  } catch (error) {
    console.error('Error adding task:', error);
    throw error;
  }
};
```

---

## **Main Components**

### **1. App.jsx**

The main component that manages the flow of data, such as:

- States for tasks (`tasks`) and columns (`columns`).
- The `onDragEnd` function to handle the drag-and-drop functionality.
- The modal form for adding tasks.

### **2. AddTaskModal.jsx**

A modal form for adding new tasks with fields like _Title_, _Description_, _Start Date_, _End Date_, and _Tag_.

### **3. KanbanColumn.jsx**

A component representing each column (_Backlog_, _On Progress_, _Done_). It accepts:

- `droppableId`: The ID for the column to enable drag-and-drop functionality.
- `tasks`: A list of tasks within the column.
- `title`: The name of the column.

### **4. Navbar.jsx**

Displays a button to toggle the task adding modal.

---

## **Key Functions**

### **Drag-and-Drop (`onDragEnd`)**

This function handles the movement of tasks between columns:

```javascript
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
  } else {
    destItems.splice(destination.index, 0, movedTask);
  }

  setColumns((prev) => ({
    ...prev,
    [source.droppableId]: { ...sourceColumn, items: sourceItems },
    [destination.droppableId]: { ...destColumn, items: destItems },
  }));

  // Update task status
  setTasks((prevTasks) =>
    prevTasks.map((task) =>
      task.id === movedTask.id
        ? { ...task, status: destination.droppableId }
        : task
    )
  );
};
```

---

## **Notes and Further Development**

1. **Task Deletion**  
   Add a feature to delete tasks, either through a direct button or a context menu.

2. **User Authentication**  
   Implement user login to support multi-user task management.

3. **Backend Integration**  
   Connect the application to a more complex backend to support features like real-time collaboration.

---

## **License**

This application is released under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use and modify it as needed.
