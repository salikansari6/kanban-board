import React from "react";
import TaskCard from "../TaskCard/";

const Kanban: React.FunctionComponent = () => {
  return (
    <div className="kanban p-5 h-full flex flex-col items-center">
      <div className="title text-3xl text-center font-bold ">Kanban Board</div>
      <div className="kanban__board grid grid-cols-3 gap-5 h-full w-2/3 mt-5">
        <div className="to-do bg-red-300 flex flex-col items-center px-3">
          <div className="to-do__title text-center text-xl font-bold p-2">
            To Do
          </div>
          <TaskCard />
        </div>
        <div className="in-progress bg-yellow-100 flex flex-col items-center px-3">
          <div className="in-progress__title text-center text-xl font-bold p-2">
            In Progress
          </div>
        </div>
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
