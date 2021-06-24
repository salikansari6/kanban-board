import React from "react";
import { useDrag } from "react-dnd";
import itemTypes from "../../utils/itemType";

export interface TaskCardProps {
  title: string;
  description: string;
  id: string;
  priority: string;
  status: string;
}

const TaskCard: React.FunctionComponent<TaskCardProps> = ({
  title,
  description,
  id,
  priority,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: itemTypes.CARD,
    item: {
      id: id,
      type: itemTypes.CARD,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`${
        isDragging ? "opacity-50" : ""
      } dnd-item bg-white w-full p-2 rounded shadow relative my-2`}
    >
      <div className="dnd-item__title text-xl font-bold">{title}</div>
      <div className="dnd-item__description my-2">{description}</div>
      <div className="dnd-item__priority">Priotiy : {priority}</div>
    </div>
  );
};

export default TaskCard;
