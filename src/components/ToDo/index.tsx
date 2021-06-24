import React, { useContext } from "react";
import { TaskCardProps } from "../TaskCard/index";
import TaskCard from "../TaskCard/index";
import { useDrop } from "react-dnd";
import itemTypes from "../../utils/itemType";
import { TasksContext } from "../../App";

interface ToDoProps {
  tasks: TaskCardProps[];
}

interface itemType {
  id: string;
  type: string;
}
const ToDo: React.FunctionComponent<ToDoProps> = ({ tasks }) => {
  const { markAsToDo } = useContext(TasksContext);

  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: (item: itemType, monitor) => {
      console.log(item);
      markAsToDo(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`to-do ${
        isOver ? "bg-red-200" : "bg-red-300"
      } flex flex-col items-center px-3`}
    >
      <div className="to-do__title text-center text-xl font-bold p-2">
        To Do
      </div>
      {tasks
        .filter((task: TaskCardProps) => task.status === "to-do")
        .map((task: TaskCardProps) => {
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
  );
};

export default ToDo;
