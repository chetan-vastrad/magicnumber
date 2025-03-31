import { useState } from "react";
import "./App.css";
import BeforeLogin from "./component/BeforeLogin";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./component/loginpages/SignUp";
import Otp from "./component/loginpages/Otp";
import ForgotPassword from "./component/loginpages/ForgotPassword";
import Dashboard from "./component/dashboard/Dashboard";
import Registration from "./component/loginpages/Registration";
import ResetPassword from "./component/loginpages/ResetPassword";
import BiggBullTradingFirst from "./component/dashboard/biggbulltrading/BiggBullTradingFirst";
import BiggBullTradingSecond from "./component/dashboard/biggbulltrading/BiggBullTradingSecond";
import PredictBigBullNumber from "./component/dashboard/biggbulltrading/PredictBigBullNumber";
import History from "./component/dashboard/pages/History";
import Profile from "./component/dashboard/pages/Profile";
import Wallet from "./component/dashboard/pages/Wallet";
import WinningStrategy from "./component/dashboard/pages/WinningStrategy";

function App() {
  return (
      <Router>
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<BeforeLogin />} />

          {/* Public Routes */}
          <Route path="/login" element={<BeforeLogin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Protected Routes */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/biggbullfirst" element={<BiggBullTradingFirst />} />
          <Route path="/biggbullsecond" element={<BiggBullTradingSecond />} />
          <Route path="/predictbigbullnumber" element={<PredictBigBullNumber />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/winningstrategy" element={<WinningStrategy />} />

          {/* Catch-All Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
  );
}

export default App;
