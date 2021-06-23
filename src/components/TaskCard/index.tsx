import React from "react";
import { useDrag } from "react-dnd";
import itemTypes from "../../utils/itemType";

const TaskCard: React.FunctionComponent = () => {
  const [{ isDragging }, drag] = useDrag({
    type: itemTypes.CARD,
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
      <div className="dnd-item__title text-xl font-bold">Learn React</div>
      <div className="dnd-item__description my-2">
        Learn react-dnd library for react drag and drop
      </div>
      <div className="dnd-item__priority">Priotiy : High</div>
    </div>
  );
};

export default TaskCard;
