import { Outlet } from "react-router-dom";

const GapComp = () => {
  return (
    <div className="mx-2">
      <Outlet />
    </div>
  );
};

export default GapComp;
