import "../App.css";
import "primereact/resources/primereact.css"; // core css
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import Login from "./Login.tsx";
import Signup from "./Signup.tsx";
import Document from "./Document/Document.tsx";
import LockPage from "./Inactivity/LockPage.tsx";
import ForgetOTP from "./ForgetOtp.tsx";
import OTPVerification from "./OTP.tsx";
import NewPassword from "./NewPassword.tsx";
import Settings from "./Settings/Settings.tsx";
import About from "./About/About.tsx";
import SecurityQuestion from "./SecurityQuestion/SecurityQuestion.tsx";
import SMS from "../Sms/SMS.tsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/security-question" element={<SecurityQuestion />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/forgot-password" element={<ForgetOTP />} />
          <Route path="/sms" element={<SMS />} />
          <Route path="/otp" element={<OTPVerification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/secured-documents" element={<Document />} />
          <Route path="/reset-password" element={<NewPassword />} />
          <Route path="/lock" element={<LockPage />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
