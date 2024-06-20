import React from "react";
// import logo from "./logo.svg";
import { HelloWorld } from "./components/helloWorld";
import { SignUp } from "./components/signup";
import { SignIn } from "./components/signin";
import { Dashboard } from "./components/dashboard";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<HelloWorld />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
