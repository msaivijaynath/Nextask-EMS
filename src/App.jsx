import { useContext } from "react";
import Admindashboard from "./components/Dashboard/Admindashboard";
import Employdashboard from "./components/Dashboard/Employdashboard";
import Login from "./components/Auth/Login";
import { Authcontext } from "./context/Authprovider";

const App = () => {
  const { userRole, loggedInUser, handleLogout } = useContext(Authcontext);

  return (
    <main className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans">
      {!userRole && <Login />}
      {userRole === "admin" && <Admindashboard />}
      {userRole === "employee" && <Employdashboard data={loggedInUser} onLogout={handleLogout} />}
    </main>
  );
};

export default App;
