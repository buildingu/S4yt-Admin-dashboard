import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./auth/AuthContext";
import BusinessAdminPanel from "./pages/BusinessAdminPanel";
import SuperAdminPanel from "./pages/SuperAdminPanel";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Notfound from "./pages/Notfound";
import Home from "./pages/Home";
import "./App.css";
import AddRaffleItem from "./customComponents/AddRaffleItem";
import EditYourInfo from "./customComponents/BusinessUpdateInfo";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/business-db/:id" element={<BusinessAdminPanel />} />
        <Route path="/admin-db" element={<SuperAdminPanel />}>
          <Route
            path="manage-business/add-business"
            element={<EditYourInfo />}
          />
          <Route path="manage-business/view-business" element={<Element />} />
          <Route path="manage-business/delete-business" element={<Element />} />
          <Route path="manage-users/ban-user" element={<Element />} />
          <Route path="manage-users/kick-user" element={<Element />} />
          <Route path="manage-users/manage-tokens" element={<Element />} />
          <Route path="manage-raffle/add-item" element={<AddRaffleItem />} />
          <Route path="manage-raffle/remove-item" element={<Element />} />
        </Route>

        {/* <Route path="/forgotpassword" element={<ForgotPassword />} /> */}
        {/* <Route path="/403" element={<Unauthorized />} /> */}
        {/* wasnt sure how to do this correctly but this route enables pages that dont match our routes to land
          on the 404 page */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
