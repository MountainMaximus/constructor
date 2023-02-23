import React from "react";
import { useSelector } from "react-redux";
import { getHeader, getModificationHeader } from "../../redux/frame/selectors";
import { NavLink } from "../../redux/frame/types";

import styles from "./Header.module.scss";
import { NavList } from "./NavList";

export const Header: React.FC = () => {
  const headerItems = useSelector(getHeader);
  const modification = useSelector(getModificationHeader);
  const getNavItems = () => {
    let items: { left: NavLink[]; right: NavLink[] } = { left: [], right: [] };
    switch (modification.position) {
      case "double": {
        items.left = headerItems.left;
        items.right = headerItems.right;
        break;
      }
      default: {
        items.left = items.right = [...headerItems.left, ...headerItems.right];

        break;
      }
    }

    return items;
  };
  return (
    <header className={styles.root}>
      <div className={styles.container}>
        {modification.position !== "right" && getNavItems().left.length && (
          <div
            className={styles.header__left}
            style={
              modification.position === "center"
                ? { justifyContent: "center" }
                : {}
            }
          >
            <NavList headerItems={getNavItems().left} />
          </div>
        )}
        {modification.position !== "left" &&
          modification.position !== "center" &&
          getNavItems().right.length && (
            <div className={styles.header__right}>
              <NavList headerItems={getNavItems().right} />
            </div>
          )}
      </div>
    </header>
  );
};
