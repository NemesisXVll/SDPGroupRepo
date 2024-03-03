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
import { useEffect } from "react";

function App() {

  // window.history.pushState(null, "", window.location.href);
  // window.onpopstate = function () {
  //   window.history.pushState(null, "", window.location.href);
  // };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgetOTP />} />
          <Route path="/otp" element={<OTPVerification />} />
          <Route path="/home" element={<Home />} />
          <Route path="/secured-documents" element={<Document />} />
          <Route path="/reset-password" element={<NewPassword />} />
          <Route path="/lock" element={<LockPage />} />
        </Routes>
      </BrowserRouter>
    </>

    // <>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route index path="/document" element={<Document />} />
    //       <Route path="/file" element={<File />} />
    //     </Routes>
    //   </BrowserRouter>
    // </>
  );

  //   const [open, setOpen] = useState(false)
  //   return (
  //     <main className="App">
  //       <button className="btn btn-danger" onClick={() => setOpen(true)}>
  //         <Trash /> Generate password
  //       </button>
  // {/* <GeneratePassword></GeneratePassword> */}
  //       <Modal open={open}
  //       onClose={() => setOpen(false)}
  //       >
  //         {/* <div className="text-center w-56">
  //           <Trash size={56} className="mx-auto text-red-500" />
  //           <div className="mx-auto my-4 w-48">
  //             <h3 className="text-lg font-black text-gray-800">Confirm Delete</h3>
  //             <p className="text-sm text-gray-500">
  //               Are you sure you want to delete this item?
  //             </p>
  //           </div>
  //           <div className="flex gap-4">
  //             <button className="btn btn-danger w-full">Delete</button>
  //             <button
  //               className="btn btn-light w-full"
  //               onClick={() => setOpen(false)}
  //             >
  //               Cancel
  //             </button>
  //           </div>
  //         </div> */}
  //       </Modal>
  //     </main>
  // );
}

export default App;
