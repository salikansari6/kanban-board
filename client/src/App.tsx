import React, { useContext } from "react";
import Kanban from "./components/Kanban";
import CardEditModal from "./components/CardEditModal/index";
import { TasksContext } from "./contexts/TasksContext";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { DndProvider } from "react-dnd";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";

function App() {
  const { tasks, showModal, currentlyEditing } = useContext(TasksContext);

  return (
    <Router>
      <DndProvider backend={HTML5Backend}>
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
