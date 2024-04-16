import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./Pages/Register"; 
import Login from "./Pages/Login";
import Attendance from "./Pages/Attendance";
import Report from "./Pages/Report";
import Admin from "./Pages/Admin";
import Header from "./Pages/Header";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<Register/>} />
          <Route path='/login' element={<Login/>} />
          
          <Route path="/attendance" element={<Attendance/>}/>
<Route path="/view-report/" element={<Report/>}/>
<Route path="all-users" element={<Admin/>}/>
<Route path="/header" element={<Header/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
