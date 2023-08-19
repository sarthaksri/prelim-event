import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import _ from 'underscore';
import Tab from './Tab';


const RenderQues = ({setquestionno}) => {
  const dispatch = useDispatch();
  
  // const [question1, setQuestion] = useState("");
  // const [betamount, setbetamount] = useState(5000)
  const [formdata, setFormdata] = useState({
    bet:"",

  })
  const bet = formdata.bet

  const {question} = useSelector((state)=>state.auth, _.isEqual);
  console.log("printing",question)
  const [option, setoption] = useState(question.optionOne)
  console.log("printing question",question)
  const betchange = (e)=>{
    const value = e.target.value;
      setFormdata((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
      }))
  }
  const tabData = [
    {
      id: 1,
      tabName: question.optionOne,
      
    },
    {
      id: 2,
      tabName: question.optionTwo,
      
    },
    {
      id:3,
      tabName:question.optionThree
    },
    {
      id:4,
      tabName:question.optionFour
    }
  ]

  
  return (
    <div className='w-11/12 p-8 mt-16 flex flex-col items-center justify-center'>
      {/* question */}
      <div>
        <h1>Question 1 of 10</h1>
      </div>

      <div className='flex flex-wrap w-full'>
        <p>
          {
            question.question
          }
        </p>
        <Tab tabdata={tabData} option={option} setoption={setoption}> 
        </Tab>
        {
          console.log("is option changing",option)
        }

      </div> 

      <div>
        <p>Bet the Amount</p>
        <form>
          <label></label>
          <input type='number' 
          placeholder='Enter Your Bet Amount' 
          value={bet} onChange={betchange} required name='bet' 
          min={1} 
          max={100}
          className='w-full rounded-lg bg-richblack-700 p-3 text-[16px] leading-[24px]
          text-richblack-5 shadow-[0_1px_0_0] shadow-white/50
           placeholder:text-richblack-200 focus:outline-none !pr-10'>
          </input>
          <button type='submit' 
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
            Submit Your Answer
          </button>
        </form>
        </div> 
    </div>
  )
}


export default RenderQues