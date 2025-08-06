import { useAuth } from "@/contexts/AuthContext";
import { useSidebar } from "@/contexts/SideBarContext";
import { api } from "@/utils/api";
import { useQueryClient } from "@tanstack/react-query";

export default function LogoutButton() {
  const queryClient = useQueryClient();

  const { logout } = useAuth();
  const { closeSidebar } = useSidebar();
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout", null, { withCredentials: true });
      logout();
      queryClient.removeQueries({ queryKey: ["currentUser"] });
      closeSidebar();
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 active:bg-red-800 transition px-4 py-2 rounded-md text-white font-medium shadow-sm select-none whitespace-nowrap"
      aria-label="Logout"
    >
      Logout
    </button>
  );
}
