import React, { useState } from "react";
import Kanban from "./components/Kanban";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuid } from "uuid";
import { TaskCardProps } from "./components/TaskCard";

export const TasksContext = React.createContext({
  markAsInProgress: function (id: string) {},
  markAsToDo: function (id: string) {},
});

function App() {
  const [tasks, setTasks] = useState<TaskCardProps[]>([
    {
      id: uuid(),
      title: "Learn React",
      description: "Learn React dnd for using drag and drop",
      priority: "high",
      status: "to-do",
    },
    {
      id: uuid(),
      title: "Learn Android",
      description: "Learn Shitty android sdk",
      priority: "low",
      status: "to-do",
    },
    {
      id: uuid(),
      title: "Take out trash",
      description: "lorem ipsum dolomor et modi chor",
      priority: "low",
      status: "to-do",
    },
    {
      id: uuid(),
      title: "Get a degree",
      description:
        "Waste four years of life to get a piece of paper that proves your worth",
      priority: "low",
      status: "to-do",
    },
    {
      id: uuid(),
      title: "Get Rich",
      description:
        "Work your ass off under the premonition that you're actually going to get rich",
      priority: "low",
      status: "to-do",
    },
  ]);

  const markAsInProgress = (id: string) => {
    const taskToBeChanged: any = tasks.find((task) => task.id === id);
    taskToBeChanged.status = "in-progress";
    setTasks(tasks.filter((task) => task.id !== id).concat(taskToBeChanged));
  };
  const markAsToDo = (id: string) => {
    const taskToBeChanged: any = tasks.find((task) => task.id === id);
    taskToBeChanged.status = "to-do";
    setTasks(tasks.filter((task) => task.id !== id).concat(taskToBeChanged));
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <TasksContext.Provider value={{ markAsInProgress, markAsToDo }}>
        <div className="h-screen">
          <Kanban tasks={tasks} />
        </div>
      </TasksContext.Provider>
    </DndProvider>
  );
}

export default App;
