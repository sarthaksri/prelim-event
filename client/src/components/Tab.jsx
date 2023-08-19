import React ,{useState}from 'react'

const Tab = ({tabdata,option,setoption}) => {
  return (
    <div className='w-11/12  p-8 mt-16 flex flex-col items-center justify-center'>
        {
            tabdata.map((opt,idx)=>(
                <button key={idx}
                onClick={()=>setoption(opt.tabName)}
                className={`${option==opt.tabName ? "bg-green-500 text-richblack-25":" text-richblack-900 bg-red-600 "} py-2 px-5 rounded-xl
                 transition-all duration-200 flex`}
                >
                    {opt.tabName}
                </button>
            ))
        }


    </div>
  )
}

export default Tab