import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Dashboard from "./Dashboard/Dashboard";
import LandingPage from "./LandingPage/LandingPage";
import SignIn from "./SignIn/SignIn";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signIn" element={<SignIn />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
}

export default App;

/*

1) Change the design of the signin page
2) Figure out routing from landing page
3) Try using cloudinary for images

1) Start fixing tv with streaming
2) Maybe make less open space for it
3) Could also make a remote

1) Start working on a new app
2) Should be full stack and use everything you havnt used yet
3) Will spend months on this so it needs to be big

Make a new favicon

*/
