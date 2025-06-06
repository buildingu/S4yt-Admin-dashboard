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
import AdminBusinessView from "./customComponents/AdminBusinessView";
import AdminStudentView from "./customComponents/AdminStudentView";
import CreateRafflePartner from "./customComponents/CreateRafflePartner";
import AdminRaffleItemView from "./customComponents/AdminRaffleItemView";
import AdminRafflePartnerView from "./customComponents/AdminRafflePartnerView";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/business-db/:id" element={<ProtectedRoute><BusinessAdminPanel /></ProtectedRoute>} />
          <Route path="/admin-db" element={<ProtectedRoute><SuperAdminPanel /></ProtectedRoute>}>
            <Route path="manage-businesses" element={<AdminBusinessView />} />
            <Route path="manage-users" element={<AdminStudentView />} />
            <Route path="manage-raffle/add-item" element={<AddRaffleItem />} />
            <Route
              path="manage-raffle/manage-items"
              element={<AdminRaffleItemView />}
            />
            <Route
              path="manage-raffle/add-partner"
              element={<CreateRafflePartner />}
            />
            <Route
              path="manage-raffle/manage-partners"
              element={<AdminRafflePartnerView />}
            />
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
