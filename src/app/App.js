import './App.css';
import React from "react";
import AppRoutes from "./AppRoutes";
import { HomeMap } from "../components/index";
import { Footer } from "../components/index";

const App = () => {
  return (
    <div>
      <AppRoutes />
      {/* <HomeMap /> */}
      <Footer />
    </div>
  );
};

export default App;
