import React from "react";
import TaskCard from "../TaskCard/";
import { TaskCardProps } from "../TaskCard/index";
import InProgress from "../InProgress/index";

export interface KanbanProps {
  tasks: TaskCardProps[];
}

const Kanban: React.FunctionComponent<KanbanProps> = ({ tasks }) => {
  return (
    <div className="kanban p-5 h-full flex flex-col items-center">
      <div className="title text-3xl text-center font-bold ">Kanban Board</div>
      <div className="kanban__board grid grid-cols-3 gap-5 h-full w-2/3 mt-5">
        <div className="to-do bg-red-300 flex flex-col items-center px-3">
          <div className="to-do__title text-center text-xl font-bold p-2">
            To Do
          </div>
          {tasks
            .filter((task) => task.status === "to-do")
            .map((task) => {
              return (
                <TaskCard
                  key={task.id}
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  priority={task.priority}
                  status={task.status}
                />
              );
            })}
        </div>
        <InProgress
          tasks={tasks.filter((task) => task.status === "in-progress")}
        />
        <div className="done bg-green-300 flex flex-col items-center px-3">
          <div className="done__title text-center text-xl font-bold p-2">
            Done
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kanban;
