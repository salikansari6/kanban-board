import React, { useState, useEffect } from "react";
import axios from "axios";
import { TaskCardProps } from "../components/TaskCard";
import { v4 as uuid } from "uuid";
import { data } from "../data/index";
import { currentlyEditingType } from "../components/CardEditModal";

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
    toColumnIndex: number,
    drop: boolean
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
  tasks: TaskGroup[];
  showModal: boolean;
  currentlyEditing: currentlyEditingType;
};

export const TasksContext = React.createContext<TasksContextType>({
  moveItem: function (
    draggedOverIndex: number,
    hoveredOverIndex: number,
    fromColumnIndex: number,
    toColumnIndex: number,
    drop: boolean
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
  tasks: [],
  showModal: false,
  currentlyEditing: {
    id: "",
    columnIndex: 0,
    index: 0,
  },
});

export interface TaskGroup {
  _id: string;
  title: string;
  columnColor: string;
  items: TaskCardProps[];
}

const TasksContextProvider: React.FunctionComponent = ({ children }) => {
  const [tasks, setTasks] = useState<TaskGroup[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentlyEditing, setCurrentlyEditing] = useState({
    id: "",
    columnIndex: 0,
    index: 0,
  });

  useEffect(() => {
    axios
      .get("http://localhost:4000/tasks/60e09f13284d399fc26aa9a7")
      .then((res) => {
        setTasks(res.data[0].tasks);
      })
      .catch((err) => console.log(err));
  }, []);

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

    let newTasks;
    setTasks((oldTasks) => {
      newTasks = JSON.parse(JSON.stringify(oldTasks));
      newTasks[columnIndex].items.unshift(newCard);
      return newTasks;
    });
    axios
      .post("http://localhost:4000/tasks/add/60e09f13284d399fc26aa9a7", {
        card: newCard,
        columnIndex: columnIndex,
      })
      .then((res) => console.log(res.data));
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
    let newTasks;
    setTasks((oldTasks) => {
      newTasks = JSON.parse(JSON.stringify(oldTasks));
      newTasks[toColumnIndex].items.splice(
        newTasks[toColumnIndex].items.length,
        0,
        newTasks[fromColumnIndex].items.splice(item.index, 1)[0]
      );
      return newTasks;
    });

    axios
      .put("http://localhost:4000/tasks/moveColumn/60e09f13284d399fc26aa9a7", {
        card: item,
        fromColumnIndex,
        toColumnIndex,
      })
      .then((res) => console.log(res.data));
  };

  const moveItem = (
    draggedOverIndex: number,
    hoveredOverIndex: number,
    fromColumnIndex: number,
    toColumnIndex: number,
    drop: boolean
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
    // if (drop) {
    //   axios
    //     .put("http://localhost:4000/tasks/moveItem/60e09f13284d399fc26aa9a7", {
    //       draggedOverIndex,
    //       hoveredOverIndex,
    //       fromColumnIndex,
    //       toColumnIndex,
    //     })
    //     .then((res) => console.log(res.data));
    // }
  };

  return (
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
        showModal,
        tasks,
        currentlyEditing,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
