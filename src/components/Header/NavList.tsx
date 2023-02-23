import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "../../redux/frame/types";

import styles from "./Header.module.scss";

export const NavList: React.FC<{ headerItems: NavLink[] }> = ({
  headerItems,
}) => {
  return (
    <>
      {headerItems.map((val, i) => {
        let content;
        if (val.type === "text")
          content = (
            <div className={styles.text} style={val.style}>
              {val.title}
            </div>
          );
        else
          content = (
            <img
              className={styles.img}
              src={val.src}
              alt={val.title}
              style={val.style}
            />
          );
        if (val.href)
          content = (
            <Link key={i} to={val.href} className={styles.link}>
              {content}
            </Link>
          );
        else content = <div key={i}>{content}</div>;
        return content;
      })}
    </>
  );
};
