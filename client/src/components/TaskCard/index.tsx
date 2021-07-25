import React, { useRef, useContext, useState, useEffect } from "react";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useDrag, useDrop } from "react-dnd";
import { TasksContext } from "../../contexts/TasksContext";
import itemTypes from "../../utils/itemType";
import "./TaskCard.css";
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
  height: number | null;
}

const TaskCard: React.FunctionComponent<TaskCardProps> = (props) => {
  const [delIconColor, setDelIconColor] = useState("black");
  const [cardGap, setCardGap] = useState<number | null>(null);

  const dndRef = useRef<HTMLDivElement>(null);

  const { moveItem, editCard, deleteCard } = useContext(TasksContext);
  const [{ isDragging, display }, drag, dragPreview] = useDrag({
    type: itemTypes.CARD,
    item: {
      ...props,
      type: itemTypes.CARD,
      height: dndRef.current?.clientHeight,
    },
    collect: (monitor) => ({
      isDragging: props.id === monitor.getItem()?.id,
      display: monitor.isDragging() ? "hidden" : "",
    }),
  });

  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.CARD,
    hover: (item: itemType, monitor) => {
      console.log("HOVERED OVER INDEX: " + props.index);
      console.log("DRAGGED OVER INDEX: " + item.index);
      if (!dndRef.current) {
        return;
      }
      setCardGap(item.height);
    },
    drop: (item: itemType, monitor) => {
      if (!dndRef.current) {
        return;
      }

      let hoveredOverIndex = props.index;
      let draggedOverIndex = item.index;

      if (hoveredOverIndex != null && props.columnIndex != null) {
        //if statement to fix reordering of cards when in the same column
        if (
          hoveredOverIndex > draggedOverIndex &&
          item.columnIndex === props.columnIndex
        ) {
          hoveredOverIndex -= 1;
        }
        moveItem(
          draggedOverIndex,
          hoveredOverIndex,
          item.columnIndex,
          props.columnIndex
        );
        item.columnIndex = props.columnIndex;
        item.index = hoveredOverIndex;
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  useEffect(() => {
    dragPreview(getEmptyImage(), { captureDraggingState: true });
  }, []);

  useEffect(() => {
    if (dndRef.current) {
      setCardGap(dndRef.current.clientHeight);
    }
  }, [props.description, props.title]);

  drop(drag(dndRef));

  return (
    <div ref={dragPreview} className={`${display} my-2`}>
      <div
        ref={dndRef}
        className={`card-wrapper  w-full  ${isDragging ? "opacity-0" : " "}`}
      >
        {isOver && (
          <div
            style={{ height: cardGap ? cardGap : "" }}
            className="card-gap"
          ></div>
        )}
        <div
          onClick={() => {
            if (props.columnIndex !== undefined && props.index !== undefined) {
              editCard(props.id, props.columnIndex, props.index);
            }
          }}
          className="dnd-item bg-white w-full p-3 rounded shadow relative  cursor-pointer hover:bg-gray-100"
        >
          <div className="flex">
            <div
              className={`${
                props.title === "" ? "opacity-30 " : ""
              } dnd-item__title text-md lg:text-xl font-bold`}
            >
              {props.title === "" ? "Untitled" : props.title}
            </div>
          </div>
          <div className="dnd-item__description text-sm lg:text-md my-2">
            {props.description}
          </div>
          <div className="dnd-item__priority text-sm lg:text-md">
            Priotiy : {props.priority}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
