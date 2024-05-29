import React from 'react'
import ChatInput from '../components/chatInput';

const Room = ({users}) => {
  return (
    <div className='relative'>
        <div className=' border-4 border-violet-100 absolute' >
        {users &&  users.length > 0
          ? users.map((item, index) => {
              return (
                <button
                  key={index}
                  className="bg-gray-200 px-5 py-2 rounded-2xl"
                //   onClick={() => startConversation(item)}
                >
                  {item?.name}
                </button>
              );
            })
          : "NO USERS"}
        </div>
<div className='fixed bottom-0 py-10  w-full flex flex-col items-center'>
    
        <ChatInput/>
</div>
    </div>
  )
}

export default Room