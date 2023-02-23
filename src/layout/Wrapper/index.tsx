import React from "react";
import { Outlet } from "react-router-dom";
import { Header, SideBar, Footer } from "../../components";
import { EditForm } from "../../components/EditForm";
import { Preloader } from "../Preloader";
import styles from "./Wrapper.module.scss";

export const Wrapper: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <EditForm elementType="header" fixed={true}>
        <Header />
      </EditForm>
      <div className={styles.container}>
        <div className={styles.content}>
          <Outlet />
        </div>
        <Footer />
      </div>
    </div>
  );
};
