import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home, ProfileSetup, SignIn, SignUp, Error, Resetpassword, Settings, Help, Suggestions, About } from './components/index'
import { auth } from './FirebaseConfig'
import { useAuthState } from "react-firebase-hooks/auth"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [user] = useAuthState(auth)
  return (
    <>
    <Router>
      {user ? (
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/setupprofile" element={<ProfileSetup />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path="/suggestions" element={<Suggestions/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="*" element={<Error />} />
        </Routes>) : (
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      )}
    </Router>
    <ToastContainer position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"/>
    </>
  );
}

export default App;
