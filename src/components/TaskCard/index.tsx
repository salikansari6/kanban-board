import React from "react";

const TaskCard = () => {
  return (
    <div className="dnd-item bg-white w-full p-2 rounded shadow relative my-2">
      <div className="dnd-item__title text-xl font-bold">Learn React</div>
      <div className="dnd-item__description my-2">
        Learn react-dnd library for react drag and drop
      </div>
      <div className="dnd-item__priority">Priotiy : High</div>
    </div>
  );
};

export default TaskCard;
