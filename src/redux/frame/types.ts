export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
export const FullOption = {
  header: { position: ["double", "right", "left", "center"] },
  slider: {
    dotPosition: ["center", "left"],
    arrowPosition: ["onImage", "inText"],
    arrowVerticalPosition: ["center", "bottom"],
    textPosition: [
      "absoluteCenter",
      "absoluteLeft",
      "blockRight",
      "blockBottom",
    ],
  },
};
export interface Option {
  header: { position: "double" | "right" | "left" | "center" };
  slider: SliderOptions[];
}
export interface Frame {
  header: Header;
  modal: Modal[];
  slider: Slider[];
}
export interface InitialState {
  frame: Frame;
  modification: Option;
  status: Status;
}

export interface FetchData {
  frame: Frame;
  modification: Option;
}
export interface NavLink {
  /** 
  type: тип картинка/текст
  title:текст/атрибут alt
  href?:ссылка перехода
  scrollAttribute?:строка атрибут для определения позиции прокрутки, такой же атрибут должен быть у целевой секции
  src?:ссылка на картинку
  style?:кастомные стили
*/
  type: "text" | "img";
  title: string;
  href?: string;
  scrollAttribute?: string;
  src?: string;
  style?: object;
}
export interface Header {
  left: NavLink[];
  right: NavLink[];
}
export interface Modal {
  ID: string;
  state: boolean;
}

export interface Slider {
  ID: string;
  items: string[];
  title?: string;
  button?: { text: string; href?: string; modalID?: string };
}
export interface SliderOptions {
  ID: string;
  dotPosition: "center" | "left";
  arrowPosition: "onImage" | "inText";
  arrowVerticalPosition: "center" | "bottom";
  textPosition:
    | "absoluteCenter"
    | "absoluteLeft"
    | "blockRight"
    | "blockBottom";
}
