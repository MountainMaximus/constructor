import React from "react";
import { useNavigate } from "react-router-dom";
import { showModal } from "../../redux/frame/slice";
import { useAppDispatch } from "../../redux/store";
import styles from "./Button.module.scss";
interface IButton {
  accent?: boolean;
  children: string;
  modalID?: string;
  href?: string;
}
export const Button: React.FC<IButton> = ({
  accent,
  children,
  modalID,
  href,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onClickButton = () => {
    if (href) {
      navigate(href);
      return;
    }
    if (modalID) {
      dispatch(showModal(modalID));
      return;
    }
  };
  return (
    <button
      onClick={onClickButton}
      className={`${styles.root} ${accent ? styles.accent : ""}`}
    >
      {children}
    </button>
  );
};
