import React, { useContext } from "react";
import Kanban from "./components/Kanban";
import CardEditModal from "./components/CardEditModal/index";
import { TasksContext } from "./contexts/TasksContext";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

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
