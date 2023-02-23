import React from "react";
import styles from "./Section.module.scss";

interface SectionProps {
  title?: string;
  children: JSX.Element;
}
export const Section: React.FC<SectionProps> = ({ title, children }) => {
  return (
    <div className={styles.section}>
      {title && <h2>{title}</h2>}
      {children}
    </div>
  );
};
