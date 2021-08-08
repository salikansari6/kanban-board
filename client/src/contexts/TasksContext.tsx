import React, { useState, useEffect } from "react";
import axios from "axios";
import { TaskCardProps } from "../components/TaskCard";
import { ToDoProps } from "../components/Column";
import { v4 as uuid } from "uuid";
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
  addColumn: (title: string) => void;
  deleteColumn: (id: string) => void;
  tasks: TaskGroup[];
  showModal: boolean;
  currentlyEditing: currentlyEditingType;
  loadingCards: boolean;
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
  tasks: [],
  showModal: false,
  loadingCards: false,
  currentlyEditing: {
    id: "",
    columnIndex: 0,
    index: 0,
  },
  addColumn: function (title: string) {},
  deleteColumn: function (id: string) {},
});

export interface TaskGroup {
  id?: string;
  _id: string;
  title: string;
  columnColor: string;
  items: TaskCardProps[];
}

const TasksContextProvider: React.FunctionComponent = ({ children }) => {
  const [tasks, setTasks] = useState<TaskGroup[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loadingCards, setLoadingCards] = useState(false);
  const [currentlyEditing, setCurrentlyEditing] = useState({
    id: "",
    columnIndex: 0,
    index: 0,
  });

  useEffect(() => {
    setLoadingCards(true);
    axios
      .get("/tasks", {
        withCredentials: true,
      })
      .then((res) => {
        setTasks(res.data[0].tasks);
        setLoadingCards(false);
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

    axios
      .delete("/tasks/deleteCard", {
        data: {
          cardId: id,
          columnIndex,
        },
        withCredentials: true,
      })
      .then((res) => console.log(res.data));
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

    axios
      .put(
        "/tasks/updateCard",
        {
          columnIndex,
          id,
          updatedValues: newValues,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => console.log(res.data));

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
      .post(
        "/tasks/add",
        {
          card: newCard,
          columnIndex: columnIndex,
        },
        {
          withCredentials: true,
        }
      )
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
      .put(
        "/tasks/moveColumn",
        {
          card: item,
          fromColumnIndex,
          toColumnIndex,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => console.log(res.data));
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

    axios
      .put(
        "/tasks/moveItem",
        {
          draggedOverIndex,
          hoveredOverIndex,
          fromColumnIndex,
          toColumnIndex,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => console.log(res.data));
  };

  const addColumn = (title: string) => {
    const newColumn = {
      id: uuid(),
      title,
      columnColor: "gray",
      items: [],
    };
    setTasks((oldList) => {
      const newTasks = JSON.parse(JSON.stringify(oldList));
      newTasks.push(newColumn);
      return newTasks;
    });
    axios.post(
      "/tasks/addColumn",
      {
        newColumn: newColumn,
      },
      {
        withCredentials: true,
      }
    );
  };

  const deleteColumn = (id: string) => {
    console.log(id);
    setTasks((oldList) => {
      let newTasks = JSON.parse(JSON.stringify(oldList));
      newTasks = newTasks.filter((column: ToDoProps) => {
        if (column.id) {
          return column.id !== id;
        } else {
          return column._id !== id;
        }
      });
      return newTasks;
    });

    axios
      .delete("/tasks/deleteColumn", {
        data: {
          id: id,
        },
        withCredentials: true,
      })
      .then((res) => console.log(res.data));
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
        addColumn,
        deleteColumn,
        showModal,
        tasks,
        currentlyEditing,
        loadingCards,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksContextProvider;
