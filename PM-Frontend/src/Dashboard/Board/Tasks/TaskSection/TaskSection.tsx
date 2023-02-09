import React, { useState, useEffect } from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task/Task";
import "./TaskSection.scss";
import { FaEllipsisH } from "react-icons/fa";

import { AddItem } from "~/shared/components";

import { useSelector } from "react-redux";
import { RootState } from "~/Store";
import {
  ProjectDataProps,
  SectionProps,
  TaskProps,
} from "~/shared/interfaces/Projects";
import axios from "axios";

type SectionTaskProps = {
  attributes: {
    title: string;
    description: string;
    due: string;
    priority: string;
  };
  id: string;
};

type TaskSectionProps = {
  section: SectionProps;
  fakeData: ProjectDataProps;
  addNewTask: (name: string, section: string) => void;
  index: number;
  changeModalDisplay: (id: string) => void;
};

const TaskSection = ({
  section,
  fakeData,
  addNewTask,
  index,
  changeModalDisplay,
}: TaskSectionProps) => {
  // const [orderedTasks, setOrderedTasks] = useState<TaskProps[]>([]);
  const [tasks, setTasks] = useState<SectionTaskProps[]>([]);
  const search = useSelector((state: RootState) => state.project.searchQuery);

  async function fetchProject() {
    try {
      const res = await axios.get(
        `http://localhost:1337/api/sections/${section.id}?populate=tasks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      setTasks(res.data.data.attributes.tasks.data);
      console.log(res.data.data.attributes.tasks.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchProject();
  }, [section]);

  // useEffect(() => {
  //   setOrderedTasks(
  //     section.tasks
  //       .map((task) => {
  //         return fakeData.tasks.find((t) => t.id === task);
  //       })
  //       .filter((task) => task !== undefined) as TaskProps[]
  //   );
  // }, [section, section.tasks, fakeData]);

  return (
    <Draggable draggableId={section.id} index={index} key={section.id}>
      {(provided) => (
        <div
          className="taskSection-container"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Droppable droppableId={section.id} type="droppable-item">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <div className="taskSection-header">
                  <p>{section.attributes.title}</p>
                  <FaEllipsisH className="ellipsis" />
                </div>

                <div className="taskSection-tasks">
                  {tasks.map((task, index) => {
                    if (
                      search === "" ||
                      task.attributes.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
                    ) {
                      return (
                        <Task
                          key={task.id}
                          id={task.id}
                          taskData={task.attributes}
                          index={index}
                          changeModalDisplay={changeModalDisplay}
                        />
                      );
                    }
                  })}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
          <AddItem addNewItem={addNewTask} item={"task"} section={section.id} />
        </div>
      )}
    </Draggable>
  );
};

export default TaskSection;
