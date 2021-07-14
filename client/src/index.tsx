import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TasksContextProvider from "./contexts/TasksContext";

ReactDOM.render(
  <TasksContextProvider>
    <App />
  </TasksContextProvider>,
  document.getElementById("root")
);
