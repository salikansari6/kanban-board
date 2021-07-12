import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { TasksContext } from "../../contexts/TasksContext";
import { TaskCardProps } from "../TaskCard/index";

interface CardEditModalProps {
  currentlyEditing: currentlyEditingType;
}

export type currentlyEditingType = {
  id: string;
  columnIndex: number;
  index: number;
};

const CardEditModal: React.FunctionComponent<CardEditModalProps> = ({
  currentlyEditing,
}) => {
  const { getTask, closeModal, editTask } = useContext(TasksContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [currentTask, setCurrentTask] = useState<TaskCardProps>({
    title: "",
    description: "",
    priority: "",
    id: "",
    status: "",
  });

  useEffect(() => {
    const task = getTask(currentlyEditing.id, currentlyEditing.columnIndex);
    if (task) {
      setCurrentTask({
        ...task,
        index: currentlyEditing.index,
        columnIndex: currentlyEditing.columnIndex,
      });
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, []);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let newValues = {
      title,
      description,
      priority,
    };
    if (
      currentTask.columnIndex !== undefined &&
      currentTask.index !== undefined
    ) {
      editTask(
        currentTask.columnIndex,
        currentTask.index,
        currentTask.id,
        newValues
      );
    }
  };

  return ReactDOM.createPortal(
    <div className="h-screen w-screen z-20 fixed top-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-body text-2xl p-5 h-auto w-1/2 bg-white rounded-lg shadow-lg">
        <form action="" className="" onSubmit={handleSubmit}>
          <div className="input-group my-5    items-center">
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <input
              type="text"
              name="title"
              className="border w-full mt-1 border-black  p-1"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="input-group my-5    items-center">
            <label htmlFor="descrption" className="font-medium">
              Description
            </label>
            <textarea
              name="descrption"
              className="border w-full mt-1 border-black  p-1"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="input-group my-5    items-center">
            <label htmlFor="priority" className="font-medium">
              Priority
            </label>
            <input
              type="text"
              name="priority"
              className="border w-full mt-1 border-black  p-1"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            />
          </div>
          <div className="buttons flex justify-end">
            <button
              type="submit"
              className="shadow bg-green-500 p-2 rounded text-white mx-2"
            >
              Save Changes
            </button>
            <button
              onClick={closeModal}
              className="shadow  mx-2 bg-red-500 text-white rounded p-2 px-4"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("card-edit-modal")!
  );
};

export default CardEditModal;
