import React from "react";
import { SliderContext } from "..";
import { Button } from "../../Button";
import styles from "../slider.module.scss";

export const Title: React.FC<{
  title?: string;
  button?: { text: string; href?: string; modalID?: string };
  block?: boolean;
}> = React.memo(({ title, button, block }) => {
  const { modification } = React.useContext(SliderContext);
  return (
    <div
      className={styles.titleWrapper}
      style={
        modification?.textPosition.includes("block")
          ? { position: "relative", display: "block" }
          : modification?.textPosition === "absoluteLeft"
          ? { top: "50%", left: 30, transform: "translateY(-50%)" }
          : {}
      }
    >
      {title && <div>{title}</div>}
      {button && (
        <Button href={button.href} modalID={button.modalID}>
          {button.text}
        </Button>
      )}
    </div>
  );
});
