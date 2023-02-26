import React, { useEffect, useState } from "react";
import { Button, Popup, Loader } from "~/shared/components";

import styles from "./CreateBoard.module.scss";
import { FaTimes } from "react-icons/fa";

import flowers from "~/assets/backgrounds/flowers.jpg";
import mountains from "~/assets/backgrounds/mountains.jpg";
import nightSky from "~/assets/backgrounds/nightSky.jpg";
import scenicNight from "~/assets/backgrounds/scenicNight.jpg";

import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "~/Store";

const backgrounds = [flowers, mountains, nightSky, scenicNight];
const colors = [
  "rgb(255, 140, 0)",
  "rgb(70, 130, 180)",
  "rgb(143, 0, 255)",
  "rgb(51, 51, 51)",
];

type CreateBoardProps = {
  getProjects: () => void;
};

const CreateBoard = ({ getProjects }: CreateBoardProps) => {
  const [display, setDisplay] = useState<boolean>(false);
  const [backgroundState, setBackgroundState] = useState<string>("");
  const [activeBackground, setActiveBackground] = useState<number>(10);
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [attempted, setAttempted] = useState<boolean>(false);

  const user = useSelector((state: RootState) => state.project.user);

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

  const handleBackground = (index: number, e: any) => {
    if (e.currentTarget.src) {
      setActiveBackground(index);
      setBackgroundState(e.currentTarget.src);
    } else {
      setBackgroundState(e.currentTarget.style.background);
    }
  };

  const reset = () => {
    setDisplay(false);
    setTitle("");
    setBackgroundState("");
    setAttempted(false);
    setActiveBackground(10);
  };

  const handleCreateBoard = () => {
    if (!title || !backgroundState) {
      setAttempted(true);
      return;
    }
    // post the project here to strapi
    axios
      .post("http://localhost:1337/api/projects", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
        data: {
          title: title,
          background: backgroundState,
          users: [user.id],
        },
      })
      .then((res) => {
        getProjects();
      })
      .catch((err) => {
        console.log(err);
      });
    reset();
  };

  const handleLoad = () => {
    setLoading(true);
  };

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleCreateBoard();
    }
  }

  return (
    <div className={styles.main}>
      {display && (
        <Popup close={() => reset()}>
          <div
            className={styles["popup-container"]}
            onKeyDown={(e) => handleKeyDown(e)}
          >
            <div className={styles.header}>
              <p>Create Board</p>
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
                maxLength={20}
              />
              {title === "" && attempted && (
                <p className={styles.errorText}>👋 Please enter a title</p>
              )}
            </div>
            <Button
              widthFull
              variant="primary"
              handleClick={() => handleCreateBoard()}
            >
              Create
            </Button>
          </div>
        </Popup>
      )}
      <div className={styles["new-container"]} onClick={() => setDisplay(true)}>
        <h1>Create New Board</h1>
      </div>
    </div>
  );
};

export default CreateBoard;

/*

  1) Download all possible images and put in assets 
  2) Show the images on the background part
  3) Make sure that the input is grabbing the text for the name
  4) Have it add a new board once the button is clicked



*/
