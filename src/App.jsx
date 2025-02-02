import { BrowserRouter as  Router, Routes, Route } from "react-router-dom";
import BusinessAdminPanel from "./pages/BusinessAdminPanel";
import RafflePartenerAdminPanel from "./pages/RafflePartenerAdminPanel";
import SuperAdminPanel from "./pages/SuperAdminPanel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import "./App.css";

function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/signup" element={<Signup/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/business-db" element={<BusinessAdminPanel/>} />
      <Route path="/raffle-db" element={<RafflePartenerAdminPanel/>} />
      <Route path="/admin-db" element={<SuperAdminPanel />} />

      {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
      {/* <Route path="/403" element={<Unauthorized />} /> */}
      {/* wasnt sure how to do this correctly but this route enables pages that dont match our routes to land
          on the 404 page */}
      <Route path="*" element={<Notfound />} />
    </Routes>

    </Router>
  );
}

export default App;
