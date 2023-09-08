import React, { useEffect, useState } from "react";
import { AiFillSetting } from "react-icons/ai";
import { Button, Loader, Popup } from "~/shared/components";
import styles from "./Settings.module.scss";
import { ProjectDataProps } from "~/shared/interfaces/Projects";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

import flowers from "~/assets/backgrounds/flowers.jpg";
import mountains from "~/assets/backgrounds/mountains.jpg";
import nightSky from "~/assets/backgrounds/nightSky.jpg";
import scenicNight from "~/assets/backgrounds/scenicNight.jpg";
import {
  setDeleteProject,
  setProject,
  setUpdateProjects,
} from "~/ProjectSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "~/shared/components/ConfirmModal/ConfirmModal";

type SettingsProps = {
  projectData: ProjectDataProps;
};

const backgrounds = [flowers, mountains, nightSky, scenicNight];
const colors = [
  "rgb(255, 140, 0)",
  "rgb(70, 130, 180)",
  "rgb(143, 0, 255)",
  "rgb(51, 51, 51)",
];

const Settings = ({ projectData }: SettingsProps) => {
  const [display, setDisplay] = useState<boolean>(false);
  const [backgroundState, setBackgroundState] = useState<string>("");
  const [activeBackground, setActiveBackground] = useState<number>(10);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [attempted, setAttempted] = useState<boolean>(false);

  const [displayConfirm, setDisplayConfirm] = useState<boolean>(false);
  const [disableCloseModal, setDisableCloseModal] = useState<boolean>(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  // disables ability to close modal when clicked outside of modal (when confirm modal is open)
  const toggleDisableCloseModal = (disable: boolean) => {
    setDisableCloseModal(disable);
  };

  // get the name of the background from this http://localhost:5173/src/assets/backgrounds/scenicNight.jpg
  useEffect(() => {
    if (backgroundState) {
      const name = backgroundState.split("/").pop();
      if (name) {
        const index = backgrounds.findIndex((background) => {
          return background.split("/").pop() === name;
        });
        setActiveBackground(index);
      }
    }
  }, [backgroundState]);

  // toggles the confirm modal
  const toggleDeleteModal = () => {
    setDisplayConfirm(!displayConfirm);
    toggleDisableCloseModal(!displayConfirm);
  };

  // Shows the popup when settings bttn is clicked
  function handleClick() {
    setDisplay(true);
  }

  const handleBackground = (index: number, e: any) => {
    if (e.currentTarget.src) {
      setActiveBackground(index);
      setBackgroundState(e.currentTarget.src);
    } else {
      setBackgroundState(e.currentTarget.style.background);
    }
  };

  useEffect(() => {
    setTitle(projectData.title);
    setBackgroundState(projectData.background);
  }, [display]);

  const reset = () => {
    if (disableCloseModal) return;
    setDisplay(false);
    setTitle("");
    setBackgroundState("");
    setAttempted(false);
    setActiveBackground(10);
  };

  async function handleUpdateBoard() {
    if (!title || !backgroundState) {
      setAttempted(true);
      return;
    }

    const payload = {
      title: title,
      background: backgroundState,
    };

    try {
      const res = await axios.patch(
        `http://localhost:3000/api/v1/projects/${projectData.id}`,
        payload,
        { withCredentials: true }
      );
      dispatch(
        setProject({
          _id: projectData.id,
          title: title,
          background: backgroundState,
        } as ProjectDataProps)
      );
      dispatch(
        setUpdateProjects({
          _id: projectData.id,
          title: title,
          background: backgroundState,
        })
      );
    } catch (err) {
      console.log(err);
    }

    reset();
  }

  // delete the project here to strapi
  async function handleDeleteBoard() {
    try {
      const res = await axios.delete(
        `https://strapi-production-7520.up.railway.app/api/projects/${projectData.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log(res);
      dispatch(setDeleteProject(projectData._id));
      navigate(`/dashboard/`);
    } catch (err) {
      console.log(err);
    }
  }

  const handleLoad = () => {
    setLoading(true);
  };

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleUpdateBoard();
    }
  }

  return (
    <div className={styles.main}>
      <Button variant="danger" handleClick={() => handleClick()}>
        <div className={styles.btn}>
          <AiFillSetting />
          <p>Settings</p>
        </div>
      </Button>
      <div className={styles["main-container"]}>
        {display && (
          <Popup close={() => reset()}>
            <div
              className={styles["popup-container"]}
              onKeyDown={(e) => handleKeyDown(e)}
            >
              <div className={styles.header}>
                <p>Update Board</p>
                <FaTimes className={styles.closeBtn} onClick={() => reset()} />
              </div>
              <div className={styles.background}>
                <p>Background</p>
                <div className={styles.images}>
                  {backgrounds.map((background, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={background}
                          onClick={(e) => handleBackground(index, e)}
                          onLoad={handleLoad}
                          className={
                            activeBackground === index
                              ? styles.active
                              : styles.unActive
                          }
                          style={
                            loading ? { display: "block" } : { display: "none" }
                          }
                        />

                        {!loading && (
                          <div className={styles.loader}>
                            <Loader size={10} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {colors.map((color, index) => {
                    return (
                      <div
                        key={index}
                        className={`${styles.color} ${
                          backgroundState === color
                            ? styles.active
                            : styles.unActive
                        }`}
                        style={{ background: color }}
                        onClick={(e) => handleBackground(index, e)}
                      ></div>
                    );
                  })}
                </div>
                {backgroundState === "" && attempted && (
                  <p className={styles.errorText}>
                    👋 Please select a background
                  </p>
                )}
              </div>
              <div className={styles.title}>
                <p>Board Title</p>
                <input
                  type="text"
                  placeholder="Board Name"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                {title === "" && attempted && (
                  <p className={styles.errorText}>👋 Please enter a title</p>
                )}
              </div>
              <Button
                widthFull
                variant="primary"
                handleClick={() => handleUpdateBoard()}
              >
                Update
              </Button>
              <div className={styles.delete}>
                <Button
                  widthFull
                  variant="danger"
                  handleClick={() => toggleDeleteModal()}
                >
                  Delete
                </Button>
              </div>
            </div>
          </Popup>
        )}
      </div>
      <ConfirmModal
        display={displayConfirm}
        closeModal={toggleDeleteModal}
        deleteTask={handleDeleteBoard}
        item="board"
      />
    </div>
  );
};

export default Settings;

/*

axios
      .put(
        `https://strapi-production-7520.up.railway.app/api/projects/${projectData.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
          data: {
            title: title,
            background: backgroundState,
          },
        }
      )
      .then((res) => {
        dispatch(
          setProject({
            id: projectData.id,
            title: title,
            background: backgroundState,
          } as ProjectDataProps)
        );
        dispatch(
          setUpdateProjects({
            id: projectData.id,
            title: title,
            background: backgroundState,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });

  Maybe can you use same confirm modal when deleting
  Make it a shared component




  1) Get update board to work
  2) Get delete board to work
  3) Have the image highlight if active
  4) Do the same for the one in the main hub



  Options
  1) Change background
  2) Change board name
  3) Delete board

  Use same as mainhub add a card
  - Have a delete button on the bottom of the card

*/
