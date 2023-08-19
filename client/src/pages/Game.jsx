import { type } from '@testing-library/user-event/dist/type';
import React , {useState , useEffect, useMemo} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import _ from 'underscore';
import RenderQues from '../components/RenderQues';
import {getnewquestion} from '../services/operations/authApi'
import { json } from 'react-router-dom';
const Game = () => {
    const dispatch = useDispatch();
    const [Question, setQuestion] = useState("#244");
    const [formdata, setformdata] = useState({check:false})
    const [signupData1, setSignupData] = useState(null);
    const [questionno, setquestionno] = useState("1");
    useEffect(()=>{
        dispatch(getnewquestion(questionno));
    },[questionno])
        const {signupData} = useSelector((state)=>state.auth , _.isEqual);
        console.log("ques no changed",questionno);
        console.log("sign up",signupData);
  return (
    <div className='w-full'>
    <div className='w-11/12 flex items-center justify-evenly mx-auto max-w-[1080px] p-8 
     relative  bg-richblack-700 text-richblack-25 mt-4 border-2 rounded-3xl border-richblack-300'>
        <div className=''>
        <h3>
           {signupData.teamName}
        </h3>
        </div>
        <div>
            <p>
                {Question}
            </p>
        </div>
        <div>
            <p>
                Score:{signupData.game.teamPoints}
            </p>
        </div>

    </div>
    <div className='w-11/12 flex flex-col items-center justify-center mx-auto'>
        <div className='mt-14 bg-slate-800 text-richblack-25 align-middle p-5 border rounded-3xl hover:bg-black'>
        <button >Start the Game</button>
        </div>
        
    </div>

    <RenderQues></RenderQues>
</div>
  )
}

export default Game