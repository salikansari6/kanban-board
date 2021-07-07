import React, { useRef, useContext, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { TasksContext } from "../../contexts/TasksContext";
import itemTypes from "../../utils/itemType";
import CardEditModal from "../CardEditModal/index";
import "./TaskCard.css";
import axios from "axios";
import DeleteIcon from "../../assets/DeleteIcon";

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
  const [delIconColor, setDelIconColor] = useState("black");

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

  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.CARD,

    hover: (item: itemType, monitor) => {
      if (!dndRef.current) {
        return;
      }
    },
    drop: (item: itemType, monitor) => {
      if (!dndRef.current) {
        return;
      }

      const hoveredOverIndex = props.index;
      const draggedOverIndex = item.index;
      if (hoveredOverIndex != undefined && props.columnIndex != undefined)
        moveItem(
          draggedOverIndex,
          hoveredOverIndex,
          item.columnIndex,
          props.columnIndex,
          true
        );
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  drop(drag(dndRef));

  return (
    <div
      ref={dndRef}
      className={`${isDragging ? "opacity-50" : ""} card-wrapper w-full`}
    >
      {isOver && <div className="card-placeholder h-24"></div>}
      <div
        onClick={() => {
          if (props.columnIndex !== undefined && props.index !== undefined) {
            editCard(props.id, props.columnIndex, props.index);
          }
        }}
        className="dnd-item bg-white w-full p-3 rounded shadow relative my-2 cursor-pointer hover:bg-gray-100"
      >
        <div className="flex">
          <div
            className={`${
              props.title === "" ? "opacity-30 " : ""
            } dnd-item__title text-xl font-bold`}
          >
            {props.title === "" ? "Untitled" : props.title}
          </div>
          <button
            className="border border-gray-400 rounded-lg p-1 shadow  ml-auto"
            onMouseOver={(e) => {
              setDelIconColor("red");
            }}
            onMouseOut={(e) => {
              setDelIconColor("black");
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (
                props.columnIndex !== undefined &&
                props.index !== undefined
              ) {
                deleteCard(props.id, props.columnIndex, props.index);
              }
            }}
          >
            <DeleteIcon color={delIconColor} />
          </button>
        </div>
        <div className="dnd-item__description my-2">{props.description}</div>
        <div className="dnd-item__priority">Priotiy : {props.priority}</div>
      </div>
    </div>
  );
};

export default TaskCard;
