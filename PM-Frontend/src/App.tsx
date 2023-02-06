import { createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.scss";
import Dashboard from "./Dashboard/Dashboard";
import LandingPage from "./LandingPage/LandingPage";
import SignIn from "./SignIn/SignIn";
import { SupashipUserInfo, useSession } from "./use-session";

export const UserContext = createContext<SupashipUserInfo>({
  session: null,
  profile: null,
});

function App() {
  const supashipUserInfo = useSession();

  return (
    <div className="App">
      <UserContext.Provider value={supashipUserInfo}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
