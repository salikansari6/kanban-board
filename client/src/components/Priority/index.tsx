import React, { useState, useEffect } from "react";

interface PriorityProps {
  priority: string;
}

const Priority: React.FunctionComponent<PriorityProps> = (props) => {
  const [priorityColor, setPriorityColor] = useState("");

  useEffect(() => {
    switch (props.priority) {
      case "low":
        setPriorityColor("green");
        break;
      case "medium":
        setPriorityColor("yellow");
        break;
      case "high":
        setPriorityColor("red");
    }
  }, [props.priority]);

  return (
    <div
      className={`dnd-item__priority font-medium text-sm bg-${priorityColor}-200 text-${priorityColor}-800 rounded-full  self-end px-2 py-1  lg:text-md`}
    >
      {props.priority[0].toUpperCase() + props.priority.slice(1)}
    </div>
  );
};

export default Priority;
