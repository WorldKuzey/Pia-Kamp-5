import Header from "./Header";
import Footer from "./Footer";
import SidebarLayout from "./SidebarLayout";
import { HR_MENU, EMPLOYEE_MENU } from "../../data/sidebarMenu.js";

const AppLayout = ({ children }) => {
  // localStorage'dan role alınır (context ile de yapılabilir)
  const role = localStorage.getItem("role");

  const menu = role === "HR" ? HR_MENU : EMPLOYEE_MENU;

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1">
        <SidebarLayout menuItems={menu} />
        <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;
