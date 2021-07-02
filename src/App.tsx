import React, { ReactNode, useState } from "react";
import Kanban from "./components/Kanban";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuid } from "uuid";
import { data } from "./data";
import { TaskCardProps } from "./components/TaskCard/index";
import CardEditModal from "./components/CardEditModal/index";
import { O_DIRECT } from "constants";

type newValuesType = {
  title: string;
  description: string;
  priority: string;
};

export type TasksContextType = {
  moveItem: (
    draggedOverIndex: number,
    hoveredOverIndex: number,
    fromColumnIndex: number,
    toColumnIndex: number
  ) => void;
  moveToColumn: (
    item: TaskCardProps,
    fromColumnIndex: number,
    toColumnIndex: number
  ) => void;
  handleAddCard: (columnIndex: number, card: string) => void;
  getTask: (id: string, columnIndex: number) => TaskCardProps | null;
  editCard: (id: string, columnIndex: number, index: number) => void;
  closeModal: () => void;
  editTask: (
    columnIndex: number,
    index: number,
    id: string,
    newValues: newValuesType
  ) => void;
  deleteCard: (id: string, columnIndex: number, index: number) => void;
};

export const TasksContext = React.createContext<TasksContextType>({
  moveItem: function (
    draggedOverIndex: number,
    hoveredOverIndex: number,
    fromColumnIndex: number,
    toColumnIndex: number
  ) {},
  moveToColumn: function (
    item: TaskCardProps,
    fromColumnIndex: number,
    toColumnIndex: number
  ) {},
  handleAddCard: function (columnIndex: number, card: string) {},
  getTask: function (id: string, columnIndex: number) {
    return null;
  },
  editCard: function (id: string, columnIndex: number, index: number) {},
  closeModal: function () {},
  editTask: function (
    columnIndex: number,
    index: number,
    id: string,
    newValues: newValuesType
  ) {},
  deleteCard: function (id: string, columnIndex: number, index: number) {},
});

export interface TaskGroup {
  title: string;
  columnColor: string;
  items: TaskCardProps[];
}

function App() {
  const [tasks, setTasks] = useState<TaskGroup[]>(data);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentlyEditing, setCurrentlyEditing] = useState({
    id: "",
    columnIndex: 0,
    index: 0,
  });

  const closeModal = () => {
    setShowModal(false);
  };

  const deleteCard = (id: string, columnIndex: number, index: number) => {
    setTasks((oldTasks) => {
      const newTasks = JSON.parse(JSON.stringify(oldTasks));
      newTasks[columnIndex].items = newTasks[columnIndex].items.filter(
        (t: TaskCardProps) => {
          return t.id !== id;
        }
      );
      return newTasks;
    });
  };

  const editTask = (
    columnIndex: number,
    index: number,
    id: string,
    newValues: newValuesType
  ) => {
    // console.log(newValues);
    console.log(id);
    setTasks((oldTasks) => {
      const newTasks = JSON.parse(JSON.stringify(oldTasks));
      newTasks[columnIndex].items = newTasks[columnIndex].items.map(
        (t: TaskCardProps) => {
          if (t.id !== id) {
            return t;
          }
          return {
            ...t,
            ...newValues,
          };
        }
      );
      return newTasks;
    });

    setShowModal(false);
    // console.log(tasks);
  };

  const handleAddCard = (columnIndex: number, cardTitle: string) => {
    let newCard = {
      id: uuid(),
      title: cardTitle,
      description: "",
      priority: "low",
      status: "to-do",
    };
    console.log(newCard);
    setTasks((oldTasks) => {
      const newTasks = JSON.parse(JSON.stringify(oldTasks));
      newTasks[columnIndex].items.unshift(newCard);
      return newTasks;
    });
  };

  const editCard = (id: string, columnIndex: number, index: number) => {
    setShowModal(true);
    setCurrentlyEditing({ id, columnIndex, index });
  };

  const getTask = (id: string, columnIndex: number): TaskCardProps | null => {
    const task = tasks[columnIndex].items.find((item) => item.id === id);
    if (task) {
      return task;
    } else {
      return null;
    }
  };

  const moveToColumn = (
    item: TaskCardProps,
    fromColumnIndex: number,
    toColumnIndex: number
  ) => {
    setTasks((oldTasks) => {
      let newTasks = JSON.parse(JSON.stringify(oldTasks));
      newTasks[toColumnIndex].items.splice(
        newTasks[toColumnIndex].items.length,
        0,
        newTasks[fromColumnIndex].items.splice(item.index, 1)[0]
      );
      return newTasks;
    });
  };

  const moveItem = (
    draggedOverIndex: number,
    hoveredOverIndex: number,
    fromColumnIndex: number,
    toColumnIndex: number
  ) => {
    setTasks((oldList) => {
      let newList = JSON.parse(JSON.stringify(oldList));
      newList[toColumnIndex].items.splice(
        hoveredOverIndex,
        0,
        newList[fromColumnIndex].items.splice(draggedOverIndex, 1)[0]
      );

      return newList;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <TasksContext.Provider
        value={{
          moveItem,
          moveToColumn,
          handleAddCard,
          getTask,
          editCard,
          closeModal,
          editTask,
          deleteCard,
        }}
      >
        <div className="h-screen">
          <Kanban tasks={tasks} />
          <button onClick={() => setShowModal(true)}>click me</button>
          {showModal && <CardEditModal currentlyEditing={currentlyEditing} />}
        </div>
      </TasksContext.Provider>
    </DndProvider>
  );
}

export default App;
