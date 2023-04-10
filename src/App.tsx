import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Dashboard from "./Dashboard/Dashboard";
import LandingPage from "./LandingPage/LandingPage";
import SignIn from "./SignIn/SignIn";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;
