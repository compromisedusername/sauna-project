import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import Register from "./components/Register/Register";
import Preferences from "./components/Preferences/Preference";
import Logout from "./components/Logout/Logout";
import useToken from "./components/Hooks/useToken";



function App() {

  const {token, setToken} = useToken();

  return (
    <div className="wrapper">
      <h1>Sauna reservation</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element = {<Login setToken={setToken}></Login>}></Route>
          {token && token !== 'guest' ? (
            <>
              <Route path="/dashboard" element={<Dashboard token={token} />} />
              <Route path="/preferences" element={<Preferences />} />
              <Route path ="/logout" element={<Logout setToken={setToken} />}/>
              <Route path="/dashboard/admin"/>

            </>
          ) : (
            <>
              <Route path="/dashboard" element={<Dashboard token={token}/>} />
              <Route path="/login" element={<Login setToken={setToken}  />} />
              <Route
                path="/register"
                element={<Register setToken={setToken}  />}
              />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
