import React from "react";
import styles from "../EditForm.module.scss";
import { store, useAppDispatch } from "../../../redux/store";
import { setModification } from "../../../redux/frame/slice";
import { useSelector } from "react-redux";
import { getModification } from "../../../redux/frame/selectors";
import { FullOption } from "../../../redux/frame/types";
interface ArrowProps {
  elementType: keyof typeof FullOption;
  ID?: string;
}
/*don't watch this code. The code was written in a limited time with crutches, 
and after bringing it to working condition, no one was engaged in bringing it to an understandable state)*/
export const Arrows: React.FC<ArrowProps> = ({ elementType, ID }) => {
  const dispatch = useAppDispatch();
  const modification = FullOption[elementType];
  const reduxModification = useSelector(getModification);
  const lastModification = reduxModification[elementType];
  const [lastKey, setLastKey] = React.useState<string>(
    Object.keys(modification)[0]
  );
  const [currentModification, setCurrentModification] = React.useState<{
    [key: string]: string | null;
  } | null>(null);
  React.useEffect(() => {
    const currentModification =
      store.getState().frame.modification[elementType];
    if (Array.isArray(currentModification) && ID) {
      const initialState =
        currentModification.find((obj) => obj.ID === ID) || null;
      // @ts-ignore
      setCurrentModification(initialState);
    }
    if (!Array.isArray(currentModification))
      setCurrentModification(currentModification);
  }, []);

  const OnclickNext = () => {
    if (currentModification === null) return;

    for (const key in currentModification) {
      const element = currentModification[key];
      // @ts-ignore
      const elementInListOption = modification[key];
      if (elementInListOption) {
        const elementIndexInListOption = elementInListOption.findIndex(
          // @ts-ignore
          (val) => val === element
        );
        if (elementIndexInListOption < elementInListOption.length - 1) {
          const newModification = () => {
            const prev = { ...currentModification };
            if (prev)
              prev[key] = elementInListOption[elementIndexInListOption + 1];
            return prev;
          };
          setCurrentModification(newModification());
          if (Array.isArray(lastModification)) {
            const lastIndex = lastModification.findIndex(
              (obj) => obj.ID === ID
            );
            const newData = [...lastModification];
            // @ts-ignore
            newData[lastIndex] = newModification();
            dispatch(
              // @ts-ignore

              setModification({ modification: newData, type: elementType })
            );
          } else
            dispatch(
              setModification({
                modification: newModification(),
                type: elementType,
              })
            );
          return;
        }
      }
    }
    let newModification = { ID: ID ? ID : null };
    let prevKey, newKey;
    for (const key in modification) {
      if (key === lastKey && Object.keys(modification).length > 1) {
        newModification = {
          ...newModification,
          // @ts-ignore
          [key]: modification[key][modification[key].length - 1],
        };
        if (prevKey) setLastKey(prevKey);
        newKey = prevKey;
      } else
        newModification = {
          ...newModification,
          // @ts-ignore
          [key]: modification[key][0],
        };
      prevKey = key;
    }
    if (lastKey === Object.keys(modification)[0] && lastKey !== newKey)
      setLastKey(
        Object.keys(modification)[Object.keys(modification).length - 1]
      );

    setCurrentModification(newModification);
    if (Array.isArray(lastModification)) {
      const lastIndex = lastModification.findIndex((obj) => obj.ID === ID);
      const newData = [...lastModification];
      // @ts-ignore
      newData[lastIndex] = newModification;
      // @ts-ignore
      dispatch(setModification({ modification: newData, type: elementType }));
    } else
      dispatch(
        setModification({ modification: newModification, type: elementType })
      );

    return;
  };
  const OnclickPrev = () => {
    if (currentModification === null) return;
    const keys = Object.keys(currentModification).reverse();
    for (const key of keys) {
      const element = currentModification[key];
      // @ts-ignore
      const elementInListOption = modification[key];

      if (elementInListOption) {
        const elementIndexInListOption = elementInListOption.findIndex(
          // @ts-ignore
          (val) => val === element
        );

        if (elementIndexInListOption > 0) {
          const newModification = () => {
            const prev = { ...currentModification };
            if (prev)
              prev[key] = elementInListOption[elementIndexInListOption - 1];
            return prev;
          };
          setCurrentModification(newModification());
          if (Array.isArray(lastModification)) {
            const lastIndex = lastModification.findIndex(
              (obj) => obj.ID === ID
            );
            const newData = [...lastModification];
            // @ts-ignore
            newData[lastIndex] = newModification();
            dispatch(
              // @ts-ignore

              setModification({ modification: newData, type: elementType })
            );
          } else
            dispatch(
              setModification({
                modification: newModification(),
                type: elementType,
              })
            );

          return;
        }
      }
    }
    let newModification = { ID: ID ? ID : null };
    let flagKey = false,
      newKey = Object.keys(modification)[0];

    for (const key in modification) {
      if (flagKey) {
        flagKey = false;
        newKey = key;
      }
      if (key === lastKey && Object.keys(modification).length > 1) {
        newModification = {
          ...newModification,
          // @ts-ignore

          [key]: modification[key][0],
        };
        flagKey = true;
      } else
        newModification = {
          ...newModification,
          // @ts-ignore
          [key]: modification[key][modification[key].length - 1],
        };
    }
    setLastKey(newKey);
    setCurrentModification(newModification);
    if (Array.isArray(lastModification)) {
      const lastIndex = lastModification.findIndex((obj) => obj.ID === ID);
      const newData = [...lastModification];
      // @ts-ignore
      newData[lastIndex] = newModification;
      // @ts-ignore
      dispatch(setModification({ modification: newData, type: elementType }));
    } else
      dispatch(
        setModification({ modification: newModification, type: elementType })
      );

    return;
  };
  return (
    <div className={`${styles.arrowsWrapper}`}>
      <div className={`${styles.arrow} ${styles.prev}`} onClick={OnclickPrev}>
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
      <div onClick={OnclickNext} className={`${styles.arrow} ${styles.next}`}>
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
