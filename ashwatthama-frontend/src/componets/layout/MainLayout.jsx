import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function MainLayout() {
  return (
    <>
      <Header />
      <Outlet /> {/* 👈 renders the child route here */}
      <Footer />
    </>
  );
}

export default MainLayout;
