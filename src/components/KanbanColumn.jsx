import React from 'react';

import PropTypes from 'prop-types';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import TaskCard from './TaskCard';

const KanbanColumn = ({
  title = 'Untitled',
  tasks = [],
  droppableId,
  onHandleEdit,
  onHandleDelete,
}) => (
  <div className="flex-1">
    <h3 className="text-lg font-bold mb-4">{title}</h3>
    <Droppable droppableId={droppableId}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="space-y-4 min-h-[50px]"
        >
          {tasks?.length > 0 ? (
            tasks.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided) => (
                  <TaskCard
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    task={task}
                    onHandleDelete={onHandleDelete}
                    onHandleEdit={onHandleEdit}
                  />
                )}
              </Draggable>
            ))
          ) : (
            <div className="text-gray-500">No tasks</div>
          )}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </div>
);

KanbanColumn.propTypes = {
  title: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      startAt: PropTypes.string.isRequired,
      endAt: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  droppableId: PropTypes.string.isRequired,
  onHandleEdit: PropTypes.func.isRequired,
  onHandleDelete: PropTypes.func.isRequired,
};

export default KanbanColumn;
