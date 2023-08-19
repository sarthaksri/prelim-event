import logo from './logo.svg';

import Bet from './components/Bet';
import { Header } from './components/Header';
import Login from './pages/Login';
import {Route,Routes} from 'react-router-dom'
import Game from './pages/Game'
import {useSelector } from 'react-redux/es/hooks/useSelector';
import PrivateRoute from './components/PrivateRoute';
function App() {
  const {signupData} = useSelector((state)=>state.auth)
  
  return (
   <div className='w-[100vw] h-[100vh] min-h-screen overflow-y-auto'>
    <Routes>
      <Route path='/' element={
          <Login></Login>
      }>
      </Route>
     
      <Route path='/game' element={
        <PrivateRoute>
           <Game></Game>
        </PrivateRoute>
          
        
     }></Route>
    </Routes> 
    {/* <Login></Login> */}
    {/* <Header></Header>
    <Bet></Bet> */}
   </div>
  );
}
export default App;
