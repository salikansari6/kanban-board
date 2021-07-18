import React from "react";
import Column from "../Column";
import { TaskGroup } from "../../contexts/TasksContext";
import withScrolling from "react-dnd-scrolling";
export interface KanbanProps {
  tasks: TaskGroup[];
}

const ScrollingComponent = withScrolling("div");
const Kanban: React.FunctionComponent<KanbanProps> = ({ tasks }) => {
  return (
    <ScrollingComponent className="kanban p-5 h-full flex flex-col items-start lg:items-center overflow-x-scroll">
      <div className="title text-3xl text-center font-bold ">Kanban Board</div>
      <div className="kanban__board flex items-start  h-auto w-auto lg:w-2/3 mt-5">
        {tasks.map((col, index) => {
          return (
            <Column
              _id={col._id}
              columnColor={col.columnColor}
              key={col._id}
              columnIndex={index}
              tasks={col.items}
              title={col.title}
            />
          );
        })}
      </div>
    </ScrollingComponent>
  );
};

export default React.memo(Kanban);
