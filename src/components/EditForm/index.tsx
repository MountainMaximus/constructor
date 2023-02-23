import React from "react";
import styles from "./EditForm.module.scss";
import { FullOption } from "../../redux/frame/types";
import { Arrows } from "./Arrows";
interface EditFormProps {
  elementType: keyof typeof FullOption;
  children: JSX.Element;
  ID?: string;
  fixed?: boolean;
}
export const EditForm: React.FC<EditFormProps> = ({
  elementType,
  children,
  ID,
  fixed,
}) => {
  return (
    <div className={`${styles.wrapper} ${fixed ? styles.fixed : ""}`}>
      <Arrows elementType={elementType} ID={ID} />
      {children}
    </div>
  );
};
