import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { Toaster } from "react-hot-toast";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <div className="max-w-7xl mx-auto">
        <NavBar />
        <div className="mt-4 mx-5 lg:mx-0">
          <Outlet />
        </div>
      </div>
      <Footer />
      <Toaster />
    </div>
  );
};

export default MainLayout;
