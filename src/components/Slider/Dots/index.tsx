import React from "react";
import { SliderContext } from "../";
import styles from "../slider.module.scss";

export const Dots: React.FC = () => {
  const { changeSlide, slidesCount, slideNumber, modification } =
    React.useContext(SliderContext);
  return (
    <ul
      className={styles.dotsWrapper}
      style={
        modification?.dotPosition === "center"
          ? {
              bottom: 10,
              left: "50%",
              transform: "translateX(-50%)",
            }
          : {
              top: "50%",
              left: 10,
              transform: "translateY(-50%)",
              flexDirection: "column",
            }
      }
    >
      {[...new Array(slidesCount)].map((_, index) => (
        <li
          key={"dot-" + index}
          className={`${styles.dot} ${
            slideNumber === index ? styles.active : ""
          }`}
          onClick={() => {
            if (changeSlide && slideNumber !== undefined) {
              changeSlide(index - slideNumber);
            }
          }}
        />
      ))}
    </ul>
  );
};
