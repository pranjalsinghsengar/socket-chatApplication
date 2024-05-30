import React from 'react'
import { darkBlack, shadeBlack } from '../styles/globalStyle'

const Videobuttons = () => {
  return (
    <div className={`flex ${darkBlack} border border-zinc-50/10 rounded-lg p-2  gap-3 w-3/6 justify-between`}>
    <div className="w-full flex justify-center items-start flex-col px-10">
      <h1 className="mb-4 font-semibold text-sm md:text-lg " >
        Create Confrence now
      </h1>
      <button className="bg-blue-700 px-7 py-2 rounded-md ">Create</button>
    </div>

    <div className={`flex flex-col bg-zinc-950 w-full py-10 px-10 rounded-md justify-center items-start `}>

    <h1 className="mb-4 font-semibold text-sm md:text-lg">
      Join Confrence
    </h1>
    <input
      placeholder={"Enter Confrence ID"}
      className={`outline-none rounded-xl text-sm py-3 px-4 w-full ${shadeBlack}  `}
      // onChange={onChange}
      // value={value}
      />
      </div>
  </div>
)
}

export default Videobuttons