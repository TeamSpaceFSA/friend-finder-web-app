import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Home, ProfileSetup, SignIn, SignUp, Error, Resetpassword } from './components/index'
import { auth } from './FirebaseConfig'
import { useAuthState } from "react-firebase-hooks/auth"

function App() {
  const [user] = useAuthState(auth)
  return (
    <Router>
      {user ? (
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<Home />} />
          <Route path="/setupprofile" element={<ProfileSetup />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
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
  );
}

export default App;
