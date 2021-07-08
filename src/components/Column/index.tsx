import React, { useContext, useState, useRef } from "react";
import { TaskCardProps } from "../TaskCard/index";
import TaskCard from "../TaskCard/index";
import { v4 as uuid } from "uuid";
import { useDrop } from "react-dnd";
import itemTypes from "../../utils/itemType";
import { TasksContext } from "../../contexts/TasksContext";
import CardComposer from "../CardComposer/index";
import CardEditModal from "../CardEditModal/index";

interface ToDoProps {
  _id: string;
  tasks: TaskCardProps[];
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
  tasks,
  _id,
  columnIndex,
  columnColor,
  title,
}) => {
  const { moveToColumn, handleAddCard } = useContext(TasksContext);
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
      item.index = tasks.length;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div
      ref={drop}
      className={`to-do ${
        isOver
          ? ` bg-${columnColor}-300`
          : `bg-gradient-to-br from-${columnColor}-300 to-${columnColor}-500  `
      } flex flex-col items-center px-3 rounded shadow`}
    >
      {" "}
      <div className="to-do__title text-center text-xl font-bold p-2">
        {title}
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
      {tasks.map((task: TaskCardProps, index) => {
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
