import "../App.css";
import "primereact/resources/primereact.css"; // core css
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home.tsx";
import Login from "./Login.tsx";
import Signup from "./Signup.tsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
