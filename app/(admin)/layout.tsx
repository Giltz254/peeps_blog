import Header from "@/components/backend/admin-header";
import Sidebar from "@/components/backend/Sidebar";
import { ToastProvider } from "@/components/Toastify";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-screen bg-white flex">
      <Sidebar />
      <main className="flex-1 h-screen flex flex-col w-full">
        <Header />
        <ToastProvider>{children}</ToastProvider>
      </main>
    </div>
  );
};

export default AdminLayout;
