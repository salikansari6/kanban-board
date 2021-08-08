import React, { useContext, useState, useRef } from "react";
import { TaskCardProps } from "../TaskCard/index";
import TaskCard from "../TaskCard/index";
import { useDrop } from "react-dnd";
import itemTypes from "../../utils/itemType";
import { TasksContext } from "../../contexts/TasksContext";
import CardComposer from "../CardComposer/index";
import dynamicGradient from "../../utils/dynamicGradient";
import Popup from "reactjs-popup";

export interface ToDoProps {
  id?: string;
  _id?: string;
  items: TaskCardProps[];
  columnIndex: number;
  columnColor: string;
  title: string;
}

interface itemType {
  id: string;
  title: string;
  index: number;
  status: string;
  columnIndex: number;
  description: string;
  priority: string;
}
const Column: React.FunctionComponent<ToDoProps> = ({
  id,
  items,
  _id,
  columnIndex,
  columnColor,
  title,
}) => {
  const { moveToColumn, handleAddCard, deleteColumn } =
    useContext(TasksContext);
  const [showCardComposer, setShowCardComposer] = useState(false);

  const handleAddButtonClick = () => {
    setShowCardComposer(true);
  };

  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.CARD,
    drop: (item: itemType, monitor) => {
      if (columnIndex === item.columnIndex) {
        return;
      }
      moveToColumn(item, item.columnIndex, columnIndex);
      item.columnIndex = columnIndex;
      item.index = items.length;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`to-do ${
        isOver ? ` bg-${columnColor}-300` : dynamicGradient("br", columnColor)
      } flex flex-col px-3 w-72 lg:w-96 h-auto rounded shadow mx-4`}
    >
      {" "}
      <div className="to-do__title justify-center flex relative text-xl font-bold p-2">
        <span>{title}</span>
        <Popup
          position="bottom right"
          arrow={false}
          trigger={<div className="absolute right-0 cursor-pointer">...</div>}
        >
          <ul className="bg-white p-2 rounded shadow border border-gray-800">
            <li>
              <button
                className="focus:outline-none"
                onClick={() => {
                  if (id !== undefined) {
                    deleteColumn(id);
                  } else if (_id !== undefined) {
                    deleteColumn(_id);
                  }
                }}
              >
                Delete
              </button>
            </li>
          </ul>
        </Popup>
      </div>
      <button
        className={`self-start focus:outline-none hover:bg-${columnColor}-400 p-2 rounded`}
        onClick={handleAddButtonClick}
      >
        + Add a card
      </button>
      {showCardComposer && (
        <CardComposer
          columnIndex={columnIndex}
          setShowCardComposer={setShowCardComposer}
        />
      )}
      {items.map((task: TaskCardProps, index) => {
        return (
          <TaskCard
            key={task.id}
            id={task.id}
            title={task.title}
            index={index}
            description={task.description}
            priority={task.priority}
            status={task.status}
            columnIndex={columnIndex}
          />
        );
      })}
    </div>
  );
};

export default Column;
