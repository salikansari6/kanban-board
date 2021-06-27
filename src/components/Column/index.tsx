import React, { useContext } from "react";
import { TaskCardProps } from "../TaskCard/index";
import TaskCard from "../TaskCard/index";
import { useDrop } from "react-dnd";
import itemTypes from "../../utils/itemType";
import { TasksContext } from "../../App";

interface ToDoProps {
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
  columnIndex,
  columnColor,
  title,
}) => {
  const { moveToColumn } = useContext(TasksContext);

  const [{ isOver }, drop] = useDrop({
    accept: itemTypes.CARD,
    hover: (item: itemType, monitor) => {
      console.log(item);
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
        isOver ? `bg-${columnColor}-200` : `bg-${columnColor}-300`
      } flex flex-col items-center px-3`}
    >
      <div className="to-do__title text-center text-xl font-bold p-2">
        {title}
      </div>
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
