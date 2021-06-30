import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { TasksContext } from "../../App";
import { TaskCardProps } from "../TaskCard/index";

interface CardEditModalProps {
  currentlyEditing: currentlyEditingType;
}

type currentlyEditingType = {
  id: string;
  columnIndex: number;
};

const CardEditModal: React.FunctionComponent<CardEditModalProps> = ({
  currentlyEditing,
}) => {
  const { getTask, closeModal } = useContext(TasksContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [currentTask, setCurrentTask] = useState({
    title: "",
    description: "",
    priority: "",
  });

  useEffect(() => {
    const task = getTask(currentlyEditing.id, currentlyEditing.columnIndex);
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, []);

  return ReactDOM.createPortal(
    <div className="h-screen w-screen z-20 fixed top-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-body p-2 h-1/2 w-1/2 bg-white">
        <button onClick={closeModal}>Close</button>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
    </div>,
    document.getElementById("card-edit-modal")!
  );
};

export default CardEditModal;
