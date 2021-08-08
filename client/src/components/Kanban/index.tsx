import React, { useContext } from "react";
import Column from "../Column";
import { TaskGroup, TasksContext } from "../../contexts/TasksContext";
import withScrolling from "react-dnd-scrolling";
import CardEditModal from "../CardEditModal";
import ColumnComposer from "../ColumnComposer/index";
import { Preloader, Spinner } from "react-preloader-tmnt";

const ScrollingComponent = withScrolling("div");
const Kanban: React.FunctionComponent = () => {
  const { tasks, showModal, currentlyEditing, loadingCards } =
    useContext(TasksContext);

  return (
    <ScrollingComponent className="kanban p-5 h-full flex flex-col items-start  overflow-x-scroll">
      <div className="title text-3xl text-center font-bold ">Kanban Board</div>
      <div className="kanban__board flex items-start  h-auto w-auto  mt-5">
        {tasks.map((col, index) => {
          return (
            <Column
              id={col.id}
              _id={col._id}
              columnColor={col.columnColor}
              key={col._id}
              columnIndex={index}
              items={col.items}
              title={col.title}
            />
          );
        })}
        <ColumnComposer />
        {showModal && <CardEditModal currentlyEditing={currentlyEditing} />}
      </div>
      <Preloader loading={loadingCards} color="#1F2937" />
    </ScrollingComponent>
  );
};

export default React.memo(Kanban);
