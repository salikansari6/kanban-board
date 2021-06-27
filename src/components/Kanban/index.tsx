import React from "react";
import { TaskCardProps } from "../TaskCard/index";
import Column from "../Column";
import { TaskGroup } from "../../App";

export interface KanbanProps {
  tasks: TaskGroup[];
}

const Kanban: React.FunctionComponent<KanbanProps> = ({ tasks }) => {
  return (
    <div className="kanban p-5 h-full flex flex-col items-center">
      <div className="title text-3xl text-center font-bold ">Kanban Board</div>
      <div className="kanban__board grid grid-cols-3 gap-5 h-full w-2/3 mt-5">
        {tasks.map((col, index) => {
          return (
            <Column
              columnColor={col.columnColor}
              key={col.title}
              columnIndex={index}
              tasks={col.items}
              title={col.title}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Kanban;
