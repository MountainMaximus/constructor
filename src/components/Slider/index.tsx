import React from "react";
import { Arrows } from "./Arrows";
import { Dots } from "./Dots";
import styles from "./slider.module.scss";
import { Title } from "./Title";
import { useSelector } from "react-redux";
import { getSlider } from "../../redux/frame/selectors";
import classNames from "classnames";
import { SliderOptions } from "../../redux/frame/types";
interface SliderProps {
  autoPlayTime?: number;
  ID: string;
}

interface ISliderContext {
  changeSlide: (number: number) => void;
  /* Функция выбора слайда */
  slidesCount: number;
  /* Количество слайдов */
  slideNumber?: number;
  /* Номер активного слайда */
  items: string[];
  /* массив url адресов */
  modification: SliderOptions;
}

export const SliderContext = React.createContext<Partial<ISliderContext>>({});

export const Slider: React.FC<SliderProps> = ({ autoPlayTime, ID }) => {
  const [activeSlide, setActiveSlide] = React.useState(0);
  const touchPosition = React.useRef<number | null>(null);
  const [animation, setAnimation] = React.useState(true);
  const {
    slider = { items: [], title: undefined, button: undefined },
    modification,
  } = useSelector(getSlider(ID));

  /*Выбор слайда */

  const changeSlide = (direction: number = 1) => {
    setAnimation(false);
    if (activeSlide + direction < 0) setActiveSlide(slider.items.length - 1);
    else setActiveSlide((prev) => (direction + prev) % slider.items.length);
    setTimeout(() => {
      setAnimation(true);
    }, 0);
  };
  /**Управление кнопками */
  React.useEffect(() => {
    const pressKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        changeSlide(-1);
      } else if (e.key === "ArrowRight") {
        changeSlide(1);
      }
    };
    window.addEventListener("keydown", pressKey);
    return () => {
      window.removeEventListener("keydown", pressKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeSlide]);
  const handleTouchStart = (event: React.TouchEvent) => {
    touchPosition.current = event.touches[0].clientX;
  };
  const handleTouchMove = (event: React.TouchEvent) => {
    const currentTouchPosition = event.touches[0].clientX;
    if (touchPosition.current === null) return;
    const lengthTouch = touchPosition.current - currentTouchPosition;
    if (lengthTouch > 20) {
      changeSlide(1);
      touchPosition.current = null;
    }

    if (lengthTouch < -20) {
      changeSlide(-1);
      touchPosition.current = null;
    }
  };
  /*Авто-прокрутка */
  React.useEffect(() => {
    if (!autoPlayTime || slider.items.length < 2) return;

    const interval = setInterval(() => {
      changeSlide(1);
    }, autoPlayTime);
    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slider.items.length, autoPlayTime]);
  if (slider.items.length === 0) return <></>;

  return (
    <>
      <div
        className={`${
          modification?.textPosition === "blockRight" ? styles.block : ""
        } ${styles.wrapper}`}
      >
        <SliderContext.Provider
          value={{
            changeSlide,
            slidesCount: slider.items.length,
            slideNumber: activeSlide,
            modification: modification,
          }}
        >
          <div
            className={`${styles.slide} ${
              animation ? styles.fadeInAnimation : ""
            }`}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
          >
            <img
              src={slider.items[activeSlide]}
              alt="Slider img"
              className={styles.image}
            />

            <Dots />
          </div>

          {modification?.textPosition.includes("block") ? (
            <div
              className={classNames(
                {
                  [styles.blockContainer]:
                    modification?.textPosition === "blockRight",
                },
                {
                  [styles.blockContainer]:
                    modification?.textPosition === "blockBottom",
                }
              )}
            >
              <Title title={slider.title} button={slider.button} block={true} />
              {modification?.arrowPosition === "inText" && <Arrows />}
            </div>
          ) : (
            <>
              <Title title={slider.title} button={slider.button} />
              <Arrows />
            </>
          )}
        </SliderContext.Provider>
      </div>
    </>
  );
};
