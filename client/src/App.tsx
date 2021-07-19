import React, { useContext, useEffect } from "react";
import Kanban from "./components/Kanban";
import CardEditModal from "./components/CardEditModal/index";
import TasksContextProvider, { TasksContext } from "./contexts/TasksContext";
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
import CardDragPreview from "./components/CardDragPreview";

const CardPreview = () => {
  const { display, itemType, item, style } = usePreview();
  if (!display) {
    return null;
  }
  return (
    <div style={{ ...style, zIndex: "10" }} className="w-60 lg:w-96">
      <CardDragPreview
        title={item.title}
        description={item.description}
        priority={item.priority}
      />
    </div>
  );
};

function App() {
  return (
    <TasksContextProvider>
      <Router>
        <DndProvider
          options={{
            delayTouchStart: 200,
          }}
          backend={device.type === "desktop" ? HTML5Backend : TouchBackend}
        >
          {/* {device.type !== "desktop" && <CardPreview />} */}
          <CardPreview />
          <div className="h-screen">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Homepage} />
              <Route exact path="/kanban" component={() => <Kanban />} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </DndProvider>
      </Router>
    </TasksContextProvider>
  );
}

export default App;
