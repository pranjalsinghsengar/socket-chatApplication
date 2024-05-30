import React from "react";
import { shadeBlack } from "../styles/globalStyle";

const ChatInput = ({ onSubmit, inputValue, onChange,onClick }) => {
  
  return (
    <form onSubmit={onSubmit} className='w-11/12 md:w-10/12 lg:w-8/12 flex gap-2'>
      <input
        className={`w-full outline-none text-white lg:text-base text-sm  tracking-wide rounded-lg px-3 md:py-2 ${shadeBlack} `}
        placeholder='kuch toh likh do'
        value={inputValue}
        onChange={onChange}
        onClick={onClick}
      />
      <button
        className='bg-violet-700 text-white font-bold rounded-md px-5 text-xs lg:text-base'
        type='submit'
      >
        Bhej doo
      </button>
    </form>
  );
};

export default ChatInput;
