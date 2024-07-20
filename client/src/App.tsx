import React from "react";
// import logo from "./logo.svg";
// import { HelloWorld } from "./components/helloWorld";
import { SignUp } from "./components/signup";
import { SignIn } from "./components/signin";
import { Dashboard } from "./components/dashboard";
import {AddTrip} from "./components/addTrip";
import { UpdateUser } from "./components/updateUser"
import {Layout} from "./components/layout";
import {TripView} from "./components/tripView";
import { ErrorPage } from "./components/404";
import Connect from "./components/connect";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { Stats } from "./components/stats";

function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path="/*" element={<Layout />} >
            <Route path="" element={<SignIn />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="dashboard" element={<Dashboard />} /> 
            <Route path="addtrip" element={<AddTrip />} /> 
            <Route path="tripview" element={<TripView />} />
            <Route path="updateuser" element={<UpdateUser />} />  
            <Route path="connect" element={<Connect />}/>
            <Route path="stats" element={<Stats />}/>
            <Route path="*" element={<ErrorPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
