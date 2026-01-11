import { Outlet } from "react-router-dom";

type MainLayoutProps = {
  container?: boolean;
};

export const MainLayout: React.FC<MainLayoutProps> = () => (
  <div className="flex flex-col flex-1 w-full">
    <div className="flex flex-col justify-center items-center flex-1 w-full min-h-[90vh] border">
    <Outlet />
    </div>
  </div>

);
