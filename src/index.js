import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Loginpage from "./Loginpage";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import SubmitForm from "./SubmitForm";
import Createseat from "./Createseats";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
    <Router>
      <Routes>
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/" element={<Loginpage />} />
        <Route path="/Createseats" element={<Createseat />} />
        <Route path="/submitform" element={<SubmitForm />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

reportWebVitals();
