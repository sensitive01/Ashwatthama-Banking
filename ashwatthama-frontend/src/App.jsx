import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./componets/layout/MainLayout";
import AboutPage from "./componets/about/AboutPage";
import HomePage from "./componets/home/HomePage";
import ContactPage from "./componets/contact/ContactPage";
import NewSavingsAccountRegForm from "./componets/newSavingsAccRegForm/NewSavingsAccountRegForm";
import SavingsAccount from "./componets/savingsAccount/SavingsAccount";
import AdminLogin from "./componets/admin/login/AdminLogin";
import AdminDashboard from "./componets/admin/dashboard/AdminDashboard";
import UserTable from "./componets/admin/dashboard/UserTable";
import AdminLayout from "./componets/admin/dashboard/layout/AdminLayout";
import UserModal from "./componets/admin/dashboard/UserModal";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main user layout */}
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route
            path="/new-savings-account-reg-form"
            element={<NewSavingsAccountRegForm />}
          />
          <Route path="/savings-account" element={<SavingsAccount />} />
        </Route>

        <Route path="/admin/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin/admin-dashboard"
          element={
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/user-table"
          element={
            <AdminLayout>
              <UserTable />
            </AdminLayout>
          }
        />
         <Route
          path="/admin/view-users/:id"
          element={
            <AdminLayout>
              <UserModal />
            </AdminLayout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
