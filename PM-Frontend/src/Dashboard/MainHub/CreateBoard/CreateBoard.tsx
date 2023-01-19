import React, { useEffect, useState } from "react";
import { Button, Popup, Loader } from "~/shared/components";

import styles from "./CreateBoard.module.scss";
import { FaTimes } from "react-icons/fa";

import flowers from "~/assets/backgrounds/flowers.jpg";
import mountains from "~/assets/backgrounds/mountains.jpg";
import nightSky from "~/assets/backgrounds/nightSky.jpg";
import scenicNight from "~/assets/backgrounds/scenicNight.jpg";

import { useDispatch } from "react-redux";
import { addProject } from "~/Dashboard/ProjectSlice";

const backgrounds = [flowers, mountains, nightSky, scenicNight];
const colors = ["blue", "red", "green", "orange"];

const CreateBoard = () => {
  const [display, setDisplay] = useState<boolean>(false);
  const [background, setBackground] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const dispatch = useDispatch();

  const handleBackground = (e: React.MouseEvent<HTMLImageElement>) => {
    if (e.currentTarget.src) {
      setBackground(e.currentTarget.src);
    } else {
      setBackground(e.currentTarget.style.background);
    }
  };

  const handleCreateBoard = () => {
    dispatch(addProject({ name: title, background: background }));
    setDisplay(false);
    setTitle("");
    setBackground("");
  };

  const handleLoad = () => {
    setLoading(true);
  };

  return (
    <div className={styles.main}>
      {display && (
        <Popup close={setDisplay}>
          <div className={styles["popup-container"]}>
            <div className={styles.header}>
              <p>Create Board</p>
              <FaTimes
                className={styles.closeBtn}
                onClick={() => setDisplay(false)}
              />
            </div>
            <div className={styles.background}>
              <p>Background</p>
              <div className={styles.images}>
                {backgrounds.map((background, index) => {
                  return (
                    <>
                      <img
                        key={index}
                        src={background}
                        onClick={handleBackground}
                        onLoad={handleLoad}
                      />

                      {!loading && (
                        <div>
                          <Loader size={10} />
                        </div>
                      )}
                    </>
                  );
                })}
                {colors.map((color, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.color}
                      style={{ background: color }}
                      onClick={handleBackground}
                    ></div>
                  );
                })}
              </div>
            </div>
            <div className={styles.title}>
              <p>Board Title</p>
              <input
                type="text"
                placeholder="Board Name"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <Button variant="primary" handleClick={() => handleCreateBoard()}>
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
