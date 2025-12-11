
import { authUser } from "@/utils/auth-server";
import { redirect } from "next/navigation";
import Sidebar from "../module/p-admin/Sidebar";
import Topbar from "../module/p-admin/Topbar";

  
export default async function AdminDashboardLayout({ children }) {
    const user = await authUser()
      if (user) {
    if (user.role !== "ADMIN") {
      return redirect("/p-user");
    }
  } else {
    return redirect("/login-register");
  }

  return (
    <div className="flex h-screen bg-[url(/images/background-panel-3.png)] text-primary font-yekan-bakh">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Topbar />
        <div className="p-6 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
