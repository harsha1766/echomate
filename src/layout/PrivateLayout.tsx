import Topbar from "./Topbar";
import { Outlet } from "react-router-dom";

export default function PrivateLayout() {
  return (
    <div>
      <Topbar />
      <br />
      <Outlet />
    </div>
  );
}
