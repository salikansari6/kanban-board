import React, { useRef, useContext } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TasksContext } from "../../contexts/TasksContext";
import itemTypes from "../../utils/itemType";
import CardEditModal from "../CardEditModal/index";

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

const TaskCard: React.FunctionComponent<TaskCardProps> = (props) => {
  const { moveItem, editCard, deleteCard } = useContext(TasksContext);
  const dndRef = useRef<HTMLDivElement>(null);
  const [{ isDragging }, drag] = useDrag({
    type: itemTypes.CARD,
    item: {
      ...props,
      type: itemTypes.CARD,
    },
    collect: (monitor) => ({
      isDragging: props.id === monitor.getItem()?.id,
    }),
  });

  const [, drop] = useDrop({
    accept: itemTypes.CARD,
    hover: (item: itemType, monitor) => {
      if (!dndRef.current) {
        return;
      }

      const hoveredOverIndex = props.index;
      const draggedOverIndex = item.index;

      //if hovered item is same as dragged item we do nothing
      if (draggedOverIndex === hoveredOverIndex) {
        return;
      }

      //getting the dimensions of card which is being hovered over
      const hoveredCardDimensions = dndRef.current.getBoundingClientRect();
      const hoveredCardMiddle = hoveredCardDimensions.height / 2;
      const mousePosition = monitor.getClientOffset();
      if (mousePosition && hoveredOverIndex !== undefined) {
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

        if (props.columnIndex != null) {
          moveItem(
            draggedOverIndex,
            hoveredOverIndex,
            item.columnIndex,
            props.columnIndex
          );
          item.columnIndex = props.columnIndex;
          item.index = hoveredOverIndex;
        }
      }
    },
  });

  drop(drag(dndRef));

  return (
    <div
      onClick={() => {
        if (props.columnIndex !== undefined && props.index !== undefined) {
          editCard(props.id, props.columnIndex, props.index);
        }
      }}
      ref={dndRef}
      className={`${
        isDragging ? "opacity-50" : ""
      } dnd-item bg-white w-full p-3 rounded shadow relative my-2 cursor-pointer hover:bg-gray-100`}
    >
      <div
        className={`${
          props.title === "" ? "opacity-30 " : ""
        } dnd-item__title text-xl font-bold`}
      >
        {props.title === "" ? "Untitled" : props.title}
      </div>
      <div className="dnd-item__description my-2">{props.description}</div>
      <div className="dnd-item__priority">Priotiy : {props.priority}</div>

      <button
        className="bg-red-300 p-2 ml-2"
        onClick={() => {
          if (props.columnIndex !== undefined && props.index !== undefined) {
            deleteCard(props.id, props.columnIndex, props.index);
          }
        }}
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;
