import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import BankingLoginPage from "./componets/customerlogin/BankingLoginPage";
import Dashboard from "./componets/user-dashboard/dashboard/DashboardHome";
import TopBar from "./componets/user-dashboard/layout/TopBar";
import DashboardHome from "./componets/user-dashboard/dashboard/DashboardHome";
import ChangePassword from "./componets/user-dashboard/changePassword/ChangePassword";
import SupportPage from "./componets/user-dashboard/support/SupportPage";
import MyProfile from "./componets/user-dashboard/profile/MyProfile";
import ForgotPasswordPage from "./componets/forgotPassword/ForgotPassword";
import NewEnquiryPage from "./componets/admin/dashboard/NewEnquiryPage";
import FaqPage from "./componets/faqpage/FaqPage";
import CareerPage from "./componets/career/CareerPage";

function App() {
  return (
    <Router>
      <Routes>
        {/* Main user layout */}
        <Route path="/customer-login-page" element={<BankingLoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />


        <Route path="/dashboard" element={<TopBar />}>
          <Route index element={<DashboardHome />} />
          <Route path="profile" element={<MyProfile />} />
          <Route path="change-password" element={<ChangePassword />} />
          <Route path="support" element={<SupportPage />} />
        </Route>

        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route
            path="/new-savings-account-reg-form"
            element={<NewSavingsAccountRegForm />}
          />
          <Route path="/savings-account" element={<SavingsAccount />} />
          <Route path="/faq-page" element={<FaqPage />} />
          <Route path="/career-page" element={<CareerPage />} />
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
          path="/admin/enquiries"
          element={
            <AdminLayout>
              <NewEnquiryPage />
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Router>
  );
}

export default App;
