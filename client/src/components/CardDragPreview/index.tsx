import React from "react";
import DeleteIcon from "../../assets/DeleteIcon";

interface CardDragPreviewProps {
  title: string;
  description: string;
  priority: string;
}

const CardDragPreview = React.forwardRef<HTMLDivElement, CardDragPreviewProps>(
  (props, ref) => {
    return (
      <div className={`card-wrapper w-full transform rotate-6`} ref={ref}>
        <div className="dnd-item bg-white w-full p-3 rounded shadow relative my-2 cursor-pointer hover:bg-gray-100">
          <div className="flex">
            <div
              className={`${
                props.title === "" ? "opacity-30 " : ""
              } dnd-item__title text-xl font-bold`}
            >
              {props.title === "" ? "Untitled" : props.title}
            </div>
            <button className="border border-gray-400 rounded-lg p-1 shadow  ml-auto">
              <DeleteIcon color="black" />
            </button>
          </div>
          <div className="dnd-item__description my-2">{props.description}</div>
          <div className="dnd-item__priority">Priotiy : {props.priority}</div>
        </div>
      </div>
    );
  }
);

export default CardDragPreview;
