import React, { useEffect, useState } from "react";
import { BsFilter } from "react-icons/bs";
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
const colors = ["blue", "red", "green", "orange"];

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

  // toggles the confirm modal
  const toggleDeleteModal = () => {
    setDisplayConfirm(!displayConfirm);
    toggleDisableCloseModal(!displayConfirm);
  };

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

  const handleUpdateBoard = () => {
    if (!title || !backgroundState) {
      setAttempted(true);
      return;
    }
    axios
      .put(`http://localhost:1337/api/projects/${projectData.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        data: {
          title: title,
          background: backgroundState,
        },
      })
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
    reset();
  };

  // delete the project here to strapi
  async function handleDeleteBoard() {
    try {
      const res = await axios.delete(
        `http://localhost:1337/api/projects/${projectData.id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt")}`,
          },
        }
      );
      console.log(res);
      dispatch(setDeleteProject(projectData.id));
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
                            activeBackground === index ? styles.active : ""
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
                        className={styles.color}
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
              <Button
                widthFull
                variant="danger"
                handleClick={() => toggleDeleteModal()}
              >
                Delete
              </Button>
            </div>
          </Popup>
        )}
      </div>
      <ConfirmModal
        display={displayConfirm}
        closeModal={toggleDeleteModal}
        deleteTask={handleDeleteBoard}
      />
    </div>
  );
};

export default Settings;

/*
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
