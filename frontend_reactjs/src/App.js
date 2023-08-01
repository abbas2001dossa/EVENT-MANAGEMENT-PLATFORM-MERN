import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import AlertMessage from './components/AlertMessage';
import Register from './components/Register';
import Login from './components/Login';
import Admin from './components/Admin';
import Spinner from './components/Spinner';
import UserDisplay from './components/UserDisplay';
import CreateEvent from './components/Event/CreateEvent';
import ModifyEvent from './components/Event/ModifyEvent';
import ViewEvent from './components/Event/ViewEvent';
import InvitePeople from './components/Event/InvitePeople';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/Register' element={<Register></Register>}></Route>
          <Route path='/AlertMessage' element={<AlertMessage message={"Hello"} severity={"success"}></AlertMessage>}></Route>
          <Route path="/" element={<Login></Login>}></Route>
          <Route path='/Admin' element={<Admin></Admin>}></Route>
          <Route path='/spin' element={<Spinner customText={"Logging Out ... "}></Spinner>}></Route>
          <Route path='/user' element={<UserDisplay></UserDisplay>}></Route>
          <Route path='/user/create-event' element={<CreateEvent></CreateEvent>}></Route>
          <Route path='/user/modify-event' element={<ModifyEvent></ModifyEvent>}></Route>
          <Route path='/user/view-event' element={<ViewEvent></ViewEvent>}></Route>
          <Route path='/user/invite-people' element={<InvitePeople></InvitePeople>}></Route>
        </Routes>
      </Router>
    </>  
  );
}

export default App;
