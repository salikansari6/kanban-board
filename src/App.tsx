import React, { useState } from "react";
import Kanban from "./components/Kanban";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { data } from "./data";
import { TaskCardProps } from "./components/TaskCard/index";

export const TasksContext = React.createContext({
  moveItem: function (
    draggedOverIndex: number,
    hoveredOverIndex: number,
    fromColumnIndex: number,
    toColumnIndex: number
  ) {},
});

export interface TaskGroup {
  title: string;
  items: TaskCardProps[];
}

function App() {
  const [tasks, setTasks] = useState<TaskGroup[]>(data);

  // const markAsInProgress = (id: string) => {
  //   const taskToBeChanged = tasks.find((task) => task.id === id);
  //   if (taskToBeChanged) {
  //     taskToBeChanged.status = "in-progress";
  //     setTasks(tasks.filter((task) => task.id !== id).concat(taskToBeChanged));
  //   }
  // };
  // const markAsToDo = (id: string) => {
  //   const taskToBeChanged = tasks.find((task) => task.id === id);
  //   if (taskToBeChanged) {
  //     taskToBeChanged.status = "to-do";
  //     setTasks(tasks.filter((task) => task.id !== id).concat(taskToBeChanged));
  //   }
  // };

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
      <TasksContext.Provider value={{ moveItem }}>
        <div className="h-screen">
          <Kanban tasks={tasks} />
        </div>
      </TasksContext.Provider>
    </DndProvider>
  );
}

export default App;
