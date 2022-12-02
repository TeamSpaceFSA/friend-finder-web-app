import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home, ProfileSetup, SignIn, SignUp } from './components/index'


function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element={<SignUp/>}/>
        <Route path = "/signin" element={<SignIn/>}/>
        <Route path = "/home" element={<Home/>}/>
        <Route path = "/setupprofile" element={<ProfileSetup/>}/>
      </Routes>
    </Router>
  );
}

export default App;
