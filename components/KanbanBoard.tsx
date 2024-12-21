'use client'; // اگر از App Directory استفاده می‌کنید

import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';

interface Task {
  id: string;
  content: string;
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialData: Column[] = [
  {
    id: 'todo',
    title: 'در حال انجام',
    tasks: [
      { id: 'task-1', content: 'نوشتن مستندات پروژه' },
      { id: 'task-2', content: 'طراحی صفحه اصلی وبسایت' },
    ]
  },
  {
    id: 'in-progress',
    title: 'در حال پیشرفت',
    tasks: [
      { id: 'task-3', content: 'ایجاد کامپوننت Navbar' },
    ]
  },
  {
    id: 'done',
    title: 'انجام شده',
    tasks: [
      { id: 'task-4', content: 'تنظیمات اولیه پروژه' },
    ]
  }
];

const KanbanBoard = () => {
  const [columns, setColumns] = useState<Column[]>(initialData);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    const sourceColIndex = columns.findIndex(col => col.id === source.droppableId);
    const destColIndex = columns.findIndex(col => col.id === destination.droppableId);

    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    const sourceTasks = Array.from(sourceCol.tasks);
    const [movedTask] = sourceTasks.splice(source.index, 1);

    if (sourceCol.id === destCol.id) {
      sourceTasks.splice(destination.index, 0, movedTask);
      const newColumns = [...columns];
      newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
      setColumns(newColumns);
    } else {
      const destTasks = Array.from(destCol.tasks);
      destTasks.splice(destination.index, 0, movedTask);

      const newColumns = [...columns];
      newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks };
      newColumns[destColIndex] = { ...destCol, tasks: destTasks };
      setColumns(newColumns);
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">برد کانبان</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {columns.map((col) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided, snapshot) => (
                <div
                  className={`bg-white rounded-md p-4 shadow ${snapshot.isDraggingOver ? 'bg-green-50' : ''}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h2 className="font-semibold text-gray-800 mb-2">{col.title}</h2>
                  <div className="space-y-2">
                    {col.tasks.map((task, index) => (
                      <Draggable draggableId={task.id} index={index} key={task.id}>
                        {(provided, snapshot) => (
                          <div
                            className={`bg-white p-2 rounded-md border border-gray-300 shadow-sm text-gray-700 
                            ${snapshot.isDragging ? 'bg-blue-50' : ''}`}
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {task.content}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;
