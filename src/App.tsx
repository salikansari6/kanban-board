import React, { useContext } from "react";
import Kanban from "./components/Kanban";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { v4 as uuid } from "uuid";
import { data } from "./data";
import { TaskCardProps } from "./components/TaskCard/index";
import CardEditModal from "./components/CardEditModal/index";
import { TasksContext } from "./contexts/TasksContext";

function App() {
  const { tasks, showModal, currentlyEditing } = useContext(TasksContext);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen">
        <Kanban tasks={tasks} />
        {showModal && <CardEditModal currentlyEditing={currentlyEditing} />}
      </div>
    </DndProvider>
  );
}

export default App;
