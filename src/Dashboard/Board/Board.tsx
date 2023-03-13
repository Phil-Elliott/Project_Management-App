import { useEffect, useState } from "react";
import styles from "./Board.module.scss";
import _ from "lodash";

import { NavOptions, TaskModal, Tasks, useProject } from ".";
import { Loader, Modal } from "~/shared/components";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "~/Store";
import {
  addSection,
  setCurrentTask,
  setOrderedTasks,
  setProjectTasks,
  setProjectTasksOrder,
  setSections,
} from "~/ProjectSlice";
import axios from "axios";
import { TaskProps } from "~/shared/interfaces/Projects";
import { useParams } from "react-router-dom";

const Board = () => {
  const [modalTask, setModalTask] = useState<any>();
  const [display, setDisplay] = useState<boolean>(false);
  const [disableCloseModal, setDisableCloseModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const projectData = useSelector((state: RootState) => state.project.project);
  const user = useSelector((state: RootState) => state.project.user);
  const users = useSelector((state: RootState) => state.project.projectUsers);
  const sections = useSelector((state: RootState) => state.project.sections);
  const projectTasks = useSelector(
    (state: RootState) => state.project.projectTasks
  );
  const orderedTasks = useSelector(
    (state: RootState) => state.project.orderedTasks
  );

  const { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(false);
    setTimeout(() => {
      setLoading(true);
    }, 1500);
  }, [id]);

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // modal functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // closes modal
  const closeModal = () => {
    dispatch(setCurrentTask(""));
    setDisplay(false);
  };

  // displays the modal
  const changeModalDisplay = (
    task: TaskProps,
    id: string,
    sectionId: string
  ) => {
    setModalTask({ task, id, sectionId });
    setDisplay(!display);
  };

  // disables ability to close modal when clicked outside of modal (when confirm modal is open)
  const toggleDisableCloseModal = (disable: boolean) => {
    setDisableCloseModal(disable);
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // section functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  // adds a new section to the data - triggered by addList btn
  const addNewSection = async (name: string, orderedArr: number[]) => {
    // adds the new section to the database
    try {
      const res = await axios.post(
        `https://strapi-production-7520.up.railway.app/api/sections`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: {
            title: name,
            order: 1,
            project: projectData!.id,
          },
        }
      );
      orderedArr.push(res.data.data.id);
      addSectionOrder(orderedArr);
      dispatch(
        addSection({
          id: res.data.data.id,
          title: res.data.data.attributes.title,
          order: res.data.data.attributes.order,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  // adds the new section order to the project
  async function addSectionOrder(ordered: number[]) {
    try {
      const res = await axios.put(
        `https://strapi-production-7520.up.railway.app/api/projects/${
          projectData!.id
        }`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: {
            ordered_sections: ordered,
          },
        }
      );
      // fetchSections();
    } catch (err) {
      console.log(err);
    }

    // gets the orderedsections from the project
    async function fetchSections() {
      try {
        const res = await axios.get(
          `https://strapi-production-7520.up.railway.app/api/projects/${
            projectData!.id
          }?populate=ordered_sections`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwt")}`,
            },
          }
        );
        dispatch(
          setSections(
            res.data.data.attributes.ordered_sections.data.map(
              (section: any) => {
                return {
                  id: section.id,
                  title: section.attributes.title,
                  order: section.attributes.order,
                };
              }
            )
          )
        );
      } catch (err) {
        console.log(err);
      }
    }
  }

  // changes the order of the sections
  const changeSectionOrder = (
    id: string,
    destination: number,
    source: number,
    orderedArr: number[]
  ) => {
    // change order in the database
    orderedArr.splice(source, 1);
    orderedArr.splice(destination, 0, parseInt(id.replace(/[^0-9]/g, "")));
    addSectionOrder(orderedArr);

    // change order in the redux store
    let sectionsCopy = [...sections];
    let movedSection = sectionsCopy[source];
    sectionsCopy.splice(source, 1);
    sectionsCopy.splice(destination, 0, movedSection);
    dispatch(setSections(sectionsCopy));

    // change order in the projectTasks array
    let projectTasksCopy = [...projectTasks];
    let movedSectionTasks = projectTasksCopy[source];
    projectTasksCopy.splice(source, 1);
    projectTasksCopy.splice(destination, 0, movedSectionTasks);
    dispatch(setProjectTasksOrder(projectTasksCopy));
  };

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // task functions
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // adds a new task to the section
  const addNewTask = async (
    name: string,
    taskSection: string,
    orderedArr: number[]
  ) => {
    // adds the new task to the database
    try {
      const res = await axios.post(
        `https://strapi-production-7520.up.railway.app/api/tasks`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: {
            title: name,
            section: taskSection,
            order: 1,
            project: projectData!.id,
          },
        }
      );
      let ordered_task = orderedTasks.find(
        (sectionObj) => sectionObj.section.toString() === taskSection.toString()
      );
      let taskIdArr = [...ordered_task!.tasks];
      taskIdArr.push(res.data.data.id);
      addTaskOrder(taskIdArr, taskSection);

      let section = projectTasks.find(
        (section) => section.section === taskSection.toString()
      )!;
      let taskSectionArr = [...section.tasks];
      taskSectionArr.push({
        id: res.data.data.id,
        description: "",
        title: name,
        order: 1,
        priority: "Normal",
        due: "",
        comments: [],
        assigned: [],
        watching: [],
      });

      // add to projectTasks array
      dispatch(
        setProjectTasks({
          section: section.section,
          tasks: taskSectionArr,
        })
      );

      // add to orderedTasks
      dispatch(
        setOrderedTasks({
          section: section.section,
          tasks: taskIdArr,
        })
      );
    } catch (err) {
      console.log(err);
    }
  };

  // adds the new task to the ordered tasks array inside of sections
  async function addTaskOrder(orderedArr: number[], taskSection: string) {
    try {
      const res = await axios.put(
        `https://strapi-production-7520.up.railway.app/api/sections/${taskSection}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: {
            ordered_tasks: orderedArr,
          },
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  // changes the task section and order within the task object - triggered by drag and drop
  const changeTaskPosition = (
    id: string,
    movedTo: string,
    movedToOrder: number,
    movedFrom: string,
    movedFromOrder: number
  ) => {
    const sameSection = movedTo === movedFrom;
    // same section
    if (sameSection) {
      // change the projectTasks array
      let taskSection = projectTasks.find(
        (sectionObj) => sectionObj.section.toString() === movedTo.slice(1)
      );
      let taskArr = [...taskSection!.tasks];
      let sectionId = taskSection!.section;
      const movedTask = taskArr[movedFromOrder];
      taskArr.splice(movedFromOrder, 1);
      taskArr.splice(movedToOrder, 0, movedTask);

      dispatch(
        setProjectTasks({
          section: sectionId,
          tasks: taskArr,
        })
      );
      // change the ordered tasks array and update to the database
      let ordered_task = orderedTasks.find(
        (sectionObj) => sectionObj.section.toString() === movedTo.slice(1)
      );
      let taskIdArr = [...ordered_task!.tasks];
      taskIdArr.splice(movedFromOrder, 1);
      taskIdArr.splice(movedToOrder, 0, parseInt(id.replace(/[^0-9]/g, "")));
      addTaskOrder(taskIdArr, sectionId);
      // need to also change the ordered takss and dispatch it
      dispatch(
        setOrderedTasks({
          section: sectionId,
          tasks: taskIdArr,
        })
      );
    } else if (!sameSection) {
      // change the projectTasks array
      // remove from current section
      let taskSection = projectTasks.find(
        (sectionObj) => sectionObj.section.toString() === movedFrom.slice(1)
      );

      let taskArr = [...taskSection!.tasks];
      let sectionId = taskSection!.section;
      const movedTask = taskArr[movedFromOrder];
      taskArr.splice(movedFromOrder, 1);
      dispatch(
        setProjectTasks({
          section: sectionId,
          tasks: taskArr,
        })
      );
      // add to new section
      taskSection = projectTasks.find(
        (sectionObj) => sectionObj.section.toString() === movedTo.slice(1)
      );
      taskArr = [...taskSection!.tasks];
      let newSectionId = taskSection!.section;
      taskArr.splice(movedToOrder, 0, movedTask);
      dispatch(
        setProjectTasks({
          section: newSectionId,
          tasks: taskArr,
        })
      );
      // change the ordered tasks array and update to the database
      // remove from current section
      let ordered_task = orderedTasks.find(
        (sectionObj) => sectionObj.section.toString() === movedFrom.slice(1)
      );
      let taskIdArr = [...ordered_task!.tasks];
      taskIdArr.splice(movedFromOrder, 1);
      addTaskOrder(taskIdArr, sectionId);
      dispatch(
        setOrderedTasks({
          section: sectionId,
          tasks: taskIdArr,
        })
      );
      // add to new section
      ordered_task = orderedTasks.find(
        (sectionObj) => sectionObj.section.toString() === movedTo.slice(1)
      );
      taskIdArr = [...ordered_task!.tasks];
      taskIdArr.splice(movedToOrder, 0, parseInt(id.replace(/[^0-9]/g, "")));
      addTaskOrder(taskIdArr, newSectionId);
      dispatch(
        setOrderedTasks({
          section: newSectionId,
          tasks: taskIdArr,
        })
      );
    }
  };

  return (
    <>
      <div
        className={styles.main}
        style={{
          backgroundColor: /^http(s)?:\/\//i.test(projectData.background)
            ? ""
            : projectData.background,
          backgroundImage: /^http(s)?:\/\//i.test(projectData.background)
            ? `url(${projectData.background})`
            : "",
          display: loading ? "" : "none",
        }}
      >
        <NavOptions
          user={user}
          members={users}
          projectId={projectData.id}
          projectData={projectData}
        />
        <Tasks
          changeSectionOrder={changeSectionOrder}
          sections={sections}
          addNewSection={addNewSection}
          addNewTask={addNewTask}
          changeTaskPosition={changeTaskPosition}
          changeModalDisplay={changeModalDisplay}
          user={user}
        />
        {modalTask && (
          <Modal
            display={display}
            closeModal={closeModal}
            disableCloseModal={disableCloseModal}
          >
            <TaskModal
              user={user}
              modalTask={modalTask}
              members={users}
              display={display}
              closeModal={closeModal}
              toggleDisableCloseModal={toggleDisableCloseModal}
            />
          </Modal>
        )}
      </div>
      {!loading && (
        <div className={styles["loader-container"]}>
          <Loader size={300} />
        </div>
      )}
    </>
  );
};

export default Board;
