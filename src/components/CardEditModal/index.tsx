import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import { TasksContext } from "../../App";
import { TaskCardProps } from "../TaskCard/index";

interface CardEditModalProps {
  currentlyEditing: currentlyEditingType;
  showModal: boolean;
}

type currentlyEditingType = {
  id: string;
  columnIndex: number;
};

const CardEditModal: React.FunctionComponent<CardEditModalProps> = ({
  currentlyEditing,
  showModal,
}) => {
  const { getTask } = useContext(TasksContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");

  useEffect(() => {
    const currentTask = getTask(
      currentlyEditing.id,
      currentlyEditing.columnIndex
    );

    if (currentTask) {
      setTitle(currentTask.title);
      setDescription(currentTask.description);
      setPriority(currentTask.priority);
    }
  }, []);

  if (!showModal) return null;

  return (
    <div className="h-screen w-screen z-20 fixed top-0 left-0 right-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="modal-body h-1/2 w-1/2 bg-white">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Sed at neque
        tempora officiis sit recusandae, quidem, tempore minima alias eum
        eveniet aperiam ut iusto vero laudantium, hic totam quibusdam amet
        ratione nesciunt dolore eius! Ducimus velit ullam architecto esse modi
        molestiae eos deserunt! Magni deserunt perferendis quod nostrum non.
        Perspiciatis?
      </div>
    </div>
  );
};

export default CardEditModal;
