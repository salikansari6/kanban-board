import React, { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TasksContext } from "../../App";
import itemTypes from "../../utils/itemType";

export interface TaskCardProps {
  title: string;
  description: string;
  id: string;
  priority: string;
  status: string;
  index?: number;
  columnIndex?: number;
}
interface itemType {
  id: string;
  title: string;
  index: number;
  status: string;
  columnIndex: number;
}

const TaskCard: React.FunctionComponent<TaskCardProps> = ({
  title,
  description,
  id,
  columnIndex,
  status,
  index,
  priority,
}) => {
  const { moveItem } = useContext(TasksContext);
  const dndRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: itemTypes.CARD,
    item: {
      id: id,
      title,
      index: index,
      status: status,
      columnIndex: columnIndex,
      type: itemTypes.CARD,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: itemTypes.CARD,
    hover: (item: itemType, monitor) => {
      if (!dndRef.current) {
        return;
      }
      const hoveredOverIndex = index;
      const draggedOverIndex = item.index;

      //if hovered item is same as dragged item we do nothing
      if (draggedOverIndex === hoveredOverIndex) {
        return;
      }

      //getting the dimensions of card which is being hovered over
      const hoveredCardDimensions = dndRef.current.getBoundingClientRect();
      const hoveredCardMiddle = hoveredCardDimensions.height / 2;
      const mousePosition = monitor.getClientOffset();
      if (mousePosition && hoveredOverIndex) {
        const hoveredCardY = mousePosition.y - hoveredCardDimensions.top;
        if (
          draggedOverIndex < hoveredOverIndex &&
          hoveredCardY < hoveredCardMiddle
        ) {
          return;
        }
        if (
          draggedOverIndex > hoveredOverIndex &&
          hoveredCardY < hoveredCardMiddle
        ) {
          return;
        }

        if (columnIndex != null) {
          moveItem(
            draggedOverIndex,
            hoveredOverIndex,
            item.columnIndex,
            columnIndex
          );
          item.columnIndex = columnIndex;
          item.index = hoveredOverIndex;
        }
      }
    },
  });

  drop(drag(dndRef));

  return (
    <div
      ref={dndRef}
      className={`${
        isDragging ? "opacity-50" : ""
      } dnd-item bg-white w-full p-3 rounded shadow relative my-2`}
    >
      <div className="dnd-item__title text-xl font-bold">{title}</div>
      <div className="dnd-item__description my-2">{description}</div>
      <div className="dnd-item__priority">Priotiy : {priority}</div>
    </div>
  );
};

export default TaskCard;
