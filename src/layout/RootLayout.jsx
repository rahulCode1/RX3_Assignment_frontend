import { Outlet } from "react-router";
import Header from "./Header.jsx";

const RootLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default RootLayout;
