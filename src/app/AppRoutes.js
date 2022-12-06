import React from 'react';
import { Routes, Route } from "react-router-dom"
import { ProfileSetup, SignIn, SignUp, Error, Resetpassword, Settings, Help, Suggestions, About, Profile, EditProfile, FriendsList, HomeMap } from '../components/index'
import { auth } from './FirebaseConfig'
import { useAuthState } from "react-firebase-hooks/auth"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function AppRoutes() {
  const [user] = useAuthState(auth)
  return (
    <>
      {user ? (
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/home" element={<HomeMap />} />
          <Route path="/setupprofile" element={<ProfileSetup />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="/settings" element={<Settings/>}/>
          <Route path="/help" element={<Help/>}/>
          <Route path="/suggestions" element={<Suggestions/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/profile/editprofile" element={<EditProfile/>}/>
          <Route path="/profile/friendslist" element={<FriendsList/>}/>
          <Route path="*" element={<Error />} />
        </Routes>
        ) : (
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpassword" element={<Resetpassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      )}
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

export default AppRoutes;
