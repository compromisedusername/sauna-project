import React from "react";
import { BrowserRouter, Routes, Route,  } from "react-router-dom";
import {useState} from 'react';
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Preferences from "./components/Preferences/Preference";

function setToken(userToken: string){
localStorage.setItem("token", userToken);
}
function getToken(): string{
return localStorage.getItem("token") || "guest";
}


function App() {

const token = getToken();

  if(!token){
    return <Login setToken={setToken}/>
  }



  return (
    <div className="wrapper">
      <h1>Sauna reservation</h1>
      <BrowserRouter>
      <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/login" element = {<Login setToken={setToken}/>}/>
          <Route path="/register" element = {<Register setToken={setToken}/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}
export default App;
