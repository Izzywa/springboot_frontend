import { Outlet } from "react-router-dom";
import { cn } from "@/lib/utils";

type MainLayoutProps = {
  container?: boolean;
};

export const MainLayout: React.FC<MainLayoutProps> = ({
  container = false,
}) => (
  <div
    className={cn(
      "flex flex-col flex-1 w-full px-[5px]",
      container && "max-w-8xl container mx-auto "
    )}
  >
    <Outlet />
  </div>
);
