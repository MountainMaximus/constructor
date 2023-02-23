import React from "react";
import { SliderContext } from "../";
import styles from "../slider.module.scss";

export const Arrows: React.FC = () => {
  const { changeSlide, modification } = React.useContext(SliderContext);
  return (
    <div
      className={`${styles.arrowsWrapper} ${
        modification?.arrowPosition === "inText" ? styles.white : ""
      }`}
      style={
        modification?.arrowVerticalPosition === "bottom"
          ? { justifyContent: "start", bottom: 10 }
          : { top: "50%", transform: "translateY(-50%)" }
      }
    >
      <div
        className={`${styles.arrow} ${styles.prev}`}
        onClick={() => {
          if (changeSlide) changeSlide(-1);
        }}
      >
        <svg
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.125 12.875C0.878906 12.875 0.660156 12.793 0.496094 12.6289C0.140625 12.3008 0.140625 11.7266 0.496094 11.3984L5.11719 6.75L0.496094 2.12891C0.140625 1.80078 0.140625 1.22656 0.496094 0.898438C0.824219 0.542969 1.39844 0.542969 1.72656 0.898438L6.97656 6.14844C7.33203 6.47656 7.33203 7.05078 6.97656 7.37891L1.72656 12.6289C1.5625 12.793 1.34375 12.875 1.125 12.875Z"
            fill="white"
          />
        </svg>
      </div>
      <div
        onClick={() => {
          if (changeSlide) changeSlide(1);
        }}
        className={`${styles.arrow} ${styles.next}`}
      >
        <svg
          width="8"
          height="13"
          viewBox="0 0 8 13"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.125 12.875C0.878906 12.875 0.660156 12.793 0.496094 12.6289C0.140625 12.3008 0.140625 11.7266 0.496094 11.3984L5.11719 6.75L0.496094 2.12891C0.140625 1.80078 0.140625 1.22656 0.496094 0.898438C0.824219 0.542969 1.39844 0.542969 1.72656 0.898438L6.97656 6.14844C7.33203 6.47656 7.33203 7.05078 6.97656 7.37891L1.72656 12.6289C1.5625 12.793 1.34375 12.875 1.125 12.875Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
};
