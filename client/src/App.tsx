import React, { useContext, useEffect } from "react";
import Kanban from "./components/Kanban";
import CardEditModal from "./components/CardEditModal/index";
import { TasksContext } from "./contexts/TasksContext";
import { HTML5Backend } from "react-dnd-html5-backend";
import device from "current-device";
import { TouchBackend } from "react-dnd-touch-backend";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DndProvider } from "react-dnd";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import { usePreview } from "react-dnd-preview";
import Navbar from "./components/Navbar";
import TaskCard from "./components/TaskCard";

const CardPreview = () => {
  const { display, itemType, item, style } = usePreview();
  console.log(item);
  if (!display) {
    return null;
  }
  return (
    <div style={style}>
      <div className="w-96">
        <TaskCard
          description={item.description}
          title={item.title}
          id={item.id}
          priority={item.priority}
          status={item.status}
        />
      </div>
    </div>
  );
};

function App() {
  const { tasks, showModal, currentlyEditing } = useContext(TasksContext);

  return (
    <Router>
      <DndProvider
        backend={device.type === "desktop" ? HTML5Backend : TouchBackend}
      >
        {device.type !== "desktop" && <CardPreview />}
        <div className="h-screen">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Homepage} />
            <Route
              exact
              path="/kanban"
              component={() => <Kanban tasks={tasks} />}
            />
            <Route exact path="/login" component={Login} />
          </Switch>
          {showModal && <CardEditModal currentlyEditing={currentlyEditing} />}
        </div>
      </DndProvider>
    </Router>
  );
}

export default App;
