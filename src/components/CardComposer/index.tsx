import axios from "axios";
import React, { useRef, useEffect, useState, useContext } from "react";
import { TasksContext } from "../../contexts/TasksContext";

interface CardComposerProps {
  columnIndex: number;
  setShowCardComposer: Function;
}

const CardComposer: React.FunctionComponent<CardComposerProps> = ({
  columnIndex,
  setShowCardComposer,
}) => {
  const [cardTitle, setCardTitle] = useState("");
  const cardComposerRef = useRef<HTMLTextAreaElement>(null);
  const { handleAddCard } = useContext(TasksContext);

  useEffect(() => {
    if (cardComposerRef.current) {
      cardComposerRef.current.focus();
    }
  }, []);

  const handleBlur = () => {
    handleAddCard(columnIndex, cardTitle);

    setShowCardComposer(false);
  };

  return (
    <div className="bg-white h-24 w-full rounded shadow my-2">
      <textarea
        ref={cardComposerRef}
        className="w-full h-full p-2 resize-none font-bold text-xl rounded"
        onChange={(e) => setCardTitle(e.target.value)}
        onBlur={handleBlur}
      ></textarea>
    </div>
  );
};

export default CardComposer;
