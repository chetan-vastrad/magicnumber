import { useState } from "react";
import "./App.css";
import BeforeLogin from "./component/BeforeLogin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./component/loginpages/SignUp";
import Otp from "./component/loginpages/Otp";
import ForgotPassword from "./component/loginpages/ForgotPassword";
import Dashboard from "./component/dashboard/Dashboard";
import Registration from "./component/loginpages/Registration";
import ResetPassword from "./component/loginpages/ResetPassword";
import BottomMenu from "./component/dashboard/BottomMenu";
import BiggBullTradingFirst from "./component/dashboard/biggbulltrading/BiggBullTradingFirst";
import BiggBullTradingSecond from "./component/dashboard/biggbulltrading/BiggBullTradingSecond";
import PredictBigBullNumber from "./component/dashboard/biggbulltrading/PredictBigBullNumber";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import History from "./component/dashboard/pages/History";
import Profile from "./component/dashboard/pages/Profile";
import Wallet from "./component/dashboard/pages/Wallet";
import WinningStrategy from "./component/dashboard/pages/WinningStrategy";
function App() {
  return (
    <AuthProvider>
      <Router>
      <Routes>
  {/* Default Route (Redirects to login if not authenticated) */}
  <Route path="/" element={<BeforeLogin />} />

  {/* Public Routes */}
  <Route path="/login" element={<BeforeLogin />} />
  <Route path="/signup" element={<SignUp />} />
  <Route path="/otp" element={<Otp />} />
  <Route path="/forgotpassword" element={<ForgotPassword />} />
  <Route path="/registration" element={<Registration />} />
  <Route path="/resetpassword" element={<ResetPassword />} />
  
  {/* Protected Routes */}
  <Route
    path="/dashboard"
    element={
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    }
  />
  <Route path="/biggbullfirst" element={<ProtectedRoute><BiggBullTradingFirst /></ProtectedRoute>} />
  <Route path="/biggbullsecond" element={<ProtectedRoute><BiggBullTradingSecond /></ProtectedRoute>} />
  <Route path="/predictbigbullnumber" element={<ProtectedRoute><PredictBigBullNumber /></ProtectedRoute>} />
  <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
  <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
  <Route path="/winnigstrategy" element={<ProtectedRoute><WinningStrategy /></ProtectedRoute>} />


  {/* Catch-All Route (If no route matches, go to login) */}
  <Route path="*" element={<BeforeLogin />} />
</Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;
