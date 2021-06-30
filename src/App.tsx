import React, { ReactNode, useState } from "react";
import Kanban from "./components/Kanban";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuid } from "uuid";
import { data } from "./data";
import { TaskCardProps } from "./components/TaskCard/index";

export const TasksContext = React.createContext({
  moveItem: function (
    draggedOverIndex: number,
    hoveredOverIndex: number,
    fromColumnIndex: number,
    toColumnIndex: number
  ) {},
  moveToColumn: function (
    item: TaskCardProps,
    fromColumnIndex: number,
    toColumnIndex: number
  ) {},
  handleAddCard: function (columnIndex: number, card: string) {},
});

export interface TaskGroup {
  title: string;
  columnColor: string;
  items: TaskCardProps[];
}

function App() {
  const [tasks, setTasks] = useState<TaskGroup[]>(data);
  const handleAddCard = (columnIndex: number, cardTitle: string) => {
    let newCard = {
      id: uuid(),
      title: cardTitle,
      description: "",
      priority: "low",
      status: "to-do",
    };
    console.log(newCard);
    setTasks((oldTasks) => {
      const newTasks = JSON.parse(JSON.stringify(oldTasks));
      newTasks[columnIndex].items.unshift(newCard);
      return newTasks;
    });
  };

  const moveToColumn = (
    item: TaskCardProps,
    fromColumnIndex: number,
    toColumnIndex: number
  ) => {
    setTasks((oldTasks) => {
      let newTasks = JSON.parse(JSON.stringify(oldTasks));
      newTasks[toColumnIndex].items.splice(
        newTasks[toColumnIndex].items.length,
        0,
        newTasks[fromColumnIndex].items.splice(item.index, 1)[0]
      );
      return newTasks;
    });
  };

  const moveItem = (
    draggedOverIndex: number,
    hoveredOverIndex: number,
    fromColumnIndex: number,
    toColumnIndex: number
  ) => {
    setTasks((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList));
      newList[toColumnIndex].items.splice(
        hoveredOverIndex,
        0,
        newList[fromColumnIndex].items.splice(draggedOverIndex, 1)[0]
      );

      return newList;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <TasksContext.Provider value={{ moveItem, moveToColumn, handleAddCard }}>
        <div className="h-screen">
          <Kanban tasks={tasks} />
        </div>
      </TasksContext.Provider>
    </DndProvider>
  );
}

export default App;
