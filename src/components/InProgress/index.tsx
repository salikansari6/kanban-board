import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { TasksContext } from "../../App";
import itemTypes from "../../utils/itemType";
import { TaskCardProps } from "../TaskCard";
import TaskCard from "../TaskCard";

interface InProgressProps {
  tasks: TaskCardProps[];
}

interface itemType {
  id: string;
  type: string;
}

const InProgress: React.FunctionComponent<InProgressProps> = ({ tasks }) => {
  const { markAsInProgress } = useContext(TasksContext);

  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: (item: itemType, monitor) => {
      markAsInProgress(item.id);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`in-progress ${
        isOver ? "bg-yellow-100" : "bg-yellow-200"
      } flex flex-col items-center px-3`}
    >
      <div className="in-progress__title text-center text-xl font-bold p-2">
        In Progress
      </div>
      {tasks.map((task) => {
        return (
          <TaskCard
            key={task.id}
            description={task.description}
            title={task.title}
            id={task.id}
            priority={task.priority}
            status={task.status}
          />
        );
      })}
    </div>
  );
};

export default InProgress;
