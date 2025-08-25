import Navbar from "./Navbar";
import SideMenu from "./SideMenu";

const DashboardLayout = ({ children, activeMenu }) => {
  return (
    <>
      <Navbar activeMenu={activeMenu} />

      <div className="min-[1280px]:flex">
        <div className="max-[1280px]:hidden">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <div className="grow mx-5 mb-10">
          {children}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
