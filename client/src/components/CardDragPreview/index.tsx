import React from "react";
import Priority from "../Priority";

interface CardDragPreviewProps {
  title: string;
  description: string;
  priority: string;
}

const CardDragPreview = React.forwardRef<HTMLDivElement, CardDragPreviewProps>(
  (props, ref) => {
    return (
      <div
        className={`card-wrapper w-full transform rotate-6 shadow-xl`}
        ref={ref}
      >
        <div className="dnd-item bg-white w-full p-3 rounded shadow relative my-2 cursor-pointer flex flex-col hover:bg-gray-100">
          <div className="flex">
            <div
              className={`${
                props.title === "" ? "opacity-30 " : ""
              } dnd-item__title text-md lg:text-xl font-medium`}
            >
              {props.title === "" ? "Untitled" : props.title}
            </div>
          </div>
          <div className="dnd-item__description text-sm lg:text-md my-2">
            {props.description}
          </div>
          <Priority priority={props.priority} />
        </div>
      </div>
    );
  }
);

export default CardDragPreview;
