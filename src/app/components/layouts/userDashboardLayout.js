
import { authUser } from "@/utils/auth-server";
import { redirect } from "next/navigation";
import Topbar from "../module/p-user/Topbar";
import Sidebar from "../module/p-user/Sidebar";

export default async function userDashboardLayout({ children }) {
  const user = await authUser()
  if (!user) {
    redirect("/login-register");
  }
  return (
    <div className="flex h-screen bg-[url(/images/background-panel-3.png)] text-primary font-yekan-bakh">
      <Sidebar/>
      <main className="flex-1 flex flex-col">
        <Topbar/>
        <div className="p-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
