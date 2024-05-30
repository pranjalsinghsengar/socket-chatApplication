import React from "react";
import { darkBlack, shadeBlack } from "../styles/globalStyle";

const RoomInput = ({
  onSubmit,
  onChange,
  value,
  title,
  subtitle,
  setOpenMenuItem,
  placeholder,
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`py-16 px-20 rounded-lg  ${darkBlack} relative  `}
    >
      <span
        className="text-white  absolute top-2 right-4 cursor-pointer text-xs lg:text-base"
        onClick={() => setOpenMenuItem("")}
      >
        X
      </span>
      <div className="mb-5">
        <h1 className="text-white font-bold text-xl lg:text-4xl">{title && title} </h1>
        <span className="text-green-500 capitalize text-xs lg:text-sm">
          {subtitle && subtitle}
        </span>
      </div>
      <input
        placeholder={placeholder ? placeholder : "Change placeholder"}
        className={`outline-none rounded-md lg:text-lg text-sm py-3 px-4 ${shadeBlack} `}
        onChange={onChange}
        value={value}
      />

      <button type="submit"></button>
    </form>
  );
};

export default RoomInput;
