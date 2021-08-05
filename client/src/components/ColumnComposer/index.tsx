import React, { useState, useRef, useEffect, useContext } from "react";
import { TasksContext } from "../../contexts/TasksContext";

const ColumnComposer = () => {
  const [showInput, setShowInput] = useState(false);
  const [title, setTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const { addColumn } = useContext(TasksContext);
  //Effect to focus on input whenever input is rendered
  useEffect(() => {
    if (inputRef.current && showInput) {
      inputRef.current.focus();
    }
  }, [showInput]);

  return (
    <div
      className="add-col w-60 p-2 rounded bg-gray-300"
      onClick={() => {
        setShowInput(true);
      }}
    >
      <div>Add Column +</div>
      <div className={!showInput ? "hidden " : ""}>
        <input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={(e) => {
            setShowInput(false);
          }}
          type="text"
          className="w-full p-2"
        ></input>
        <button
          onMouseDown={(e) => {
            e.preventDefault();
          }}
          onClick={() => {
            console.log("works");
            addColumn(title);
          }}
          className="bg-blue-500 text-white rounded py-1 px-3 text-sm mt-2"
        >
          {" "}
          Add
        </button>
      </div>
    </div>
  );
};

export default ColumnComposer;
