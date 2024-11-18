# Kanban Board UI

A simple Kanban Board UI built with React.js, Vite, and DaisyUI. This project focuses on creating a visually appealing interface for task management with columns for Backlog, On Progress, and Done tasks. It includes a modal for adding new tasks using CKEditor 5.

## Features

- Kanban Board with three columns:
  - Backlog
  - On Progress
  - Done
- Task Modal for adding tasks with:
- Title
  - Description (using CKEditor 5)
  - Start Date and End Date
  - Task Type (Development, Testing, Design)
- Responsive Design using DaisyUI and TailwindCSS.

## Technologies Used

- React.js: For building the user interface.
- Vite: As the build tool for fast development.
- DaisyUI: For pre-styled and customizable UI components.
- TailwindCSS: For utility-first CSS styling.
- CKEditor 5: For rich text editing in the task description.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/kanban-board-ui.git
cd kanban-board-ui
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

## Project Structure

```bash
src/
├── components/
│   ├── AddTaskModal.jsx  // Modal for adding tasks
│   ├── KanbanColumn.jsx  // Columns for task statuses
│   ├── Navbar.jsx        // Top navigation bar
│   ├── TaskCard.jsx      // Individual task cards
├── App.jsx               // Main application component
├── main.jsx              // Entry point for the app
```

## Future Enhancements

- Drag-and-Drop Support: Allow tasks to be moved between columns.
- API Integration: Connect the board to a backend service for persistent storage.
