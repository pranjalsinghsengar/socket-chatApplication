import React from "react";
import { shadeBlack } from "../styles/globalStyle";

const ChatInput = ({ onSubmit, inputValue, onChange }) => {
  return (
    <form onSubmit={onSubmit} className='w-8/12 flex gap-2'>
      <input
        className={`w-full outline-none text-white  tracking-wide rounded-lg px-3 py-2 ${shadeBlack} `}
        placeholder='kuch toh likh do'
        value={inputValue}
        onChange={onChange}
      />
      <button
        className='bg-violet-700 text-white font-bold rounded-md px-5'
        type='submit'
      >
        Bhej doo
      </button>
    </form>
  );
};

export default ChatInput;
